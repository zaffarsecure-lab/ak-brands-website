#!/usr/bin/env python3
"""
Automated script to update the Services section in index.html
This script:
1. Reads the current index.html
2. Adds new CSS styles after the .features section styles
3. Replaces the Services HTML section (lines 1843-1877)
4. Writes the updated file back
"""

import re

# Read the helper files
with open('services-section-styles.css', 'r') as f:
    new_css = f.read()

with open('update-services-section.html', 'r') as f:
    new_html = f.read()

# Read the current index.html
with open('index.html', 'r') as f:
    content = f.read()

# Step 1: Add CSS styles after the .features section
# Find the end of .features styles (around line 500)
css_insertion_point = content.find('        /* Features Section */')
if css_insertion_point == -1:
    print("❌ Could not find CSS insertion point")
    exit(1)

# Find the end of the features CSS block
features_css_end = content.find('        /* Testimonials Section */', css_insertion_point)
if features_css_end == -1:
    print("❌ Could not find end of Features CSS")
    exit(1)

# Insert new CSS before Testimonials Section
content = content[:features_css_end] + '\n' + new_css + '\n\n' + content[features_css_end:]
print("✅ Step 1: CSS styles added successfully")

# Step 2: Replace Services HTML section
# Find the Services section
services_start = content.find('    <section id="features" class="features">')
if services_start == -1:
    print("❌ Could not find Services section start")
    exit(1)

# Find the end of the Services section
services_end = content.find('    </section>', services_start)
if services_end == -1:
    print("❌ Could not find Services section end")
    exit(1)

# Include the closing </section> tag
services_end += len('    </section>')

# Replace the old Services section with new one
content = content[:services_start] + new_html + content[services_end:]
print("✅ Step 2: Services HTML section replaced successfully")

# Write the updated content back
with open('index.html', 'w') as f:
    f.write(content)

print("\n🎉 Update completed successfully!")
print("\n📋 Summary:")
print("  ✅ CSS styles added")
print("  ✅ Services HTML section replaced")
print("\n🚀 Next steps:")
print("  1. Review the changes in index.html")
print("  2. Test the website locally")
print("  3. Commit and push the changes")
