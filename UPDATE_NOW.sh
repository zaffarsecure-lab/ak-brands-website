#!/bin/bash
#
# ONE-COMMAND CONTACT UPDATE
# ==========================
# This script updates all contact information in one go!
#
# USAGE: Just run this command in your terminal:
#   bash UPDATE_NOW.sh
#

set -e  # Exit on any error

echo "=========================================="
echo "🚀 AK BRANDS CONTACT UPDATE"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ ERROR: index.html not found!"
    echo ""
    echo "Please run this from the repository directory:"
    echo "  cd ak-brands-website"
    echo "  bash UPDATE_NOW.sh"
    exit 1
fi

# Make a backup
echo "📦 Creating backup..."
cp index.html index.html.backup
echo "   ✅ Backup created: index.html.backup"
echo ""

# Apply updates
echo "✏️  Updating contact information..."
echo ""

# Phone number
if grep -q "+91 98765 43210" index.html; then
    sed -i.tmp 's/+91 98765 43210/+91 8660502217/g' index.html
    echo "   ✅ Phone: +91 8660502217"
else
    echo "   ⚠️  Phone already updated or not found"
fi

# Email
if grep -q "contact@akbrands.com" index.html; then
    sed -i.tmp 's/contact@akbrands\.com/abdul@akbrandsmarketing.com/g' index.html
    echo "   ✅ Email: abdul@akbrandsmarketing.com"
else
    echo "   ⚠️  Email already updated or not found"
fi

# Location
if grep -q "Mumbai, Maharashtra, India" index.html; then
    sed -i.tmp 's/Mumbai, Maharashtra, India/Bengaluru, Karnataka, India/g' index.html
    echo "   ✅ Location: Bengaluru, Karnataka, India"
else
    echo "   ⚠️  Location already updated or not found"
fi

# Business hours
if grep -q "Mon-Sat, 9:00 AM - 6:00 PM" index.html; then
    sed -i.tmp 's/Mon-Sat, 9:00 AM - 6:00 PM/Mon-Sat, 9 AM to 6 PM/g' index.html
    echo "   ✅ Hours: Mon-Sat, 9 AM to 6 PM"
else
    echo "   ⚠️  Hours already updated or not found"
fi

# Clean up temp files
rm -f index.html.tmp

echo ""
echo "=========================================="
echo "✅ UPDATE COMPLETE!"
echo "=========================================="
echo ""
echo "📋 What changed:"
echo "   • Phone: +91 8660502217"
echo "   • Email: abdul@akbrandsmarketing.com"
echo "   • Location: Bengaluru, Karnataka, India"
echo "   • Hours: Mon-Sat, 9 AM to 6 PM"
echo ""
echo "🔍 Review changes:"
echo "   git diff index.html"
echo ""
echo "💾 To save and push:"
echo "   git add index.html"
echo "   git commit -m 'Update contact information to Bengaluru office'"
echo "   git push origin update-contact-info"
echo ""
echo "🔗 Then create Pull Request:"
echo "   https://github.com/zaffarsecure-lab/ak-brands-website/compare/main...update-contact-info"
echo ""
echo "📦 Backup saved as: index.html.backup"
echo "   (Delete it after you're happy with the changes)"
echo ""
echo "=========================================="
echo "🎉 Done! Your contact info is updated!"
echo "=========================================="
