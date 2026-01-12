#!/usr/bin/env python3
"""
Comprehensive Contact Information Update Script
This script updates contact information in index.html using GitHub API
"""

import base64
import json
import os
import sys

try:
    import requests
except ImportError:
    print("Installing requests library...")
    os.system("pip install requests")
    import requests

# Configuration
REPO_OWNER = "zaffarsecure-lab"
REPO_NAME = "ak-brands-website"
BRANCH = "update-contact-info"
FILE_PATH = "index.html"

# Contact information to replace
OLD_PHONE = "+91 98765 43210"
NEW_PHONE = "+91 8660502217"

OLD_EMAIL = "contact@akbrands.com"
NEW_EMAIL = "abdul@akbrandsmarketing.com"

OLD_LOCATION = "Mumbai, Maharashtra, India"
NEW_LOCATION = "Bengaluru, Karnataka, India"

OLD_HOURS = "Mon-Sat, 9:00 AM - 6:00 PM"
NEW_HOURS = "Mon-Sat, 9 AM to 6 PM"

def get_github_token():
    """Get GitHub token from environment variable"""
    token = os.environ.get('GITHUB_TOKEN')
    if not token:
        print("Error: GITHUB_TOKEN environment variable not set")
        print("Please set it with: export GITHUB_TOKEN='your_token_here'")
        sys.exit(1)
    return token

def get_file_content(token):
    """Fetch current file content from GitHub"""
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{FILE_PATH}"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }
    params = {"ref": BRANCH}
    
    response = requests.get(url, headers=headers, params=params)
    if response.status_code != 200:
        print(f"Error fetching file: {response.status_code}")
        print(response.text)
        sys.exit(1)
    
    data = response.json()
    content = base64.b64decode(data['content']).decode('utf-8')
    sha = data['sha']
    
    return content, sha

def update_file_content(token, content, sha):
    """Update file content on GitHub"""
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{FILE_PATH}"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    encoded_content = base64.b64encode(content.encode('utf-8')).decode('utf-8')
    
    data = {
        "message": "Update contact information to Bengaluru office",
        "content": encoded_content,
        "sha": sha,
        "branch": BRANCH
    }
    
    response = requests.put(url, headers=headers, json=data)
    if response.status_code not in [200, 201]:
        print(f"Error updating file: {response.status_code}")
        print(response.text)
        sys.exit(1)
    
    return response.json()

def main():
    print("🔄 Starting contact information update...")
    print(f"   Repository: {REPO_OWNER}/{REPO_NAME}")
    print(f"   Branch: {BRANCH}")
    print()
    
    # Get GitHub token
    token = get_github_token()
    
    # Fetch current file content
    print("📥 Fetching current file content...")
    content, sha = get_file_content(token)
    print(f"   File size: {len(content)} bytes")
    print(f"   SHA: {sha[:8]}...")
    print()
    
    # Make replacements
    print("✏️  Applying updates...")
    original_content = content
    
    content = content.replace(OLD_PHONE, NEW_PHONE)
    print(f"   ✓ Phone: {OLD_PHONE} → {NEW_PHONE}")
    
    content = content.replace(OLD_EMAIL, NEW_EMAIL)
    print(f"   ✓ Email: {OLD_EMAIL} → {NEW_EMAIL}")
    
    content = content.replace(OLD_LOCATION, NEW_LOCATION)
    print(f"   ✓ Location: {OLD_LOCATION} → {NEW_LOCATION}")
    
    content = content.replace(OLD_HOURS, NEW_HOURS)
    print(f"   ✓ Hours: {OLD_HOURS} → {NEW_HOURS}")
    print()
    
    # Check if any changes were made
    if content == original_content:
        print("⚠️  No changes detected. Contact information may already be updated.")
        sys.exit(0)
    
    # Update file on GitHub
    print("📤 Uploading updated file to GitHub...")
    result = update_file_content(token, content, sha)
    print()
    
    print("✅ Contact information updated successfully!")
    print(f"   Commit: {result['commit']['sha'][:8]}...")
    print(f"   View: {result['commit']['html_url']}")
    print()
    print("📋 Next steps:")
    print("   1. Review the changes in the commit")
    print("   2. Create a Pull Request to merge into main branch")
    print(f"   3. Visit: https://github.com/{REPO_OWNER}/{REPO_NAME}/compare/main...{BRANCH}")

if __name__ == "__main__":
    main()
