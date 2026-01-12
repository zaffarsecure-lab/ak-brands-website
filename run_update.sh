#!/bin/bash
# Script to update contact information and commit changes

echo "🔄 Updating contact information..."
python3 update_contact.py

if [ $? -eq 0 ]; then
    echo "✅ Update completed successfully!"
    echo ""
    echo "📝 To apply changes:"
    echo "   1. Run: git add index.html"
    echo "   2. Run: git commit -m 'Update contact information to Bengaluru office'"
    echo "   3. Run: git push origin update-contact-info"
    echo ""
    echo "Then create a Pull Request to merge into main branch."
else
    echo "❌ Update failed!"
    exit 1
fi
