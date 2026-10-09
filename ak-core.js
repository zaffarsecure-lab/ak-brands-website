/* AK Brands Marketing: shared order logic (money, GST, invoice and URD bill data). No screen code in here. */
export const STATUSES = ["Booked", "Token received", "Packing video sent", "Balance received", "Dispatched", "Delivered", "Closed", "Claim open", "Cancelled"];
export const UNITS = ["Pcs", "Units", "Boxes", "Kit", "Others"];
export const PAY_KINDS = ["Token", "Part payment", "Balance"];
export const PAY_MODES = ["UPI", "Bank transfer", "Cash", "Cheque", "Other"];
export const FREIGHT_MODES = { billed: "Added to customer's bill", ours: "Our cost (not billed)", topay: "Customer pays transporter directly" };
export const GST_MODES = { incl: "Rates already include GST", excl: "GST is added on top of rates" };
export const STATES = [["Andaman and Nicobar Islands","35"],["Andhra Pradesh","37"],["Arunachal Pradesh","12"],["Assam","18"],["Bihar","10"],["Chandigarh","04"],["Chhattisgarh","22"],["Dadra and Nagar Haveli and Daman and Diu","26"],["Delhi","07"],["Goa","30"],["Gujarat","24"],["Haryana","06"],["Himachal Pradesh","02"],["Jammu and Kashmir","01"],["Jharkhand","20"],["Karnataka","29"],["Kerala","32"],["Ladakh","38"],["Lakshadweep","31"],["Madhya Pradesh","23"],["Maharashtra","27"],["Manipur","14"],["Meghalaya","17"],["Mizoram","15"],["Nagaland","13"],["Odisha","21"],["Puducherry","34"],["Punjab","03"],["Rajasthan","08"],["Sikkim","11"],["Tamil Nadu","33"],["Telangana","36"],["Tripura","16"],["Uttar Pradesh","09"],["Uttarakhand","05"],["West Bengal","19"]];
export const DEFAULT_TERMS = "Goods once sold will not be taken back or exchanged. Goods are sold as is, where is. Our responsibility ceases once the goods are handed over to the transporter. Subject to local jurisdiction.";

const EMOJI_RE = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu;
export const num = (v) => { const n = parseFloat(String(v == null ? "" : v).replace(/,/g, "").trim()); return isFinite(n) ? n : 0; };
export const r2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
export const inr = (n) => "\u20B9" + r2(n).toLocaleString("en-IN", { maximumFractionDigits: 2 });
export const rs = (n) => "Rs " + r2(n).toLocaleString("en-IN", { maximumFractionDigits: 2 });
export const money2 = (n) => r2(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const plain = (s) => String(s == null ? "" : s).replace(EMOJI_RE, "").replace(/\s{2,}/g, " ").trim();
export function normPhone(s){
  const d = String(s || "").replace(/\D/g, "");
  if (d.length === 10) return "91" + d;
  if (d.length === 11 && d[0] === "0") return "91" + d.slice(1);
  return d;
}
export function prettyPhone(p){
  const d = String(p || "");
  return d.length === 12 && d.slice(0, 2) === "91" ? "+91 " + d.slice(2, 7) + " " + d.slice(7) : (d ? "+" + d : "");
}
export function todayISO(){
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
export function fmtDate(iso){
  if (!iso) return "";
  const p = String(iso).split("-").map(Number);
  if (p.length !== 3 || !p[0]) return iso;
  return new Date(p[0], p[1] - 1, p[2]).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
export const stateCodeOf = (name) => { const s = STATES.find((x) => x[0].toLowerCase() === String(name || "").toLowerCase()); return s ? s[1] : ""; };
export const stateNameOf = (code) => { const s = STATES.find((x) => x[1] === String(code || "")); return s ? s[0] : ""; };
/* Financial year label such as "26-27" (April to March) */
export function fyShort(iso){
  const p = String(iso || todayISO()).split("-").map(Number), y = p[0], m = p[1];
  const a = m >= 4 ? y : y - 1;
  return String(a).slice(2) + "-" + String(a + 1).slice(2);
}

/* Indian number words: 240600 -> Two Lakh Forty Thousand Six Hundred */
const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const w100 = (n) => n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? " " + ONES[n % 10] : "");
const w1000 = (n) => { const h = Math.floor(n / 100), r = n % 100; return (h ? ONES[h] + " Hundred" + (r ? " " : "") : "") + (r ? w100(r) : ""); };
export function inWords(amount){
  let n = r2(Math.abs(amount)), rupees = Math.floor(n + 1e-9), paise = Math.round((n - rupees) * 100);
  if (paise === 100) { rupees += 1; paise = 0; }
  if (!rupees && !paise) return "Zero";
  const parts = [], crore = Math.floor(rupees / 1e7); rupees %= 1e7;
  const lakh = Math.floor(rupees / 1e5); rupees %= 1e5;
  const th = Math.floor(rupees / 1e3); rupees %= 1e3;
  if (crore) parts.push(w1000(crore) + " Crore");
  if (lakh) parts.push(w100(lakh) + " Lakh");
  if (th) parts.push(w100(th) + " Thousand");
  if (rupees) parts.push(w1000(rupees));
  let s = parts.join(" ");
  if (paise) s += (s ? " and " : "") + w100(paise) + " Paise";
  return s;
}

/* ---------- Orders ---------- */
export const newItem = (from) => ({ lotNo: "", name: "", qty: "", unit: "Pcs", custRate: "", supRate: "", hsn: from ? (from.hsn || "") : "", gst: from ? (from.gst || "") : "" });
export const newOrder = () => ({
  orderNo: "", createdAt: null, orderDate: todayISO(), status: "Booked", gstMode: "incl", payTerms: "",
  invoiceNo: "", invoiceDate: "", urdNo: "", urdDate: "", viewToken: "",
  customer: { name: "", phone: "", firm: "", city: "", state: "", gstin: "", address: "", shipSame: true, shipName: "", shipAddress: "" },
  supplier: { name: "", phone: "", address: "", pan: "" },
  items: [newItem()],
  freight: { amount: "", mode: "billed", gst: "" },
  delivery: { transporter: "", lr: "", vehicle: "", eway: "", dispatchDate: "", deliveredDate: "", note: "" },
  payments: [], supplierPayments: [], notes: ""
});
export function fromDoc(id, d){
  const o = newOrder();
  o.orderNo = id; o.createdAt = d.createdAt || null;
  ["orderDate", "status", "notes", "gstMode", "payTerms", "invoiceNo", "invoiceDate", "urdNo", "urdDate", "viewToken"].forEach((k) => { if (d[k] != null) o[k] = d[k]; });
  Object.assign(o.customer, d.customer || {}); Object.assign(o.supplier, d.supplier || {});
  Object.assign(o.freight, d.freight || {}); Object.assign(o.delivery, d.delivery || {});
  o.items = (d.items && d.items.length ? d.items : [newItem()]).map((it) => Object.assign(newItem(), it));
  o.payments = (d.payments || []).map((p) => Object.assign({ date: "", kind: "Part payment", mode: "UPI", amount: "", ref: "" }, p));
  o.supplierPayments = (d.supplierPayments || []).map((p) => Object.assign({ date: "", mode: "UPI", amount: "", ref: "" }, p));
  return o;
}

/* Split an amount into value and GST. incl: the amount already contains GST. excl: GST is added on top. */
export function splitTax(amount, rate, mode){
  const a = Number(amount) || 0, r = rate > 0 ? rate : 0;
  if (!r) return { taxable: r2(a), tax: 0, total: r2(a) };
  if (mode === "excl") { const tax = r2(a * r / 100); return { taxable: r2(a), tax, total: r2(a + tax) }; }
  const taxable = r2(a / (1 + r / 100));
  return { taxable, tax: r2(a - taxable), total: r2(a) };
}

export function calc(o){
  const mode = o.gstMode === "excl" ? "excl" : "incl";
  let goods = 0, taxable = 0, goodsTax = 0, goodsTotal = 0, sup = 0;
  const lines = (o.items || []).map((it) => {
    const q = num(it.qty), line = q * num(it.custRate), sa = q * num(it.supRate), t = splitTax(line, num(it.gst), mode);
    goods += line; taxable += t.taxable; goodsTax += t.tax; goodsTotal += t.total; sup += sa;
    return { cust: line, sup: sa, taxable: t.taxable, tax: t.tax, total: t.total, profit: t.taxable - sa };
  });
  const fAmt = num(o.freight && o.freight.amount), fMode = (o.freight && o.freight.mode) || "billed";
  const fs = fMode === "billed" ? splitTax(fAmt, num(o.freight && o.freight.gst), mode) : { taxable: 0, tax: 0, total: 0 };
  const freightBilled = fMode === "billed" ? fAmt : 0, freightCost = fMode === "ours" ? fAmt : 0;
  const payable = goodsTotal + fs.total;
  const received = (o.payments || []).reduce((a, p) => a + num(p.amount), 0);
  const balance = r2(payable - received);
  const supPaid = (o.supplierPayments || []).reduce((a, p) => a + num(p.amount), 0);
  const supDue = r2(sup - supPaid);
  const profit = r2(taxable - sup - freightCost);
  const margin = taxable > 0 ? (profit / taxable) * 100 : 0;
  const payStatus = payable <= 0 ? "No amount yet" : (balance <= 0 ? "Paid in full" : (received > 0 ? "Part paid" : "Unpaid"));
  const supStatus = sup <= 0 ? "No supplier amount" : (supDue <= 0 ? "Paid" : (supPaid > 0 ? "Part paid" : "Not paid"));
  return { lines, mode, goods: r2(goods), taxable: r2(taxable), goodsTax: r2(goodsTax), freightTax: fs.tax, tax: r2(goodsTax + fs.tax), freightBilled, freightTotal: fs.total, freightCost,
    payable: r2(payable), received: r2(received), balance, sup: r2(sup), supPaid: r2(supPaid), supDue, profit, margin, payStatus, supStatus };
}

/* What the customer may see. No supplier price, supplier payments, profit or margin. */
export function customerMessage(o){
  const c = calc(o), L = [];
  L.push("*Order - " + (o.orderNo || "New") + "*");
  if (o.orderDate) L.push("Date - " + fmtDate(o.orderDate));
  L.push("");
  (o.items || []).filter((it) => it.name && it.name.trim()).forEach((it, i) => {
    const q = num(it.qty), r = num(it.custRate);
    let line = (i + 1) + ". " + plain(it.name);
    if (q) line += " - " + q.toLocaleString("en-IN") + " " + (it.unit || "Pcs");
    if (q && r) line += " x " + rs(r) + " = " + rs(q * r);
    L.push(line);
  });
  L.push("");
  if (c.goods) L.push((c.mode === "excl" && c.tax ? "Goods total (before GST) - " : "Goods total - ") + rs(c.goods));
  if (c.mode === "excl" && c.goodsTax) L.push("GST - " + rs(c.goodsTax));
  if (c.freightTotal) L.push("Freight - " + rs(c.freightTotal));
  if (c.payable) L.push("*Total payable - " + rs(c.payable) + "*" + (c.mode === "incl" && c.tax ? " (inclusive of GST)" : ""));
  if (c.received) L.push("Received - " + rs(c.received));
  if (c.payable) L.push("*Balance - " + (c.balance > 0 ? rs(c.balance) : "Nil") + "*", "");
  L.push("Status - " + (o.status || "Booked"));
  const d = o.delivery || {};
  if (d.transporter) L.push("Transport - " + d.transporter);
  if (d.lr) L.push("LR number - " + d.lr);
  if (d.dispatchDate) L.push("Dispatch date - " + fmtDate(d.dispatchDate));
  if (d.deliveredDate) L.push("Delivered on - " + fmtDate(d.deliveredDate));
  if (d.note) L.push(d.note);
  L.push("", "Trusted Firm", "AK Brands Marketing\u00A9");
  return L.join("\n");
}

const csvCell = (v) => { const s = String(v == null ? "" : v); return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
export function toCSV(orders){
  const head = ["Order no", "Order date", "Status", "Customer", "Firm", "Phone", "City", "State", "GSTIN", "Products", "Taxable value", "GST", "Freight billed", "Customer payable", "Received", "Balance", "Customer payment status", "Invoice no", "Supplier", "Supplier total", "Supplier paid", "Supplier due", "Supplier payment status", "URD bill no", "Profit", "Margin %", "Transport", "LR number", "Dispatch date", "Delivered on", "Notes"];
  const rows = orders.map((o) => {
    const c = calc(o), it = (o.items || []).filter((x) => x.name).map((x) => plain(x.name) + " (" + num(x.qty) + " " + (x.unit || "") + ")").join("; ");
    return [o.orderNo, o.orderDate, o.status, o.customer.name, o.customer.firm, prettyPhone(o.customer.phone), o.customer.city, o.customer.state, o.customer.gstin, it, c.taxable, c.tax, c.freightTotal, c.payable, c.received, c.balance, c.payStatus, o.invoiceNo, o.supplier.name, c.sup, c.supPaid, c.supDue, c.supStatus, o.urdNo, c.profit, r2(c.margin), o.delivery.transporter, o.delivery.lr, o.delivery.dispatchDate, o.delivery.deliveredDate, o.notes];
  });
  return "\uFEFF" + [head].concat(rows).map((r) => r.map(csvCell).join(",")).join("\r\n");
}

/* ---------- Tax invoice and URD bill data ---------- */
const addrLines = (a) => String(a || "").split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
function party(name, address, city, state, extra){
  const ls = addrLines(address);
  const st = state ? state + (stateCodeOf(state) ? " (Code " + stateCodeOf(state) + ")" : "") : "";
  const cityLine = [city, extra && extra.pincode ? "- " + extra.pincode : ""].filter(Boolean).join(" ");
  if (cityLine) ls.push(cityLine);
  return { name, lines: ls, state, stateCode: stateCodeOf(state), stateText: st };
}
export function invoiceIssues(o, biz, audience){
  const miss = [];
  if (audience === "transporter") {
    if (!((o.supplier && o.supplier.name) || "").trim()) miss.push("the supplier's name (the sender)");
    if (!((o.supplier && o.supplier.address) || "").trim()) miss.push("the supplier's address (the pick-up place)");
  }
  if (!biz.name) miss.push("your business name");
  if (!biz.address) miss.push("your business address");
  if (!biz.state) miss.push("your state");
  if (!biz.gstin) miss.push("your GSTIN");
  if (!o.customer.state && !(o.customer.gstin || "").slice(0, 2)) miss.push("the customer's state");
  return miss;
}
export function buildInvoice(o, biz, audience){
  const mode = o.gstMode === "excl" ? "excl" : "incl", c = o.customer, d = o.delivery || {};
  const sellerCode = biz.stateCode || stateCodeOf(biz.state);
  const gstinCode = String(c.gstin || "").trim().slice(0, 2);
  const buyerState = c.state || stateNameOf(gstinCode);
  const buyerCode = stateCodeOf(buyerState) || gstinCode;
  const inter = !!(sellerCode && buyerCode && sellerCode !== buyerCode);
  const seller = Object.assign(party(biz.name, biz.address, biz.city, biz.state, { pincode: biz.pincode }), { gstin: biz.gstin || "", pan: biz.pan || "", phone: biz.phone || "", email: biz.email || "" });
  const buyer = Object.assign(party(c.firm || c.name, c.address, c.city, buyerState), { contact: c.firm && c.name ? c.name : "", gstin: c.gstin || "", phone: prettyPhone(c.phone) });
  const ship = c.shipSame === false && (c.shipName || c.shipAddress)
    ? Object.assign(party(c.shipName || buyer.name, c.shipAddress, "", buyerState), { gstin: c.gstin || "" })
    : Object.assign({}, buyer);
  const items = (o.items || []).filter((it) => it.name && it.name.trim());
  let totalQty = 0; const units = new Set();
  const rows = items.map((it, i) => {
    const q = num(it.qty), t = splitTax(q * num(it.custRate), num(it.gst), mode);
    totalQty += q; units.add(it.unit || "Pcs");
    return { sl: i + 1, desc: plain(it.name), hsn: String(it.hsn || "").trim(), gst: num(it.gst), qty: q, unit: it.unit || "Pcs", rate: q ? r2(t.taxable / q) : 0, amount: t.taxable, tax: t.tax };
  });
  const fAmt = num(o.freight && o.freight.amount), fBilled = (o.freight && o.freight.mode) === "billed" && fAmt > 0;
  let freightRow = null;
  if (fBilled) { const t = splitTax(fAmt, num(o.freight.gst), mode); freightRow = { desc: "Freight charges", hsn: "", gst: num(o.freight.gst), amount: t.taxable, tax: t.tax }; }
  const buckets = {}; // key hsn|rate
  rows.concat(freightRow ? [freightRow] : []).forEach((r) => {
    const key = (r.hsn || "") + "|" + r.gst;
    const b = buckets[key] || (buckets[key] = { hsn: r.hsn || "", rate: r.gst, taxable: 0, tax: 0 });
    b.taxable += r.amount; b.tax += r.tax;
  });
  const hsn = Object.keys(buckets).map((k) => {
    const b = buckets[k], tax = r2(b.tax), half = r2(tax / 2);
    return { hsn: b.hsn, rate: b.rate, taxable: r2(b.taxable), cgst: inter ? 0 : half, sgst: inter ? 0 : r2(tax - half), igst: inter ? tax : 0, tax };
  });
  const byRate = {};
  hsn.forEach((h) => { const b = byRate[h.rate] || (byRate[h.rate] = { rate: h.rate, cgst: 0, sgst: 0, igst: 0 }); b.cgst += h.cgst; b.sgst += h.sgst; b.igst += h.igst; });
  const taxLines = [];
  Object.keys(byRate).map(Number).sort((a, b) => a - b).forEach((rate) => {
    const b = byRate[rate]; if (!rate) return;
    if (inter) taxLines.push({ label: "IGST", rate, amount: r2(b.igst) });
    else { taxLines.push({ label: "CGST", rate: rate / 2, amount: r2(b.cgst) }); taxLines.push({ label: "SGST", rate: rate / 2, amount: r2(b.sgst) }); }
  });
  const taxable = r2(hsn.reduce((a, h) => a + h.taxable, 0));
  const tot = { cgst: r2(hsn.reduce((a, h) => a + h.cgst, 0)), sgst: r2(hsn.reduce((a, h) => a + h.sgst, 0)), igst: r2(hsn.reduce((a, h) => a + h.igst, 0)) };
  const tax = r2(tot.cgst + tot.sgst + tot.igst), raw = r2(taxable + tax), total = Math.round(raw), roundOff = r2(total - raw);
  const lines = [];
  /* PRIVACY: supplier details go into the invoice object ONLY for the transporter copy */
  const sup = o.supplier || {};
  const sender = audience === "transporter" ? Object.assign(party(sup.name || "", sup.address, "", ""), { phone: sup.phone || "" }) : null;
  const bank = { holder: biz.bankHolder || "", name: biz.bankName || "", acc: biz.bankAcc || "", ifsc: biz.bankIfsc || "", branch: biz.bankBranch || "", upi: biz.upi || "" };
  return {
    kind: "invoice", audience: audience === "transporter" ? "transporter" : "customer", sender, no: o.invoiceNo || "", date: o.invoiceDate || todayISO(), orderRef: o.orderNo || "", inter, mode,
    seller, buyer, ship, shipSame: c.shipSame !== false || !(c.shipName || c.shipAddress),
    meta: { payTerms: o.payTerms || biz.payTerms || "", lr: d.lr || "", transporter: d.transporter || "", vehicle: d.vehicle || "", eway: d.eway || "", destination: c.city || "", freightNote: (o.freight && o.freight.mode) ? FREIGHT_MODES[o.freight.mode] : "" },
    rows, freightRow, taxLines, hsn, totalQty: r2(totalQty), singleUnit: units.size === 1 ? Array.from(units)[0] : "",
    totals: { taxable, cgst: tot.cgst, sgst: tot.sgst, igst: tot.igst, tax, raw, roundOff, total },
    words: "INR " + inWords(total) + " Only", taxWords: "INR " + inWords(tax) + " Only",
    bank, terms: addrLines(biz.terms || DEFAULT_TERMS), signatory: biz.signatory || "Authorised Signatory", pan: biz.pan || "", extra: lines
  };
}
export function buildUrd(o, biz){
  const s = o.supplier || {}, items = (o.items || []).filter((it) => it.name && it.name.trim());
  let total = 0;
  const rows = items.map((it, i) => { const q = num(it.qty), a = r2(q * num(it.supRate)); total += a; return { sl: i + 1, desc: plain(it.name), hsn: String(it.hsn || "").trim(), qty: q, unit: it.unit || "Pcs", rate: num(it.supRate), amount: a }; });
  total = r2(total);
  const paid = r2((o.supplierPayments || []).reduce((a, p) => a + num(p.amount), 0));
  const buyer = Object.assign(party(biz.name, biz.address, biz.city, biz.state, { pincode: biz.pincode }), { gstin: biz.gstin || "", phone: biz.phone || "", email: biz.email || "" });
  return {
    kind: "urd", handover: { transporter: (o.delivery && o.delivery.transporter) || "", vehicle: (o.delivery && o.delivery.vehicle) || "" }, no: o.urdNo || "", date: o.urdDate || todayISO(), orderRef: o.orderNo || "",
    supplier: Object.assign(party(s.name || "Supplier", s.address, "", ""), { phone: s.phone || "", pan: s.pan || "" }),
    buyer, rows, total, words: "INR " + inWords(total) + " Only", paid, due: r2(total - paid),
    payments: (o.supplierPayments || []).filter((p) => num(p.amount) > 0).map((p) => ({ date: p.date || "", mode: p.mode || "", amount: num(p.amount), ref: p.ref || "" })),
    signatory: biz.signatory || "Authorised Signatory"
  };
}

/* ---------- Links between invoices and URD bills (many to many) ---------- */
export const pairKey = (inv, urd) => inv + "||" + urd;
/* A pair is linked if both numbers sit on the same order (automatic) or if you linked them by hand (saved pairs). */
export function buildLinkIndex(orders, pairs){
  const urdsOf = new Map(), invsOf = new Map(), implicit = new Set(), invOrder = new Map(), urdOrder = new Map();
  const put = (m, k, v) => { if (!m.has(k)) m.set(k, new Set()); m.get(k).add(v); };
  const add = (inv, urd, auto) => { if (!inv || !urd) return; put(urdsOf, inv, urd); put(invsOf, urd, inv); if (auto) implicit.add(pairKey(inv, urd)); };
  (orders || []).forEach((o) => { if (o.invoiceNo) invOrder.set(o.invoiceNo, o); if (o.urdNo) urdOrder.set(o.urdNo, o); add(o.invoiceNo, o.urdNo, true); });
  (pairs || []).forEach((k) => { const i = String(k).indexOf("||"); if (i > 0) add(k.slice(0, i), k.slice(i + 2), false); });
  return { urdsOf, invsOf, implicit, invOrder, urdOrder };
}

/* ---------- Registers: every invoice with its linked URD bills, and every URD bill with its linked invoices ---------- */
const csvCell2 = (v) => { const t = String(v == null ? "" : v); return /[",\n\r]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t; };
export const registerCSV = (head, rows) => "\uFEFF" + [head].concat(rows).map((r) => r.map(csvCell2).join(",")).join("\r\n");
const pname = (o) => (o.customer.firm || o.customer.name || "");
const uniq = (a) => Array.from(new Set(a.filter(Boolean)));
export function salesRegister(orders, biz, idx){
  const head = ["Invoice no", "Invoice date", "Customer", "Customer GSTIN", "Place of supply", "Taxable value", "CGST", "SGST", "IGST", "Invoice total", "Order no", "Linked URD bill no(s)", "Supplier(s)", "Status"];
  const rows = orders.filter((o) => o.invoiceNo).map((o) => {
    const inv = buildInvoice(o, biz, "customer"), t = inv.totals;
    const urds = idx ? Array.from(idx.urdsOf.get(o.invoiceNo) || []) : (o.urdNo ? [o.urdNo] : []);
    const sups = uniq(urds.map((u) => { const x = idx && idx.urdOrder.get(u); return x && x.supplier && x.supplier.name; }));
    return [o.invoiceNo, o.invoiceDate, pname(o), o.customer.gstin || "", inv.buyer.state || "", t.taxable, t.cgst, t.sgst, t.igst, t.total, o.orderNo, urds.join("; ") || "(not linked)", sups.join("; "), o.status || ""];
  });
  return { head, rows };
}
export function purchaseRegister(orders, idx){
  const head = ["URD bill no", "URD bill date", "Supplier", "Supplier address", "Bill amount", "Paid to supplier", "Balance payable", "Order no", "Linked invoice no(s)", "Customer(s)", "Status"];
  const rows = orders.filter((o) => o.urdNo).map((o) => {
    const c = calc(o), s = o.supplier || {};
    const invs = idx ? Array.from(idx.invsOf.get(o.urdNo) || []) : (o.invoiceNo ? [o.invoiceNo] : []);
    const custs = uniq(invs.map((i) => { const x = idx && idx.invOrder.get(i); return x && pname(x); }));
    return [o.urdNo, o.urdDate, s.name || "", String(s.address || "").replace(/\s*\n\s*/g, ", "), c.sup, c.supPaid, Math.max(0, c.supDue), o.orderNo, invs.join("; ") || "(not linked)", custs.join("; "), o.status || ""];
  });
  return { head, rows };
}

/* ---------- Order Confirmed: WhatsApp message and the customer-safe page ---------- */
const UNIT_WORD = { pcs: "pc", pc: "pc", units: "unit", unit: "unit", boxes: "box", box: "box", kit: "kit", kits: "kit" };
export const unitWord = (u) => UNIT_WORD[String(u || "").toLowerCase()] || "unit";
export function rateText(it, sym){
  const r = String(it.custRate == null ? "" : it.custRate).trim();
  if (!r) return "";
  return /^[\d,]+(\.\d+)?$/.test(r) ? sym + r + " per " + unitWord(it.unit) : r;
}
/* Random, unguessable link code (24 characters, about 140 bits). randomBytes(n) must return n random bytes. */
export function makeToken(randomBytes, len){
  len = len || 24;
  const A = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  while (out.length < len) { const b = randomBytes(len); for (let i = 0; i < b.length && out.length < len; i++) if (b[i] < 224) out += A[b[i] % 56]; }
  return out;
}
export function confirmMessage(o, url){
  const c = calc(o), L = [];
  L.push("*Order Confirmed*", "");
  if (o.orderNo) L.push("Order - " + o.orderNo, "");
  const items = (o.items || []).filter((it) => it.name && it.name.trim());
  items.forEach((it) => {
    const q = num(it.qty), rt = rateText(it, "Rs ");
    if (it.lotNo) L.push("Lot number - " + it.lotNo);
    L.push("Product - " + plain(it.name));
    if (q) L.push("Quantity - " + q.toLocaleString("en-IN") + " " + (it.unit || "Pcs"));
    if (rt) L.push("Rate - " + rt);
    if (items.length > 1 && q && num(it.custRate)) L.push("Amount - " + rs(q * num(it.custRate)));
    L.push("");
  });
  if (c.mode === "excl" && c.goodsTax) L.push("Goods total (before GST) - " + rs(c.goods), "GST - " + rs(c.goodsTax));
  if (c.freightTotal) L.push("Freight - " + rs(c.freightTotal));
  if (c.payable) L.push("*Total amount - " + rs(c.payable) + "*" + (c.mode === "incl" && c.tax ? " (inclusive of GST)" : ""), "");
  const pays = (o.payments || []).filter((p) => num(p.amount) > 0);
  pays.forEach((p) => L.push((p.kind === "Token" ? "Token amount" : (p.kind === "Balance" ? "Balance paid" : "Part payment")) + " - " + rs(num(p.amount))));
  if (pays.length) L.push("*Balance - " + (c.balance > 0 ? rs(c.balance) : "Nil") + "*", "");
  if (url) L.push("View details - " + url, "");
  L.push("Trusted Firm", "AK Brands Marketing\u00A9");
  return L.join("\n");
}
/* The ONLY data the public order page can see. No supplier, profit, invoice, URD, phone, address or GSTIN. */
export function buildOrderView(o){
  const c = calc(o), d = o.delivery || {};
  const items = (o.items || []).filter((it) => it.name && it.name.trim()).map((it) => {
    const q = num(it.qty);
    return { lotNo: it.lotNo || "", name: plain(it.name), qty: q ? q.toLocaleString("en-IN") + " " + (it.unit || "Pcs") : "", rate: rateText(it, "\u20B9"), amount: r2(q * num(it.custRate)) };
  });
  return {
    orderNo: o.orderNo || "", orderDate: o.orderDate || "", status: o.status || "Booked",
    customerName: o.customer.firm || o.customer.name || "",
    items, mode: c.mode, goods: c.goods, gstAdded: c.mode === "excl" ? c.goodsTax : 0, gstIncluded: c.mode === "incl" ? c.tax : 0,
    freight: c.freightTotal, total: c.payable, received: c.received, balance: Math.max(0, c.balance),
    payments: (o.payments || []).filter((p) => num(p.amount) > 0).map((p) => ({ date: p.date || "", kind: p.kind || "Part payment", amount: num(p.amount) })),
    delivery: { transporter: d.transporter || "", lr: d.lr || "", dispatchDate: d.dispatchDate || "", deliveredDate: d.deliveredDate || "", note: d.note || "" }
  };
}

/* ---------- The customer's link: lot number + invoice number (labels) + a long random code (the lock) ---------- */
export const SITE_URL = "https://akbrandsmarketing.com";
const slug = (x) => String(x == null ? "" : x).replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
export function orderLinkLabel(o){
  const lots = Array.from(new Set((o.items || []).map((it) => slug(it.lotNo)).filter(Boolean))).slice(0, 3).join("_");
  const parts = [lots, slug(o.invoiceNo)].filter(Boolean);
  return (parts.length ? parts : [slug(o.orderNo) || "order"]).join("-");
}
export const orderLink = (o, token) => SITE_URL + "/order.html?o=" + orderLinkLabel(o) + "-" + token;
/* The page uses ONLY the final 24 characters. The labels in front are ignored, so they can never open an order. */
export function tokenFromSearch(search){
  const m = String(search || "").replace(/^\?/, "").match(/(?:^|[-_=])([A-Za-z0-9]{24})$/);
  return m ? m[1] : "";
}

/* ---------- Delivery details message for the supplier ----------
   This is the ONLY place the customer's name and address are given to a supplier. The customer's real phone is never included:
   the supplier sees AK Brands Marketing's standard number instead. */
export const SUP_CUST_PHONE = "+91 86605 02217";
export const SUP_FROM_PHONE = "+91 97429 26238";
export function supplierDeliveryIssues(o){
  const c = o.customer || {}, miss = [];
  const ship = c.shipSame === false && (c.shipName || c.shipAddress);
  if (!(c.name || c.firm || (ship && c.shipName))) miss.push("the customer's name");
  if (!String((ship ? c.shipAddress : c.address) || "").trim()) miss.push("the customer's address");
  if (!(o.items || []).some((it) => it.name && it.name.trim())) miss.push("at least one product");
  return miss;
}
export function supplierDeliveryMessage(o, biz){
  biz = biz || {};
  const c = o.customer || {}, L = [];
  const ship = c.shipSame === false && (c.shipName || c.shipAddress);
  L.push("*Delivery address*", "");
  (o.items || []).filter((it) => it.name && it.name.trim()).forEach((it) => {
    const q = num(it.qty);
    if (it.lotNo) L.push("Lot number - " + it.lotNo);
    if (q) L.push("Quantity - " + q.toLocaleString("en-IN") + " " + (it.unit || "Pcs"));
    L.push("Product - " + plain(it.name), "");
  });
  const nm = ship && c.shipName ? c.shipName : (c.firm ? c.firm + (c.name ? " (" + c.name + ")" : "") : c.name);
  L.push("Name of customer - " + (nm || ""));
  L.push("Phone number - " + (biz.supCustPhone || SUP_CUST_PHONE), "");
  const addr = String((ship ? c.shipAddress : c.address) || "").split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
  if (!ship) { const cs = [c.city, c.state].filter(Boolean).join(", "); if (cs) addr.push(cs); }
  L.push("Complete customer address -");
  addr.forEach((x) => L.push(x));
  L.push("", "From", "AK Brands Marketing\u00A9", biz.supFromPhone || SUP_FROM_PHONE);
  return L.join("\n");
}
