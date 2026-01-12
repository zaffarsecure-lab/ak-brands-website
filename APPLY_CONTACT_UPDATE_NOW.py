#!/usr/bin/env python3
"""
INSTANT CONTACT UPDATE SCRIPT
==============================
This script will update the contact information in index.html RIGHT NOW.

USAGE:
    python3 APPLY_CONTACT_UPDATE_NOW.py

The script will:
1. Read index.html from the current directory
2. Make the contact information replacements
3. Save the updated file
4. Show you what changed

Then you just need to:
    git add index.html
    git commit -m "Update contact information to Bengaluru office"
    git push origin update-contact-info
"""

import os
import sys

# Contact information replacements
REPLACEMENTS = [
    ("+91 98765 43210", "+91 8660502217"),
    ("contact@akbrands.com", "abdul@akbrandsmarketing.com"),
    ("Mumbai, Maharashtra, India", "Bengaluru, Karnataka, India"),
    ("Mon-Sat, 9:00 AM - 6:00 PM", "Mon-Sat, 9 AM to 6 PM"),
]

def main():
    print("=" * 60)
    print("🚀 AK BRANDS CONTACT INFORMATION UPDATE")
    print("=" * 60)
    print()
    
    # Check if index.html exists
    if not os.path.exists("index.html"):
        print("❌ ERROR: index.html not found in current directory")
        print()
        print("Please run this script from the repository root:")
        print("  cd /path/to/ak-brands-website")
        print("  python3 APPLY_CONTACT_UPDATE_NOW.py")
        sys.exit(1)
    
    # Read the file
    print("📖 Reading index.html...")
    with open("index.html", "r", encoding="utf-8") as f:
        content = f.read()
    
    original_content = content
    changes_made = []
    
    # Make replacements
    print("✏️  Applying updates...")
    print()
    for old_value, new_value in REPLACEMENTS:
        if old_value in content:
            content = content.replace(old_value, new_value)
            changes_made.append((old_value, new_value))
            print(f"   ✅ {old_value}")
            print(f"      → {new_value}")
            print()
        else:
            print(f"   ⚠️  Not found: {old_value}")
            print()
    
    # Check if any changes were made
    if content == original_content:
        print("=" * 60)
        print("⚠️  NO CHANGES MADE")
        print("=" * 60)
        print()
        print("The contact information may already be updated,")
        print("or the old values were not found in the file.")
        sys.exit(0)
    
    # Save the file
    print("💾 Saving updated index.html...")
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(content)
    
    print()
    print("=" * 60)
    print("✅ SUCCESS! Contact information updated!")
    print("=" * 60)
    print()
    print(f"📊 Changes made: {len(changes_made)}")
    print()
    print("📋 NEXT STEPS:")
    print("=" * 60)
    print()
    print("1. Review the changes:")
    print("   git diff index.html")
    print()
    print("2. Commit the changes:")
    print("   git add index.html")
    print("   git commit -m 'Update contact information to Bengaluru office'")
    print()
    print("3. Push to GitHub:")
    print("   git push origin update-contact-info")
    print()
    print("4. Create Pull Request:")
    print("   https://github.com/zaffarsecure-lab/ak-brands-website/compare/main...update-contact-info")
    print()
    print("=" * 60)
    print()
    print("🎉 All done! Your website contact info is now updated!")
    print()

if __name__ == "__main__":
    main()
