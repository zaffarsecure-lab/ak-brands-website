#!/usr/bin/env python3
"""
Script to update AK Brands website navigation:
1. Change menu links from #terms and #policies to separate pages
2. Remove the inline Terms & Conditions and Business Policies sections
"""

def update_index_html():
    # Read the current index.html
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update menu links to point to separate pages
    content = content.replace('<a href="#terms">Terms & Conditions</a>', '<a href="terms.html">Terms & Conditions</a>')
    content = content.replace('<a href="#policies">Business Policies</a>', '<a href="policies.html">Business Policies</a>')
    
    # Find and remove the Terms & Conditions section
    terms_start = content.find('<!-- Terms & Conditions Section -->')
    if terms_start != -1:
        # Find the end of the policies section (just before footer)
        footer_start = content.find('<footer>', terms_start)
        if footer_start != -1:
            # Remove everything between the comment and the footer
            # Keep one blank line for spacing
            content = content[:terms_start] + '\n    ' + content[footer_start:]
            print("✅ Removed Terms & Conditions and Business Policies sections")
        else:
            print("❌ Could not find footer tag")
    else:
        print("❌ Could not find Terms & Conditions section")
    
    # Write the updated content
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Navigation links updated to point to separate pages")
    print("✅ index.html has been updated successfully!")

if __name__ == '__main__':
    update_index_html()
