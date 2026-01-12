#!/bin/bash
# Simple script to update contact information
# Usage: ./RUN_UPDATE.sh

echo "🚀 AK Brands Website - Contact Information Update"
echo "=================================================="
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    echo "Please run this script from the repository root directory"
    exit 1
fi

# Check if on correct branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "update-contact-info" ]; then
    echo "⚠️  Warning: You're on branch '$CURRENT_BRANCH'"
    echo "Switching to 'update-contact-info' branch..."
    git checkout update-contact-info
fi

echo "📝 Updating contact information in index.html..."
echo ""

# Use sed to make the replacements
sed -i.bak 's/+91 98765 43210/+91 8660502217/g' index.html
sed -i.bak 's/contact@akbrands\.com/abdul@akbrandsmarketing.com/g' index.html
sed -i.bak 's/Mumbai, Maharashtra, India/Bengaluru, Karnataka, India/g' index.html
sed -i.bak 's/Mon-Sat, 9:00 AM - 6:00 PM/Mon-Sat, 9 AM to 6 PM/g' index.html

# Remove backup file
rm -f index.html.bak

echo "✅ Contact information updated!"
echo ""
echo "📋 Changes made:"
echo "   • Phone: +91 8660502217"
echo "   • Email: abdul@akbrandsmarketing.com"
echo "   • Location: Bengaluru, Karnataka, India"
echo "   • Hours: Mon-Sat, 9 AM to 6 PM"
echo ""
echo "🔍 Review changes:"
git diff index.html
echo ""
echo "💾 To commit and push:"
echo "   git add index.html"
echo "   git commit -m 'Update contact information to Bengaluru office'"
echo "   git push origin update-contact-info"
echo ""
echo "🔗 Then create a Pull Request at:"
echo "   https://github.com/zaffarsecure-lab/ak-brands-website/compare/main...update-contact-info"
