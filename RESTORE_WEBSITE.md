# Website Restoration Instructions

## Issue
The website was accidentally modified with incorrect changes. We need to restore it to the previous working version.

## Solution
Restore the website to commit `a458dda` which was the last working version.

## Steps to Restore

### Option 1: Using GitHub Web Interface (Recommended)
1. Go to: https://github.com/zaffarsecure-lab/ak-brands-website/blob/a458dda/index.html
2. Click the "Raw" button
3. Copy all the content (Ctrl+A, Ctrl+C)
4. Go to: https://github.com/zaffarsecure-lab/ak-brands-website/blob/main/index.html
5. Click the pencil icon (Edit this file)
6. Select all content (Ctrl+A) and delete it
7. Paste the copied content (Ctrl+V)
8. Scroll down and commit with message: "Restore website to working version (commit a458dda)"

### Option 2: Using Git Command Line
```bash
git checkout a458dda -- index.html
git commit -m "Restore website to working version (commit a458dda)"
git push origin main
```

## What This Restores
- Working website with all features
- Proper CSS styling
- All sections intact
- No broken layouts

## Commit to Restore From
- Commit SHA: `a458dda`
- Message: "Update index.html"
- Date: 2026-01-17T16:14:20Z
