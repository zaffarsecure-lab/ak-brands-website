#!/usr/bin/env python3
"""
Automated script to update the Services section in index.html
Run this script to automatically apply all changes.
"""

import os
import sys

def read_file(filename):
    """Read file content"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"❌ Error: {filename} not found!")
        print(f"   Make sure you're in the repository directory.")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error reading {filename}: {e}")
        sys.exit(1)

def write_file(filename, content):
    """Write content to file"""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    except Exception as e:
        print(f"❌ Error writing {filename}: {e}")
        return False

def main():
    print("🚀 AK Brands Services Section Update Script")
    print("=" * 60)
    print()

    # Check if files exist
    if not os.path.exists('index.html'):
        print("❌ index.html not found!")
        print("   Please run this script from the repository root directory.")
        sys.exit(1)

    if not os.path.exists('services-section-styles.css'):
        print("❌ services-section-styles.css not found!")
        print("   Please make sure all helper files are in the same directory.")
        sys.exit(1)

    if not os.path.exists('update-services-section.html'):
        print("❌ update-services-section.html not found!")
        print("   Please make sure all helper files are in the same directory.")
        sys.exit(1)

    print("✅ All required files found")
    print()

    # Read files
    print("📖 Reading files...")
    index_content = read_file('index.html')
    new_css = read_file('services-section-styles.css')
    new_html = read_file('update-services-section.html')
    print("✅ Files loaded successfully")
    print()

    # Backup original file
    print("💾 Creating backup...")
    if write_file('index.html.backup', index_content):
        print("✅ Backup created: index.html.backup")
    print()

    # Step 1: Add CSS
    print("🎨 Step 1: Adding CSS styles...")
    css_marker = '        /* Testimonials Section */'
    
    if css_marker not in index_content:
        print("❌ Could not find CSS insertion point!")
        print("   Looking for: /* Testimonials Section */")
        sys.exit(1)
    
    # Insert CSS before Testimonials Section
    css_position = index_content.find(css_marker)
    updated_content = (
        index_content[:css_position] +
        '\n' + new_css + '\n\n' +
        index_content[css_position:]
    )
    print("✅ CSS styles added successfully")
    print()

    # Step 2: Replace HTML
    print("🔄 Step 2: Replacing Services HTML section...")
    
    # Find the Services section
    html_start_marker = '    <section id="features" class="features">'
    html_end_marker = '    </section>'
    
    if html_start_marker not in updated_content:
        print("❌ Could not find Services section start!")
        sys.exit(1)
    
    # Find the start of Services section
    services_start = updated_content.find(html_start_marker)
    
    # Find the end of Services section (first </section> after the start)
    services_end = updated_content.find(html_end_marker, services_start)
    
    if services_end == -1:
        print("❌ Could not find Services section end!")
        sys.exit(1)
    
    # Include the closing tag
    services_end += len(html_end_marker)
    
    # Replace the section
    final_content = (
        updated_content[:services_start] +
        new_html +
        updated_content[services_end:]
    )
    
    print("✅ Services HTML section replaced successfully")
    print()

    # Write the updated file
    print("💾 Saving updated index.html...")
    if write_file('index.html', final_content):
        print("✅ File saved successfully!")
    else:
        print("❌ Failed to save file!")
        sys.exit(1)
    
    print()
    print("=" * 60)
    print("🎉 UPDATE COMPLETED SUCCESSFULLY!")
    print("=" * 60)
    print()
    print("📋 Summary:")
    print("  ✅ CSS styles added")
    print("  ✅ Services HTML section replaced")
    print("  ✅ Backup created (index.html.backup)")
    print()
    print("🚀 Next steps:")
    print("  1. Open index.html in your browser to preview")
    print("  2. Check that the Services section looks correct")
    print("  3. If everything looks good:")
    print("     git add index.html")
    print("     git commit -m 'Update Services section with B2B Liquidation content'")
    print("     git push")
    print()
    print("💡 If something went wrong:")
    print("   Restore from backup: cp index.html.backup index.html")
    print()

if __name__ == '__main__':
    main()
