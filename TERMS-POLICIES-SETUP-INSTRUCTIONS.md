# 📋 Terms & Conditions and Business Policies - Setup Instructions

## ✅ What's Already Done

1. **Menu Links Added** ✅
   - "Terms & Conditions" link added to navigation menu
   - "Business Policies" link added to navigation menu
   - Located at lines 2057-2058 in index.html

2. **CSS Styles Added** ✅
   - Complete styling for `.terms` and `.policies` sections
   - Located starting at line 712 in index.html
   - Includes responsive design and professional formatting

3. **HTML Content Created** ✅
   - Complete Terms & Conditions section created
   - Complete Business Policies section created
   - Saved in `terms-policies-sections.html`

## ❌ What's Missing

**The HTML sections need to be inserted into index.html!**

Currently, the menu links point to `#terms` and `#policies`, but these sections don't exist in the HTML yet.

---

## 🚀 How to Complete the Setup

### **METHOD 1: Automated Python Script (Recommended - 2 Minutes)**

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/zaffarsecure-lab/ak-brands-website.git
   cd ak-brands-website
   ```

2. **Run the Python script**:
   ```bash
   python3 insert-terms-policies.py
   ```

3. **Commit and push the changes**:
   ```bash
   git add index.html
   git commit -m "Add Terms & Conditions and Business Policies sections"
   git push origin main
   ```

4. **Done!** ✅ The sections are now live on your website.

---

### **METHOD 2: Manual Copy-Paste (5 Minutes)**

1. **Open index.html** in your code editor

2. **Find the footer section** (around line 2480):
   ```html
   </section>

   <footer>
       <p>&copy; 2026 AK Brands Marketing. All rights reserved. | Trusted B2B Liquidation Partner</p>
   </footer>
   ```

3. **Copy the entire content** from `terms-policies-sections.html`

4. **Paste it BEFORE the `<footer>` tag**:
   ```html
   </section>

   <!-- PASTE THE TERMS & POLICIES SECTIONS HERE -->

   <footer>
       <p>&copy; 2026 AK Brands Marketing. All rights reserved. | Trusted B2B Liquidation Partner</p>
   </footer>
   ```

5. **Save the file**

6. **Commit and push**:
   ```bash
   git add index.html
   git commit -m "Add Terms & Conditions and Business Policies sections"
   git push origin main
   ```

---

### **METHOD 3: GitHub Web Interface (3 Minutes)**

1. **Go to**: https://github.com/zaffarsecure-lab/ak-brands-website

2. **Open** `terms-policies-sections.html`

3. **Copy all the content** (click Raw, then Ctrl+A, Ctrl+C)

4. **Open** `index.html` for editing (click the pencil icon)

5. **Find line 2478** (end of contact section):
   ```html
       </div>
   </section>
   ```

6. **Add a blank line after line 2478**

7. **Paste the copied content**

8. **Scroll down and click** "Commit changes"

9. **Add commit message**: "Add Terms & Conditions and Business Policies sections"

10. **Click** "Commit changes"

---

## 🔍 How to Verify It Works

After completing any of the above methods:

1. **Visit your website**: https://zaffarsecure-lab.github.io/ak-brands-website/

2. **Click the menu button** (☰) in the header

3. **Click "Terms & Conditions"** - should scroll to the Terms section

4. **Click "Business Policies"** - should scroll to the Policies section

5. **Both sections should display** with proper formatting and content

---

## 📍 Exact Insertion Point

**File**: `index.html`  
**Line**: After line 2478 (after `</section>` of contact section)  
**Before**: Line 2480 (`<footer>`)

**Current structure**:
```html
Line 2478:     </section>
Line 2479:
Line 2480:     <footer>
```

**After insertion**:
```html
Line 2478:     </section>
Line 2479:
Line 2480:     <!-- Terms & Conditions Section -->
Line 2481:     <section id="terms" class="terms">
...
(Terms content)
...
Line XXXX:     </section>
Line XXXX:
Line XXXX:     <!-- Business Policies Section -->
Line XXXX:     <section id="policies" class="policies">
...
(Policies content)
...
Line XXXX:     </section>
Line XXXX:
Line XXXX:     <footer>
```

---

## 📦 Files Created

1. **terms-policies-sections.html** - Complete HTML for both sections
2. **insert-terms-policies.py** - Automated Python script
3. **TERMS-POLICIES-SETUP-INSTRUCTIONS.md** - This file

---

## ❓ Need Help?

If you encounter any issues:

1. Check that you're inserting the content in the right location (before `<footer>`)
2. Make sure you copied the entire content from `terms-policies-sections.html`
3. Verify the CSS styles are present (starting at line 712)
4. Clear your browser cache after pushing changes

---

## 🎯 Summary

**Status**: 90% Complete  
**Remaining**: Insert HTML sections into index.html  
**Time Required**: 2-5 minutes  
**Recommended Method**: Python script (METHOD 1)

Once you insert the sections, the Terms & Conditions and Business Policies will be fully functional on your website! 🚀
