/* AK Brands Marketing: Tax Invoice and URD Bill drawing (Tally-style). Works with jsPDF; needs no other library. */
import { fmtDate, money2, num } from "./ak-core.js";

const PW = 210, MX = 8, CW = 194, BOTTOM = 287, LWID = 0.2;

function painter(doc){
  const MMPT = 0.3528;
  const font = (size, style) => { doc.setFont("helvetica", style || "normal"); doc.setFontSize(size); };
  const asc = (size) => size * MMPT * 0.8;
  const lh = (size) => size * MMPT * 1.3;
  const width = (s, size, style) => { font(size, style); return doc.getTextWidth(String(s)); };
  function wrap(s, w, size, style){
    font(size, style);
    const out = [];
    String(s == null ? "" : s).split("\n").forEach((par) => {
      doc.splitTextToSize(par === "" ? " " : par, w).forEach((ln) => {
        let rest = ln;
        while (doc.getTextWidth(rest) > w + 0.3 && rest.length > 1) {
          let k = rest.length - 1;
          while (k > 1 && doc.getTextWidth(rest.slice(0, k)) > w) k--;
          out.push(rest.slice(0, k)); rest = rest.slice(k);
        }
        out.push(rest);
      });
    });
    return out;
  }
  return {
    lh, asc, width, wrap,
    text(s, x, y, o){ o = o || {}; const size = o.size || 8; font(size, o.style); doc.setTextColor(...(o.color || [0, 0, 0])); doc.text(String(s), x, y + asc(size), { align: o.align || "left" }); },
    lines(arr, x, y, o){ o = o || {}; const size = o.size || 8; arr.forEach((ln, i) => this.text(ln, x, y + i * lh(size), o)); return y + arr.length * lh(size); },
    rect(x, y, w, h){ doc.setLineWidth(LWID); doc.setDrawColor(0); doc.rect(x, y, w, h); },
    line(x1, y1, x2, y2){ doc.setLineWidth(LWID); doc.setDrawColor(0); doc.line(x1, y1, x2, y2); },
    shade(x, y, w, h, rgb){ doc.setFillColor(...rgb); doc.rect(x, y, w, h, "F"); doc.setFillColor(0, 0, 0); }
  };
}
const qtyText = (q, unit) => (Number.isInteger(q) ? q.toLocaleString("en-IN") : q.toLocaleString("en-IN", { maximumFractionDigits: 3 })) + (unit ? " " + unit : "");
const dash = (v) => (v === "" || v == null ? "" : v);

/* ---------- shared pieces ---------- */
function drawLogo(doc, logo, x, y, maxH){
  if (!logo || !logo.data) return 0;
  try {
    const h = maxH, w = Math.min(30, h * (logo.w / logo.h || 1));
    doc.addImage(logo.data, logo.type || "JPEG", x, y, w, h);
    return w;
  } catch (e) { return 0; }
}
function partyBlock(p, x, y, w, label, party, opt){
  opt = opt || {};
  const inner = w - 3, L = [];
  const top = y;
  p.text(label, x + 1.5, y + 1, { size: 6.8, style: "italic", color: [70, 70, 70] });
  let cy = y + 1 + p.lh(6.8) + 0.4;
  if (opt.logoW) { /* logo takes room on the left, text begins to its right */ }
  const tx = x + 1.5 + (opt.logoW ? opt.logoW + 2 : 0), tw = inner - (opt.logoW ? opt.logoW + 2 : 0);
  cy = p.lines(p.wrap(party.name || "", tw, opt.nameSize || 9, "bold"), tx, cy, { size: opt.nameSize || 9, style: "bold" });
  if (party.contact) cy = p.lines(p.wrap("Attn: " + party.contact, tw, 8), tx, cy, { size: 8 });
  (party.lines || []).forEach((ln) => { cy = p.lines(p.wrap(ln, tw, 8), tx, cy, { size: 8 }); });
  (opt.extra || []).forEach((ln) => { cy = p.lines(p.wrap(ln, tw, 8), tx, cy, { size: 8 }); });
  if (party.gstin !== undefined && !opt.noGstin) cy = p.lines(p.wrap("GSTIN/UIN : " + (party.gstin || ""), tw, 8, "bold"), tx, cy, { size: 8, style: "bold" });
  if (party.stateText) cy = p.lines(p.wrap("State Name : " + party.state + (party.stateCode ? ", Code : " + party.stateCode : ""), tw, 8), tx, cy, { size: 8 });
  (opt.after || []).forEach((ln) => { cy = p.lines(p.wrap(ln, tw, 8), tx, cy, { size: 8 }); });
  const h = Math.max(cy - top + 1.2, opt.minH || 0);
  p.rect(x, top, w, h);
  return h;
}
function metaCell(p, x, y, w, h, label, value){
  p.rect(x, y, w, h);
  p.text(label, x + 1.2, y + 0.9, { size: 6.6, color: [70, 70, 70] });
  let size = 8, ls = p.wrap(value || "", w - 2.4, size, "bold");
  if (ls.length > 1) { size = 6.8; ls = p.wrap(value, w - 2.4, size, "bold").slice(0, 2); }
  p.lines(ls, x + 1.2, y + 3.9, { size, style: "bold" });
}

/* ================= TAX INVOICE ================= */
export function drawInvoice(doc, inv, opts){
  opts = opts || {};
  const p = painter(doc);
  let y = 0;
  const title = (cont) => {
    p.text("TAX INVOICE" + (cont ? " (continued)" : ""), PW / 2, 5.5, { size: 13, style: "bold", align: "center" });
    if (opts.copy) p.text("(" + opts.copy + ")", PW - MX, 7, { size: 7.5, style: "italic", align: "right" });
    if (cont) p.text("Invoice No. " + inv.no + "   Dated " + fmtDate(inv.date), MX, 7, { size: 8, style: "bold" });
    y = 13;
  };
  const need = (h) => { if (y + h > BOTTOM) { doc.addPage(); title(true); return true; } return false; };
  title(false);

  /* header: left = seller / ship to / bill to, right = invoice details */
  const LWc = 100, RX = MX + LWc, RW = CW - LWc, top = y;
  const logoW = opts.logo && opts.logo.data ? Math.min(30, 14 * (opts.logo.w / opts.logo.h || 1)) : 0;
  const s = inv.seller, sellerExtra = [];
  if (s.phone) sellerExtra.push("Contact : " + s.phone);
  if (s.email) sellerExtra.push("E-Mail : " + s.email);
  const isTr = inv.audience === "transporter";
  const h1 = partyBlock(p, MX, y, LWc, isTr ? "Bill from (Seller)" : "Sender (Seller)", s, { nameSize: 10.5, logoW, minH: 22, extra: [], after: sellerExtra.slice() });
  if (logoW) drawLogo(doc, opts.logo, MX + 1.5, y + 5, 14);
  let ly = y + h1;
  if (inv.sender) {
    const sx = inv.sender.phone ? ["Phone : " + inv.sender.phone] : [];
    ly += partyBlock(p, MX, ly, LWc, "Sender (Dispatch from / Pick-up)", inv.sender, { noGstin: true, nameSize: 9, after: sx });
  }
  const h2 = partyBlock(p, MX, ly, LWc, "Consignee (Ship to)", inv.ship, { noGstin: !inv.ship.gstin, nameSize: 8.5 });
  ly += h2;
  const buyerAfter = [];
  if (inv.buyer.phone) buyerAfter.push("Phone : " + inv.buyer.phone);
  if (inv.buyer.stateText) buyerAfter.push("Place of Supply : " + inv.buyer.state);
  const h3 = partyBlock(p, MX, ly, LWc, "Buyer (Bill to)", inv.buyer, { nameSize: 8.5, after: buyerAfter });
  ly += h3;
  const hdrH = Math.max(ly - top, 62);
  if (ly - top < 62) p.rect(MX, ly, LWc, top + 62 - ly); // stretch the last box so both sides end level
  const m = inv.meta, cw = RW / 2, rh = 9.4;
  const rows = [
    [["Invoice No.", inv.no], ["Dated", fmtDate(inv.date)]],
    [["Order Ref.", inv.orderRef], ["Mode/Terms of Payment", m.payTerms]],
    [["Dispatch Doc No. (LR)", m.lr], ["Dispatched through", m.transporter]],
    [["Vehicle No.", m.vehicle], ["E-Way Bill No.", m.eway]],
    [["Destination", m.destination], ["Place of Supply", inv.buyer.state]]
  ];
  rows.forEach((r, i) => { metaCell(p, RX, top + i * rh, cw, rh, r[0][0], r[0][1]); metaCell(p, RX + cw, top + i * rh, cw, rh, r[1][0], r[1][1]); });
  const tdY = top + rows.length * rh, tdH = Math.max(hdrH - rows.length * rh, 10);
  p.rect(RX, tdY, RW, tdH);
  p.text("Terms of Delivery", RX + 1.2, tdY + 0.9, { size: 6.6, color: [70, 70, 70] });
  p.lines(p.wrap(m.freightNote ? "Freight: " + m.freightNote : "", RW - 2.4, 7.5, "bold"), RX + 1.2, tdY + 3.9, { size: 7.5, style: "bold" });
  y = top + hdrH;

  /* items table */
  const cols = [
    { k: "sl", w: 9, a: "c", t: "Sl No." }, { k: "desc", w: 76, a: "l", t: "Description of Goods" }, { k: "hsn", w: 20, a: "c", t: "HSN/SAC" },
    { k: "gst", w: 13, a: "c", t: "GST %" }, { k: "qty", w: 20, a: "r", t: "Quantity" }, { k: "rate", w: 20, a: "r", t: "Rate" },
    { k: "per", w: 10, a: "c", t: "per" }, { k: "amount", w: 26, a: "r", t: "Amount" }
  ];
  let xs = [MX]; cols.forEach((c) => xs.push(xs[xs.length - 1] + c.w));
  const cellText = (c, i, str, ry, o) => {
    o = o || {}; const size = o.size || 8, pad = 1.2;
    const x = c.a === "l" ? xs[i] + pad : (c.a === "r" ? xs[i + 1] - pad : (xs[i] + xs[i + 1]) / 2);
    p.text(str, x, ry, { size, style: o.style, align: c.a === "l" ? "left" : (c.a === "r" ? "right" : "center") });
  };
  let tTop = 0, bodyTop = 0;
  const header = () => {
    tTop = y; const hh = 7;
    p.rect(MX, y, CW, hh);
    cols.forEach((c, i) => { cellText(c, i, c.t, y + 1.8, { size: 7.5, style: "bold" }); if (i) p.line(xs[i], y, xs[i], y + hh); });
    y += hh; bodyTop = y;
  };
  const closeBody = (minEnd) => {
    const end = Math.max(y, minEnd || 0);
    cols.forEach((c, i) => { if (i) p.line(xs[i], bodyTop, xs[i], end); });
    p.line(MX, bodyTop, MX, end); p.line(MX + CW, bodyTop, MX + CW, end); p.line(MX, end, MX + CW, end);
    y = end;
  };
  header();
  const rowH = (lines) => Math.max(lines * p.lh(8) + 1.6, 5.2);
  const itemRow = (r) => {
    const dl = p.wrap(r.desc, cols[1].w - 2.4, 8, "bold");
    const h = rowH(dl.length);
    if (y + h > BOTTOM - 8) { closeBody(); doc.addPage(); title(true); header(); }
    const ty = y + 0.9;
    cellText(cols[0], 0, String(r.sl), ty);
    p.lines(dl, xs[1] + 1.2, ty, { size: 8, style: "bold" });
    cellText(cols[2], 2, r.hsn || "", ty);
    cellText(cols[3], 3, r.gst ? r.gst + "%" : "", ty);
    cellText(cols[4], 4, qtyText(r.qty, r.unit), ty, { style: "bold" });
    cellText(cols[5], 5, money2(r.rate), ty);
    cellText(cols[6], 6, r.unit, ty);
    cellText(cols[7], 7, money2(r.amount), ty, { style: "bold" });
    y += h;
  };
  inv.rows.forEach(itemRow);
  if (inv.freightRow) {
    const f = inv.freightRow, ty = y + 0.9;
    cellText(cols[1], 1, f.desc, ty, { style: "bold" }); cellText(cols[3], 3, f.gst ? f.gst + "%" : "", ty); cellText(cols[7], 7, money2(f.amount), ty, { style: "bold" });
    y += 5.6;
  }
  y += 2;
  inv.taxLines.forEach((t) => {
    if (y + 5 > BOTTOM - 8) { closeBody(); doc.addPage(); title(true); header(); }
    const ty = y + 0.9;
    p.text(t.label, xs[2] - 1.2, ty, { size: 8, style: "bolditalic", align: "right" });
    cellText(cols[3], 3, t.rate + "%", ty); cellText(cols[7], 7, money2(t.amount), ty, { style: "bold" });
    y += 5;
  });
  if (inv.totals.roundOff) { const ty = y + 0.9; p.text("Round Off", xs[2] - 1.2, ty, { size: 8, style: "italic", align: "right" }); cellText(cols[7], 7, (inv.totals.roundOff < 0 ? "(-)" : "") + money2(Math.abs(inv.totals.roundOff)), ty); y += 5; }
  closeBody(bodyTop + 38);
  /* total row */
  need(10);
  p.rect(MX, y, CW, 7.2);
  p.text("Total", xs[2] - 1.2, y + 1.8, { size: 8.5, style: "bold", align: "right" });
  if (inv.singleUnit) cellText(cols[4], 4, qtyText(inv.totalQty, inv.singleUnit), y + 1.8, { style: "bold" });
  cellText(cols[7], 7, "Rs. " + money2(inv.totals.total), y + 1.6, { size: 9, style: "bold" });
  y += 7.2;

  /* amount in words */
  const wl = p.wrap(inv.words, CW - 28, 8.5, "bold"), wh = 1 + p.lh(6.8) + wl.length * p.lh(8.5) + 1;
  need(wh); p.rect(MX, y, CW, wh);
  p.text("Amount Chargeable (in words)", MX + 1.2, y + 0.9, { size: 6.8, style: "italic", color: [70, 70, 70] });
  p.text("E. & O.E", MX + CW - 1.2, y + 0.9, { size: 7, style: "italic", align: "right" });
  p.lines(wl, MX + 1.2, y + 1 + p.lh(6.8), { size: 8.5, style: "bold" });
  y += wh;

  /* HSN / tax summary */
  const hc = inv.inter
    ? [{ w: 40, t: "HSN/SAC", a: "l" }, { w: 44, t: "Taxable Value", a: "r" }, { w: 24, t: "IGST Rate", a: "c" }, { w: 40, t: "IGST Amount", a: "r" }, { w: 46, t: "Total Tax Amount", a: "r" }]
    : [{ w: 34, t: "HSN/SAC", a: "l" }, { w: 34, t: "Taxable Value", a: "r" }, { w: 18, t: "CGST Rate", a: "c" }, { w: 26, t: "CGST Amount", a: "r" }, { w: 18, t: "SGST Rate", a: "c" }, { w: 26, t: "SGST Amount", a: "r" }, { w: 38, t: "Total Tax Amount", a: "r" }];
  const hx = [MX]; hc.forEach((c) => hx.push(hx[hx.length - 1] + c.w));
  const hrow = (vals, ry, style) => vals.forEach((v, i) => { const c = hc[i], pad = 1.2; p.text(v, c.a === "l" ? hx[i] + pad : (c.a === "r" ? hx[i + 1] - pad : (hx[i] + hx[i + 1]) / 2), ry, { size: 7.5, style, align: c.a === "l" ? "left" : (c.a === "r" ? "right" : "center") }); });
  const hh = 6 + (inv.hsn.length + 1) * 5;
  need(hh);
  p.rect(MX, y, CW, hh); hc.forEach((c, i) => { if (i) p.line(hx[i], y, hx[i], y + hh); });
  hrow(hc.map((c) => c.t), y + 1.3, "bold"); p.line(MX, y + 6, MX + CW, y + 6);
  let hy = y + 6;
  inv.hsn.forEach((h) => {
    const vals = inv.inter ? [h.hsn || "-", money2(h.taxable), (h.rate || 0) + "%", money2(h.igst), money2(h.tax)] : [h.hsn || "-", money2(h.taxable), (h.rate / 2 || 0) + "%", money2(h.cgst), (h.rate / 2 || 0) + "%", money2(h.sgst), money2(h.tax)];
    hrow(vals, hy + 1.1, "normal"); hy += 5;
  });
  p.line(MX, hy, MX + CW, hy);
  const tv = inv.inter ? ["Total", money2(inv.totals.taxable), "", money2(inv.totals.igst), money2(inv.totals.tax)] : ["Total", money2(inv.totals.taxable), "", money2(inv.totals.cgst), "", money2(inv.totals.sgst), money2(inv.totals.tax)];
  hrow(tv, hy + 1.1, "bold");
  y += hh;
  const tl = p.wrap("Tax Amount (in words) :  " + inv.taxWords, CW - 3, 8, "bold"), th = tl.length * p.lh(8) + 2;
  need(th); p.rect(MX, y, CW, th); p.lines(tl, MX + 1.2, y + 1, { size: 8, style: "bold" }); y += th;

  /* footer: declaration + bank + signature */
  const half = CW / 2 - 4, left = [], b = inv.bank;
  const leftLines = [];
  if (inv.pan) leftLines.push({ t: "Company's PAN :  " + inv.pan, s: "bold" });
  leftLines.push({ t: "Declaration", s: "bold" });
  inv.terms.forEach((t) => leftLines.push({ t, s: "normal" }));
  const rightLines = [{ t: "Company's Bank Details", s: "bold" }];
  if (b.holder) rightLines.push({ t: "A/c Holder's Name :  " + b.holder, s: "normal" });
  if (b.name) rightLines.push({ t: "Bank Name :  " + b.name, s: "normal" });
  if (b.acc) rightLines.push({ t: "A/c No. :  " + b.acc, s: "bold" });
  if (b.branch || b.ifsc) rightLines.push({ t: "Branch & IFS Code :  " + [b.branch, b.ifsc].filter(Boolean).join(" & "), s: "normal" });
  if (b.upi) rightLines.push({ t: "UPI :  " + b.upi, s: "normal" });
  const measure = (arr, w) => arr.reduce((a, l) => a + p.wrap(l.t, w, 7.5, l.s).length * p.lh(7.5), 0);
  const fh = Math.max(measure(leftLines, half) + 2, measure(rightLines, half) + 24 + 2, 44);
  need(fh); p.rect(MX, y, CW, fh); p.line(MX + CW / 2, y, MX + CW / 2, y + fh);
  let fy = y + 1;
  leftLines.forEach((l) => { fy = p.lines(p.wrap(l.t, half, 7.5, l.s), MX + 1.5, fy, { size: 7.5, style: l.s }); });
  let ry = y + 1;
  rightLines.forEach((l) => { ry = p.lines(p.wrap(l.t, half, 7.5, l.s), MX + CW / 2 + 1.5, ry, { size: 7.5, style: l.s }); });
  p.text("for " + inv.seller.name, MX + CW - 1.5, y + fh - 17, { size: 8.5, style: "bold", align: "right" });
  p.text(inv.signatory, MX + CW - 1.5, y + fh - 5, { size: 8, align: "right" });
  y += fh;
  if (opts.ack) {
    const tr = opts.ack === "transporter";
    need(17); p.rect(MX, y, CW, 16);
    p.text(tr ? "Received the above goods from the sender for transport, in good condition." : "Received the above goods in good condition.", MX + 1.5, y + 1.2, { size: 8, style: "bold" });
    const bx = [MX + 1.5, MX + 70, MX + 135];
    [[tr ? "Transporter / Driver Name" : "Receiver's Name", 58], ["Signature & Stamp", 58], ["Date & Time", 56]].forEach((f, i) => { p.line(bx[i], y + 12.5, bx[i] + f[1], y + 12.5); p.text(f[0], bx[i], y + 12.9, { size: 6.8, color: [70, 70, 70] }); });
    y += 16;
  }
  p.text("This is a Computer Generated Invoice", PW / 2, Math.min(y + 1.5, 291), { size: 7, style: "italic", align: "center", color: [90, 90, 90] });
}

/* ================= URD PURCHASE BILL ================= */
export function drawUrd(doc, u, opts){
  opts = opts || {};
  const p = painter(doc);
  let y = 0;
  const title = (cont) => {
    p.text("PURCHASE BILL" + (cont ? " (continued)" : ""), PW / 2, 5.5, { size: 13, style: "bold", align: "center" });
    p.text("Unregistered Dealer (URD) purchase. No GST charged by the supplier.", PW / 2, 11.2, { size: 7.5, style: "italic", align: "center", color: [70, 70, 70] });
    if (opts.copy) p.text("(" + opts.copy + ")", PW - MX, 7, { size: 7.5, style: "italic", align: "right" });
    if (cont) p.text("Bill No. " + u.no + "   Dated " + fmtDate(u.date), MX, 7, { size: 8, style: "bold" });
    y = 16;
  };
  const need = (h) => { if (y + h > BOTTOM) { doc.addPage(); title(true); return true; } return false; };
  title(false);
  const LWc = 100, RX = MX + LWc, RW = CW - LWc, top = y;
  const sup = u.supplier, supExtra = [];
  if (sup.phone) supExtra.push("Phone : " + sup.phone);
  if (sup.pan) supExtra.push("PAN / ID : " + sup.pan);
  const h1 = partyBlock(p, MX, y, LWc, "Bill from (Supplier, unregistered)", sup, { nameSize: 10, noGstin: true, after: supExtra, minH: 26 });
  const byAfter = []; if (u.buyer.phone) byAfter.push("Contact : " + u.buyer.phone);
  const h2 = partyBlock(p, MX, y + h1, LWc, "Bill to (Purchaser)", u.buyer, { nameSize: 9, after: byAfter });
  const hdrH = Math.max(h1 + h2, 56);
  if (h1 + h2 < 56) p.rect(MX, y + h1 + h2, LWc, 56 - h1 - h2);
  const cw = RW / 2, rh = 9.4, rows = [[["Bill No.", u.no], ["Dated", fmtDate(u.date)]], [["Our Order Ref.", u.orderRef], ["Mode of Payment", u.payments.length ? Array.from(new Set(u.payments.map((x) => x.mode))).join(", ") : ""]]];
  rows.forEach((r, i) => { metaCell(p, RX, top + i * rh, cw, rh, r[0][0], r[0][1]); metaCell(p, RX + cw, top + i * rh, cw, rh, r[1][0], r[1][1]); });
  const nY = top + rows.length * rh, nH = hdrH - rows.length * rh;
  p.rect(RX, nY, RW, nH);
  p.text("Delivery", RX + 1.2, nY + 0.9, { size: 6.6, color: [70, 70, 70] });
  const ho = u.handover || {}, hoLines = ["Goods purchased from you against our order above."];
  hoLines.push(ho.transporter ? "Please hand the goods over to our transporter: " + ho.transporter + (ho.vehicle ? " (Vehicle " + ho.vehicle + ")" : "") + "." : "Please hand the goods over to our transporter when they arrive.");
  p.lines(p.wrap(hoLines.join(" "), RW - 2.4, 7.5), RX + 1.2, nY + 3.9, { size: 7.5 });
  y = top + hdrH;

  const cols = [{ w: 9, a: "c", t: "Sl No." }, { w: 77, a: "l", t: "Description of Goods" }, { w: 20, a: "c", t: "HSN/SAC" }, { w: 24, a: "r", t: "Quantity" }, { w: 22, a: "r", t: "Rate" }, { w: 10, a: "c", t: "per" }, { w: 32, a: "r", t: "Amount" }];
  const xs = [MX]; cols.forEach((c) => xs.push(xs[xs.length - 1] + c.w));
  const cell = (i, str, ry, o) => { o = o || {}; const c = cols[i], pad = 1.2; p.text(str, c.a === "l" ? xs[i] + pad : (c.a === "r" ? xs[i + 1] - pad : (xs[i] + xs[i + 1]) / 2), ry, { size: o.size || 8, style: o.style, align: c.a === "l" ? "left" : (c.a === "r" ? "right" : "center") }); };
  let bodyTop = 0;
  const header = () => { p.rect(MX, y, CW, 7); cols.forEach((c, i) => { cell(i, c.t, y + 1.8, { size: 7.5, style: "bold" }); if (i) p.line(xs[i], y, xs[i], y + 7); }); y += 7; bodyTop = y; };
  const closeBody = (minEnd) => { const end = Math.max(y, minEnd || 0); cols.forEach((c, i) => { if (i) p.line(xs[i], bodyTop, xs[i], end); }); p.line(MX, bodyTop, MX, end); p.line(MX + CW, bodyTop, MX + CW, end); p.line(MX, end, MX + CW, end); y = end; };
  header();
  u.rows.forEach((r) => {
    const dl = p.wrap(r.desc, cols[1].w - 2.4, 8, "bold"), h = Math.max(dl.length * p.lh(8) + 1.6, 5.2);
    if (y + h > BOTTOM - 8) { closeBody(); doc.addPage(); title(true); header(); }
    const ty = y + 0.9;
    cell(0, String(r.sl), ty); p.lines(dl, xs[1] + 1.2, ty, { size: 8, style: "bold" }); cell(2, r.hsn || "", ty);
    cell(3, qtyText(r.qty, r.unit), ty, { style: "bold" }); cell(4, money2(r.rate), ty); cell(5, r.unit, ty); cell(6, money2(r.amount), ty, { style: "bold" });
    y += h;
  });
  closeBody(bodyTop + 38);
  need(10); p.rect(MX, y, CW, 7.2);
  p.text("Total", xs[2] - 1.2, y + 1.8, { size: 8.5, style: "bold", align: "right" });
  p.text("Rs. " + money2(u.total), xs[7] - 1.2, y + 1.6, { size: 9, style: "bold", align: "right" });
  y += 7.2;
  const wl = p.wrap(u.words, CW - 28, 8.5, "bold"), wh = 1 + p.lh(6.8) + wl.length * p.lh(8.5) + 1;
  need(wh); p.rect(MX, y, CW, wh);
  p.text("Amount Chargeable (in words)", MX + 1.2, y + 0.9, { size: 6.8, style: "italic", color: [70, 70, 70] });
  p.text("E. & O.E", MX + CW - 1.2, y + 0.9, { size: 7, style: "italic", align: "right" });
  p.lines(wl, MX + 1.2, y + 1 + p.lh(6.8), { size: 8.5, style: "bold" });
  y += wh;

  /* payment record */
  const pl = [{ t: "Payment to supplier", s: "bold" }];
  u.payments.forEach((x) => pl.push({ t: [fmtDate(x.date), x.mode, x.ref].filter(Boolean).join("  |  ") + "   Rs. " + money2(x.amount), s: "normal" }));
  if (!u.payments.length) pl.push({ t: "No payment recorded yet.", s: "normal" });
  const ph = Math.max(pl.reduce((a, l) => a + p.wrap(l.t, CW / 2 - 4, 8, l.s).length * p.lh(8), 0) + 2, 22);
  need(ph + 30); p.rect(MX, y, CW, ph); p.line(MX + CW / 2, y, MX + CW / 2, y + ph);
  let py = y + 1; pl.forEach((l) => { py = p.lines(p.wrap(l.t, CW / 2 - 4, 8, l.s), MX + 1.5, py, { size: 8, style: l.s }); });
  const sx = MX + CW / 2 + 1.5, ex = MX + CW - 1.5;
  [["Bill total", "Rs. " + money2(u.total)], ["Paid to supplier", "Rs. " + money2(u.paid)], ["Balance payable", "Rs. " + money2(u.due)]].forEach((r, i) => {
    const ry = y + 2 + i * 6.2, st = i === 2 ? "bold" : "normal";
    p.text(r[0], sx, ry, { size: 8.5, style: st }); p.text(r[1], ex, ry, { size: 8.5, style: st, align: "right" });
  });
  y += ph;
  const dec = p.wrap("Declaration: We have purchased the above goods from the supplier named above, who is not registered under GST. No GST has been charged by the supplier. Please consult your tax adviser on any tax treatment of this purchase.", CW - 3, 7.5);
  const fh = Math.max(dec.length * p.lh(7.5) + 3 + 26, 40);
  need(fh); p.rect(MX, y, CW, fh); p.line(MX + CW / 2, y + dec.length * p.lh(7.5) + 3, MX + CW / 2, y + fh);
  p.lines(dec, MX + 1.5, y + 1, { size: 7.5 });
  p.line(MX, y + dec.length * p.lh(7.5) + 3, MX + CW, y + dec.length * p.lh(7.5) + 3);
  p.text("Supplier's signature", MX + 1.5, y + fh - 5, { size: 8 });
  p.text("for " + u.buyer.name, MX + CW - 1.5, y + fh - 17, { size: 8.5, style: "bold", align: "right" });
  p.text(u.signatory, MX + CW - 1.5, y + fh - 5, { size: 8, align: "right" });
  y += fh;
  p.text("This is a Computer Generated Bill", PW / 2, Math.min(y + 1.5, 291), { size: 7, style: "italic", align: "center", color: [90, 90, 90] });
}

/* ================= entry points used by the Orders page ================= */
/* Customer copy: Sender is AK Brands Marketing. No supplier details anywhere. */
export function makeCustomerCopyPdf(JsPDF, inv, logo){
  const doc = new JsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  drawInvoice(doc, inv, { copy: "ORIGINAL FOR RECIPIENT", ack: "customer", logo });
  return doc;
}
/* Transporter copy: shows the sender (pick-up), the customer and AK Brands. */
export function makeTransporterCopyPdf(JsPDF, inv, logo){
  const doc = new JsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  drawInvoice(doc, inv, { copy: "DUPLICATE FOR TRANSPORTER", ack: "transporter", logo });
  return doc;
}
/* Supplier copy: AK Brands is the buyer. No customer details anywhere. */
export function makeSupplierCopyPdf(JsPDF, urd){
  const doc = new JsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  drawUrd(doc, urd, { copy: "SUPPLIER COPY" });
  return doc;
}
