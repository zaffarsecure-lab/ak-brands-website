# Manual Update Instructions for Services Section

## ⚠️ Important Note
The `index.html` file is too large (89KB) for automated updates. Please follow these manual steps carefully.

---

## 📍 STEP 1: Add CSS Styles

### Location: After line 500 (after `.features` styles, before `.testimonials` styles)

**Find this line (around line 500):**
```css
        /* Testimonials Section */
```

**Insert the ENTIRE contents of `services-section-styles.css` BEFORE this line.**

The CSS file contains:
- `.services-intro` styles
- `.service-section` styles
- `.service-heading` styles
- `.service-description` styles
- `.service-list` styles
- `.service-features` styles
- `.feature-item` styles
- `.services-footer` styles
- Responsive media queries

---

## 📍 STEP 2: Replace Services HTML Section

### Location: Lines 1843-1877

**Find this EXACT section (starts at line 1843):**

```html
    <section id="features" class="features">
        <div class="container">
            <h2 class="section-title">Our Services</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <h3>🏭 Bulk Liquidation</h3>
                    <p>Access to large-scale liquidation stock from top brands and retailers across India.</p>
                </div>
                <div class="feature-card">
                    <h3>✅ Quality Assurance</h3>
                    <p>All products are verified and graded to ensure you get exactly what you expect.</p>
                </div>
                <div class="feature-card">
                    <h3>🚚 Logistics Support</h3>
                    <p>End-to-end logistics solutions for seamless delivery across the country.</p>
                </div>
                <div class="feature-card">
                    <h3>💰 Competitive Pricing</h3>
                    <p>Best market rates with transparent pricing and no hidden costs.</p>
                </div>
                <div class="feature-card">
                    <h3>🤝 Trusted Network</h3>
                    <p>Connect with verified buyers and sellers in our trusted B2B network.</p>
                </div>
                <div class="feature-card">
                    <h3>📊 Market Insights</h3>
                    <p>Get real-time market data and trends to make informed business decisions.</p>
                </div>
            </div>
        </div>
    </section>
```

**Replace with the ENTIRE contents of `update-services-section.html`**

---

## ✅ Verification Checklist

After making the changes:

1. **Check CSS Integration:**
   - [ ] New CSS is added before `/* Testimonials Section */`
   - [ ] No syntax errors in CSS
   - [ ] All closing braces are present

2. **Check HTML Integration:**
   - [ ] Old Services section completely removed
   - [ ] New Services section properly inserted
   - [ ] Section ID remains `id="features"`
   - [ ] Proper indentation maintained

3. **Test the Website:**
   - [ ] Open `index.html` in browser
   - [ ] Navigate to Services section
   - [ ] Check all 5 service categories display
   - [ ] Test hover effects on service items
   - [ ] Test responsive design (resize browser)
   - [ ] Verify footer message displays

4. **Cross-Browser Testing:**
   - [ ] Chrome/Edge
   - [ ] Firefox
   - [ ] Safari (if available)
   - [ ] Mobile view

---

## 🎯 Quick Reference

### Files You Need:
1. `services-section-styles.css` - Copy entire content to CSS section
2. `update-services-section.html` - Copy entire content to replace HTML section

### Line Numbers:
- **CSS insertion**: After line ~500 (before `/* Testimonials Section */`)
- **HTML replacement**: Lines 1843-1877 (entire `<section id="features">...</section>`)

---

## 🚨 Common Mistakes to Avoid

1. ❌ Don't forget to include ALL the CSS from `services-section-styles.css`
2. ❌ Don't leave any part of the old Services HTML
3. ❌ Don't change the section ID from `id="features"`
4. ❌ Don't forget the closing `</section>` tag
5. ❌ Don't mix up the indentation (use 4 spaces)

---

## 💡 Alternative: Use the Python Script

If you have Python installed, you can use the automated script:

```bash
# Make sure you're in the repository directory
cd ak-brands-website

# Run the update script
python3 update-services.py
```

The script will:
1. Read all three files
2. Insert CSS at the correct location
3. Replace HTML section automatically
4. Save the updated `index.html`

---

## 📞 Need Help?

If you encounter any issues:
1. Check the PR description for visual examples
2. Review `SERVICES-UPDATE-GUIDE.md` for design details
3. Compare with the helper files in this branch
4. Test in a local copy first before committing

---

## 🎉 After Successful Update

1. Save `index.html`
2. Test locally in browser
3. Commit the changes
4. Push to the branch
5. Merge PR #8 to main

**Expected Result:**
A beautiful, comprehensive Services section with 5 major categories, professional styling, and full responsive design!