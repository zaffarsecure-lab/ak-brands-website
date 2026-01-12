# ⚡ Quick Contact Update Guide

## 🎯 What Needs to Change

In the `index.html` file, update the contact section (around line 1569-1573):

### Replace These 3 Lines:

1. **Phone**: `+91 98765 43210` → `+91 8660502217`
2. **Email**: `contact@akbrands.com` → `abdul@akbrandsmarketing.com`
3. **Location**: `Mumbai, Maharashtra, India` → `Bengaluru, Karnataka, India`

---

## 🚀 Fastest Method: GitHub Web Editor

1. **[Click here to edit index.html directly](https://github.com/zaffarsecure-lab/ak-brands-website/edit/update-contact-info/index.html)**

2. Press `Ctrl+F` (or `Cmd+F` on Mac) and search for: `contact@akbrands.com`

3. You'll find this section around line 1569:
   ```html
   <div class="contact-details">
       <p>📞 Phone: +91 98765 43210</p>
       <p>📧 Email: <a href="mailto:contact@akbrands.com">contact@akbrands.com</a></p>
       <p>📍 Location: Mumbai, Maharashtra, India</p>
   ```

4. Change it to:
   ```html
   <div class="contact-details">
       <p>📞 Phone: +91 8660502217</p>
       <p>📧 Email: <a href="mailto:abdul@akbrandsmarketing.com">abdul@akbrandsmarketing.com</a></p>
       <p>📍 Location: Bengaluru, Karnataka, India</p>
   ```

5. Scroll down and click **"Commit changes"**

6. Add commit message: `Update contact information to Bengaluru office`

7. Click **"Commit changes"** again

---

## 🔧 Alternative: Command Line

```bash
# Clone and checkout
git clone https://github.com/zaffarsecure-lab/ak-brands-website.git
cd ak-brands-website
git checkout update-contact-info

# Make the changes using sed
sed -i 's/+91 98765 43210/+91 8660502217/g' index.html
sed -i 's/contact@akbrands\.com/abdul@akbrandsmarketing.com/g' index.html
sed -i 's/Mumbai, Maharashtra, India/Bengaluru, Karnataka, India/g' index.html

# Commit and push
git add index.html
git commit -m "Update contact information to Bengaluru office"
git push origin update-contact-info
```

---

## ✅ After Update

Once committed, create a Pull Request to merge `update-contact-info` into `main` branch.

**Current Branch**: [update-contact-info](https://github.com/zaffarsecure-lab/ak-brands-website/tree/update-contact-info)
