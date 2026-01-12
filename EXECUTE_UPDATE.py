#!/usr/bin/env python3
"""
EXECUTE UPDATE - Direct file update via GitHub API
===================================================
This script updates index.html directly using GitHub's API.

USAGE:
    Set GITHUB_TOKEN environment variable, then run:
    python3 EXECUTE_UPDATE.py
"""

import os
import sys
import base64
import json

try:
    import requests
except ImportError:
    print("❌ 'requests' library not installed")
    print("\nInstall it with:")
    print("   pip install requests")
    sys.exit(1)

# Configuration
REPO_OWNER = "zaffarsecure-lab"
REPO_NAME = "ak-brands-website"
BRANCH = "update-contact-info"
FILE_PATH = "index.html"

# Replacements to make
REPLACEMENTS = {
    "+91 98765 43210": "+91 8660502217",
    "contact@akbrands.com": "abdul@akbrandsmarketing.com",
    "Mumbai, Maharashtra, India": "Bengaluru, Karnataka, India",
    "Mon-Sat, 9:00 AM - 6:00 PM": "Mon-Sat, 9 AM to 6 PM",
}

def main():
    print("\n" + "=" * 60)
    print("🚀 AK BRANDS CONTACT UPDATE - DIRECT EXECUTION")
    print("=" * 60)
    print()
    
    # Get GitHub token
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        print("❌ GITHUB_TOKEN environment variable not set")
        print("\nGet your token from: https://github.com/settings/tokens")
        print("Then set it with:")
        print("   export GITHUB_TOKEN='your_token_here'")
        return 1
    
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    # Step 1: Get current file
    print("📥 Fetching current index.html...")
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{FILE_PATH}?ref={BRANCH}"
    
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"❌ Failed to fetch file: {response.status_code}")
        print(response.text)
        return 1
    
    file_data = response.json()
    current_content = base64.b64decode(file_data["content"]).decode("utf-8")
    file_sha = file_data["sha"]
    
    print(f"✅ File fetched ({len(current_content)} characters)")
    
    # Step 2: Make replacements
    print("\n✏️  Applying updates...")
    updated_content = current_content
    changes_made = 0
    
    for old, new in REPLACEMENTS.items():
        if old in updated_content:
            updated_content = updated_content.replace(old, new)
            print(f"   ✅ {old} → {new}")
            changes_made += 1
        else:
            print(f"   ⚠️  '{old}' not found (might already be updated)")
    
    if changes_made == 0:
        print("\n⚠️  No changes needed - file already updated!")
        return 0
    
    # Step 3: Update file on GitHub
    print(f"\n📤 Pushing {changes_made} change(s) to GitHub...")
    
    update_data = {
        "message": "Update contact information to Bengaluru office",
        "content": base64.b64encode(updated_content.encode("utf-8")).decode("utf-8"),
        "sha": file_sha,
        "branch": BRANCH
    }
    
    response = requests.put(url, headers=headers, json=update_data)
    if response.status_code not in [200, 201]:
        print(f"❌ Failed to update file: {response.status_code}")
        print(response.text)
        return 1
    
    print("✅ File updated successfully on GitHub!")
    
    # Success!
    print("\n" + "=" * 60)
    print("🎉 UPDATE COMPLETE!")
    print("=" * 60)
    print()
    print("📋 Changes applied:")
    print("   • Phone: +91 8660502217")
    print("   • Email: abdul@akbrandsmarketing.com")
    print("   • Location: Bengaluru, Karnataka, India")
    print("   • Hours: Mon-Sat, 9 AM to 6 PM")
    print()
    print("🔗 Next step - Create Pull Request:")
    print(f"   https://github.com/{REPO_OWNER}/{REPO_NAME}/compare/main...{BRANCH}")
    print()
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
