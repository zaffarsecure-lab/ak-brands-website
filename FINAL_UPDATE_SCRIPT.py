#!/usr/bin/env python3
"""
FINAL CONTACT UPDATE SCRIPT - Uses GitHub API
==============================================
This script fetches index.html from GitHub, updates it, and pushes back.

REQUIREMENTS:
    pip install PyGithub

USAGE:
    export GITHUB_TOKEN="your_personal_access_token"
    python3 FINAL_UPDATE_SCRIPT.py

OR run locally without GitHub API:
    python3 FINAL_UPDATE_SCRIPT.py --local
"""

import sys
import os
import base64

# Contact replacements
REPLACEMENTS = {
    "+91 98765 43210": "+91 8660502217",
    "contact@akbrands.com": "abdul@akbrandsmarketing.com",
    "Mumbai, Maharashtra, India": "Bengaluru, Karnataka, India",
    "Mon-Sat, 9:00 AM - 6:00 PM": "Mon-Sat, 9 AM to 6 PM",
}

def update_local():
    """Update index.html in current directory"""
    print("🔄 LOCAL UPDATE MODE")
    print("=" * 60)
    
    if not os.path.exists("index.html"):
        print("❌ index.html not found in current directory")
        print("Please run from repository root or use GitHub API mode")
        return False
    
    # Read file
    print("📖 Reading index.html...")
    with open("index.html", "r", encoding="utf-8") as f:
        content = f.read()
    
    # Make replacements
    original = content
    for old, new in REPLACEMENTS.items():
        content = content.replace(old, new)
        if old in original:
            print(f"   ✅ {old} → {new}")
    
    if content == original:
        print("⚠️  No changes needed - already updated!")
        return False
    
    # Write file
    print("\n💾 Saving changes...")
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(content)
    
    print("\n✅ SUCCESS! File updated locally")
    print("\n📋 Next steps:")
    print("   git add index.html")
    print("   git commit -m 'Update contact information to Bengaluru office'")
    print("   git push origin update-contact-info")
    return True

def update_github():
    """Update via GitHub API"""
    try:
        from github import Github
    except ImportError:
        print("❌ PyGithub not installed")
        print("\nInstall it with:")
        print("   pip install PyGithub")
        print("\nOr use local mode:")
        print("   python3 FINAL_UPDATE_SCRIPT.py --local")
        return False
    
    print("🔄 GITHUB API UPDATE MODE")
    print("=" * 60)
    
    # Get token
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        print("❌ GITHUB_TOKEN environment variable not set")
        print("\nSet it with:")
        print("   export GITHUB_TOKEN='your_token_here'")
        print("\nOr use local mode:")
        print("   python3 FINAL_UPDATE_SCRIPT.py --local")
        return False
    
    try:
        # Connect to GitHub
        print("🔗 Connecting to GitHub...")
        g = Github(token)
        repo = g.get_repo("zaffarsecure-lab/ak-brands-website")
        
        # Get file
        print("📥 Fetching index.html from update-contact-info branch...")
        file = repo.get_contents("index.html", ref="update-contact-info")
        content = base64.b64decode(file.content).decode("utf-8")
        
        # Make replacements
        print("\n✏️  Applying updates...")
        original = content
        for old, new in REPLACEMENTS.items():
            if old in content:
                content = content.replace(old, new)
                print(f"   ✅ {old} → {new}")
        
        if content == original:
            print("\n⚠️  No changes needed - already updated!")
            return False
        
        # Update file
        print("\n📤 Pushing changes to GitHub...")
        repo.update_file(
            path="index.html",
            message="Update contact information to Bengaluru office",
            content=content,
            sha=file.sha,
            branch="update-contact-info"
        )
        
        print("\n✅ SUCCESS! File updated on GitHub")
        print("\n🔗 Create Pull Request:")
        print("   https://github.com/zaffarsecure-lab/ak-brands-website/compare/main...update-contact-info")
        return True
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\nTry local mode instead:")
        print("   python3 FINAL_UPDATE_SCRIPT.py --local")
        return False

def main():
    print("\n" + "=" * 60)
    print("🚀 AK BRANDS CONTACT INFORMATION UPDATE")
    print("=" * 60)
    print()
    
    # Check mode
    if "--local" in sys.argv or "-l" in sys.argv:
        success = update_local()
    else:
        success = update_github()
    
    if success:
        print("\n" + "=" * 60)
        print("🎉 ALL DONE!")
        print("=" * 60)
        print()
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())
