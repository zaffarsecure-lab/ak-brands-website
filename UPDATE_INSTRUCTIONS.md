# Contact Information Update Instructions

## Automated Update (Recommended)

### Option 1: Using Python Script
```bash
# Clone the repository
git clone https://github.com/zaffarsecure-lab/ak-brands-website.git
cd ak-brands-website

# Checkout the update branch
git checkout update-contact-info

# Run the update script
python3 update_contact.py

# Commit and push changes
git add index.html
git commit -m "Update contact information to Bengaluru office"
git push origin update-contact-info
```

### Option 2: Using Bash Script
```bash
chmod +x run_update.sh
./run_update.sh
# Follow the instructions displayed
```

## Manual Update

Edit `index.html` at **lines 1569-1573** and replace:

### OLD Contact Information:
```html
<p>📞 Phone: +91 98765 43210</p>
<p>📧 Email: <a href="mailto:contact@akbrands.com">contact@akbrands.com</a></p>
<p>📍 Location: Mumbai, Maharashtra, India</p>
<p>🕒 Business Hours: Mon-Sat, 9:00 AM - 6:00 PM</p>
```

### NEW Contact Information:
```html
<p>📞 Phone: +91 8660502217</p>
<p>📧 Email: <a href="mailto:abdul@akbrandsmarketing.com">abdul@akbrandsmarketing.com</a></p>
<p>📍 Location: Bengaluru, Karnataka, India</p>
<p>🕒 Business Hours: Mon-Sat, 9:00 AM - 6:00 PM</p>
```

## Quick Links

- **Edit File Directly**: [Click here to edit index.html](https://github.com/zaffarsecure-lab/ak-brands-website/edit/update-contact-info/index.html)
- **View Branch**: [update-contact-info branch](https://github.com/zaffarsecure-lab/ak-brands-website/tree/update-contact-info)

## After Update

1. Create a Pull Request from `update-contact-info` to `main`
2. Review the changes
3. Merge the Pull Request
4. The website will be automatically updated

---

**Note**: The Python script (`update_contact.py`) automates this entire process by finding and replacing all instances of the old contact information with the new one.
