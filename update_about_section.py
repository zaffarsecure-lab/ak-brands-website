#!/usr/bin/env python3
"""
Script to update the About section in index.html
Run this script to automatically update the About section content
"""

import re

# Read the current index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Old content to find
old_content = '''                <p>AK Brands Marketing is India's premier B2B liquidation platform, connecting buyers and sellers of quality liquidation stock across the country. With years of experience in the industry, we've built a reputation for reliability, transparency, and exceptional service.</p>
                <p>Our mission is to provide businesses with access to high-quality liquidation inventory at competitive prices, while offering sellers a trusted platform to move their excess stock efficiently. We handle everything from quality verification to logistics, making the entire process seamless for our clients.</p>
                <p>Join thousands of satisfied businesses who trust AK Brands Marketing for their liquidation needs.</p>'''

# New content to replace with
new_content = '''                <p>AK Brands Marketing is one of India's leading B2B liquidation and stock lot sourcing platforms, connecting buyers and sellers of quality liquidation inventory across India. With years of hands-on experience in the wholesale and liquidation industry, we have earned a strong reputation for reliability, transparency, and customer-focused service.</p>
                <p>We specialize in helping retailers, resellers, wholesalers, and online sellers access verified liquidation stock, factory surplus, and clearance inventory at competitive prices. At the same time, we provide manufacturers and distributors with a trusted platform to liquidate excess, slow-moving, or surplus stock efficiently.</p>
                <p>Our end-to-end approach covers quality verification, pricing support, documentation, and logistics coordination, ensuring a smooth and hassle-free experience for both buyers and sellers. Every transaction is handled with professionalism and clear communication, making us a preferred partner in the Indian liquidation market.</p>
                <p>Today, thousands of businesses across India trust AK Brands Marketing for dependable liquidation sourcing, profitable resale opportunities, and long-term business growth.</p>'''

# Replace the content
updated_content = content.replace(old_content, new_content)

# Write back to index.html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("✅ About section updated successfully!")
print("📝 Please commit and push the changes to GitHub")
