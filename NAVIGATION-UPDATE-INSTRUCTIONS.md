# Navigation Update Instructions

## ✅ Completed Steps

1. **Created `terms.html`** - Standalone Terms & Conditions page
   - URL: https://zaffarsecure-lab.github.io/ak-brands-website/terms.html
   - Professional design with back button to home
   - All 11 terms sections included

2. **Created `policies.html`** - Standalone Business Policies page
   - URL: https://zaffarsecure-lab.github.io/ak-brands-website/policies.html
   - Professional design with back button to home
   - All 12 policy sections included

## 🔄 Remaining Steps

### Step 1: Update Navigation Menu Links

**File:** `index.html`  
**Lines:** Approximately 2057-2058

**Find these lines:**
```html
<a href="#terms">Terms & Conditions</a>
<a href="#policies">Business Policies</a>
```

**Replace with:**
```html
<a href="terms.html">Terms & Conditions</a>
<a href="policies.html">Business Policies</a>
```

### Step 2: Remove Inline Sections from index.html

**File:** `index.html`  
**Lines to Remove:** Approximately 2480-2653 (174 lines)

**Find and DELETE everything from:**
```html
    <!-- Terms & Conditions Section -->
    <section id="terms" class="terms">
```

**Up to and including:**
```html
    </section>
```
(The closing tag just before the `<footer>` tag)

**Important:** Keep the footer and everything after it!

## 🛠️ How to Make These Changes

### Option 1: GitHub Web Interface (Recommended)

1. Go to: https://github.com/zaffarsecure-lab/ak-brands-website/edit/main/index.html
2. Use Ctrl+F (or Cmd+F) to find `<a href="#terms">`
3. Change both menu links as shown in Step 1
4. Use Ctrl+F to find `<!-- Terms & Conditions Section -->`
5. Carefully select and delete all content from that comment down to (and including) the `</section>` tag just before `<footer>`
6. Click "Commit changes"
7. Add commit message: "Update navigation to use separate pages for Terms & Policies"
8. Click "Commit changes" button

### Option 2: Using Git Locally

```bash
# Clone the repository
git clone https://github.com/zaffarsecure-lab/ak-brands-website.git
cd ak-brands-website

# Run the provided Python script
python3 update-navigation.py

# Commit and push
git add index.html
git commit -m "Update navigation to use separate pages for Terms & Policies"
git push origin main
```

### Option 3: Manual Find & Replace

1. Download `index.html` from GitHub
2. Open in your favorite text editor (VS Code, Sublime, Notepad++, etc.)
3. Find and replace:
   - `href="#terms"` → `href="terms.html"`
   - `href="#policies"` → `href="policies.html"`
4. Find `<!-- Terms & Conditions Section -->` and delete from there to the `</section>` tag before `<footer>`
5. Save the file
6. Upload back to GitHub or commit via git

## ✅ Verification

After making the changes:

1. Visit: https://zaffarsecure-lab.github.io/ak-brands-website/
2. Click the menu button (☰)
3. Click "Terms & Conditions" - should open https://zaffarsecure-lab.github.io/ak-brands-website/terms.html in same or new tab
4. Click "Business Policies" - should open https://zaffarsecure-lab.github.io/ak-brands-website/policies.html in same or new tab
5. Verify the main page no longer has the inline Terms & Policies sections

## 📊 Expected Results

- **Before:** index.html = 116,242 bytes (3,359 lines)
- **After:** index.html ≈ 101,000 bytes (3,185 lines)
- **Reduction:** ~15KB, 174 lines removed

## 🎯 Final Structure

```
ak-brands-website/
├── index.html (main page - no inline Terms/Policies)
├── terms.html (standalone Terms & Conditions page)
├── policies.html (standalone Business Policies page)
└── ... (other files)
```

## 📞 Need Help?

If you encounter any issues, the Python script `update-navigation.py` is available in the repository to automate this process.

---

**Last Updated:** January 16, 2026  
**Status:** Awaiting final index.html update
