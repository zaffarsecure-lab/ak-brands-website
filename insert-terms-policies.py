#!/usr/bin/env python3
"""
Script to insert Terms & Conditions and Business Policies sections into index.html
This script reads index.html, finds the footer, and inserts the new sections before it.
"""

def insert_sections():
    # Read the current index.html
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Read the terms and policies sections
    with open('terms-policies-sections.html', 'r', encoding='utf-8') as f:
        new_sections = f.read()
    
    # Find the footer tag
    footer_marker = '    <footer>'
    
    if footer_marker not in content:
        print("ERROR: Could not find footer marker in index.html")
        return False
    
    # Split content at the footer
    parts = content.split(footer_marker, 1)
    
    # Insert the new sections before the footer
    updated_content = parts[0] + '\n' + new_sections + '\n\n' + footer_marker + parts[1]
    
    # Write the updated content back
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print("✅ Successfully inserted Terms & Conditions and Business Policies sections!")
    print("📍 Sections inserted before the footer tag")
    return True

if __name__ == '__main__':
    success = insert_sections()
    exit(0 if success else 1)
