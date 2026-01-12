# 📞 Complete Contact Information Update Guide

## 🎯 What Needs to Change

Update the contact section in `index.html` (lines 1569-1572):

### Current Contact Information:
```html
<p>📞 Phone: +91 98765 43210</p>
<p>📧 Email: <a href="mailto:contact@akbrands.com">contact@akbrands.com</a></p>
<p>📍 Location: Mumbai, Maharashtra, India</p>
<p>🕒 Business Hours: Mon-Sat, 9:00 AM - 6:00 PM</p>
```

### New Contact Information:
```html
<p>📞 Phone: +91 8660502217</p>
<p>📧 Email: <a href="mailto:abdul@akbrandsmarketing.com">abdul@akbrandsmarketing.com</a></p>
<p>📍 Location: Bengaluru, Karnataka, India</p>
<p>🕒 Business Hours: Mon-Sat, 9 AM to 6 PM</p>
```

---

## 🚀 Method 1: Direct Web Edit (FASTEST - 2 minutes)

### Step-by-Step:

1. **[Click here to edit index.html](https://github.com/zaffarsecure-lab/ak-brands-website/edit/update-contact-info/index.html)**

2. Press `Ctrl+F` (Windows/Linux) or `Cmd+F` (Mac)

3. Search for: `contact@akbrands.com`

4. You'll jump to line ~1570. Replace these 4 lines:

   **OLD:**
   ```html
   <p>📞 Phone: +91 98765 43210</p>
   <p>📧 Email: <a href="mailto:contact@akbrands.com">contact@akbrands.com</a></p>
   <p>📍 Location: Mumbai, Maharashtra, India</p>
   <p>🕒 Business Hours: Mon-Sat, 9:00 AM - 6:00 PM</p>
   ```

   **NEW:**
   ```html
   <p>📞 Phone: +91 8660502217</p>
   <p>📧 Email: <a href="mailto:abdul@akbrandsmarketing.com">abdul@akbrandsmarketing.com</a></p>
   <p>📍 Location: Bengaluru, Karnataka, India</p>
   <p>📞 Business Hours: Mon-Sat, 9 AM to 6 PM</p>
   ```

5. Scroll down and click **"Commit changes"**

6. Add commit message: `Update contact information to Bengaluru office`

7. Click **"Commit changes"** again

✅ **Done!** The file is now updated on the `update-contact-info` branch.

---

## 🔧 Method 2: Automated Script (Command Line)

### Option A: Using Bash Script

```bash
# Clone repository
git clone https://github.com/zaffarsecure-lab/ak-brands-website.git
cd ak-brands-website

# Checkout branch
git checkout update-contact-info

# Make script executable and run
chmod +x RUN_UPDATE.sh
./RUN_UPDATE.sh

# Follow the instructions displayed
```

### Option B: Using Python Script

```bash
# Clone repository
git clone https://github.com/zaffarsecure-lab/ak-brands-website.git
cd ak-brands-website

# Checkout branch
git checkout update-contact-info

# Run Python script
python3 update_contact.py

# Commit and push
git add index.html
git commit -m "Update contact information to Bengaluru office"
git push origin update-contact-info
```

### Option C: Using GitHub API Script

```bash
# Set your GitHub token
export GITHUB_TOKEN="your_github_personal_access_token"

# Run the API script
python3 apply_contact_update.py
```

---

## 🔄 Method 3: Manual Command Line (sed)

```bash
# Clone and checkout
git clone https://github.com/zaffarsecure-lab/ak-brands-website.git
cd ak-brands-website
git checkout update-contact-info

# Make replacements using sed
sed -i 's/+91 98765 43210/+91 8660502217/g' index.html
sed -i 's/contact@akbrands\.com/abdul@akbrandsmarketing.com/g' index.html
sed -i 's/Mumbai, Maharashtra, India/Bengaluru, Karnataka, India/g' index.html
sed -i 's/Mon-Sat, 9:00 AM - 6:00 PM/Mon-Sat, 9 AM to 6 PM/g' index.html

# Commit and push
git add index.html
git commit -m "Update contact information to Bengaluru office"
git push origin update-contact-info
```

---

## ✅ After Update - Create Pull Request

Once the file is updated on the `update-contact-info` branch:

1. **[Create Pull Request](https://github.com/zaffarsecure-lab/ak-brands-website/compare/main...update-contact-info)**

2. Review the changes

3. Add description: "Updated contact information to Bengaluru office details"

4. Click **"Create pull request"**

5. Review and **"Merge pull request"**

6. The website will be updated!

---

## 📋 Summary of Changes

| Field | Old Value | New Value |
|-------|-----------|-----------|
| **Phone** | +91 98765 43210 | +91 8660502217 |
| **Email** | contact@akbrands.com | abdul@akbrandsmarketing.com |
| **Location** | Mumbai, Maharashtra, India | Bengaluru, Karnataka, India |
| **Hours** | Mon-Sat, 9:00 AM - 6:00 PM | Mon-Sat, 9 AM to 6 PM |

---

## 🔗 Quick Links

- **Direct Edit**: [Edit index.html now](https://github.com/zaffarsecure-lab/ak-brands-website/edit/update-contact-info/index.html)
- **View Branch**: [update-contact-info](https://github.com/zaffarsecure-lab/ak-brands-website/tree/update-contact-info)
- **Create PR**: [New Pull Request](https://github.com/zaffarsecure-lab/ak-brands-website/compare/main...update-contact-info)
- **Repository**: [ak-brands-website](https://github.com/zaffarsecure-lab/ak-brands-website)

---

## 📞 Need Help?

If you encounter any issues:
1. Check that you're on the `update-contact-info` branch
2. Ensure you have write access to the repository
3. Verify the file path is correct: `index.html`
4. Contact the repository administrator

---

**Last Updated**: January 12, 2026  
**Branch**: update-contact-info  
**Status**: Ready for update
