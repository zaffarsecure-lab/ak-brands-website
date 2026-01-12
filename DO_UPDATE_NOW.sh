#!/bin/bash
# SIMPLE UPDATE SCRIPT - Just run this!

echo "🔄 Updating AK Brands contact information..."
echo ""

# Make the replacements
sed -i 's/+91 98765 43210/+91 8660502217/g' index.html
sed -i 's/contact@akbrands\.com/abdul@akbrandsmarketing.com/g' index.html  
sed -i 's/Mumbai, Maharashtra, India/Bengaluru, Karnataka, India/g' index.html
sed -i 's/Mon-Sat, 9:00 AM - 6:00 PM/Mon-Sat, 9 AM to 6 PM/g' index.html

echo "✅ Contact information updated!"
echo ""
echo "📋 Changes made:"
echo "   • Phone: +91 8660502217"
echo "   • Email: abdul@akbrandsmarketing.com"
echo "   • Location: Bengaluru, Karnataka, India"
echo "   • Hours: Mon-Sat, 9 AM to 6 PM"
echo ""
echo "💾 Now commit and push:"
echo "   git add index.html"
echo "   git commit -m 'Update contact information to Bengaluru office'"
echo "   git push origin update-contact-info"
