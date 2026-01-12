#!/usr/bin/env python3
"""
Script to update contact information in index.html
This script reads the index.html file, updates the contact section, and writes it back.
"""

def update_contact_info():
    # Read the file
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Old contact information
    old_phone = '+91 98765 43210'
    old_email = 'contact@akbrands.com'
    old_location = 'Mumbai, Maharashtra, India'
    
    # New contact information
    new_phone = '+91 8660502217'
    new_email = 'abdul@akbrandsmarketing.com'
    new_location = 'Bengaluru, Karnataka, India'
    
    # Replace contact information
    content = content.replace(old_phone, new_phone)
    content = content.replace(old_email, new_email)
    content = content.replace(old_location, new_location)
    
    # Write the updated content back
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Contact information updated successfully!")
    print(f"   Phone: {new_phone}")
    print(f"   Email: {new_email}")
    print(f"   Location: {new_location}")

if __name__ == '__main__':
    update_contact_info()
