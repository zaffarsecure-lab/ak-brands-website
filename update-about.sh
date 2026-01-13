#!/bin/bash

# This script updates the About section in index.html

# Download the current index.html
curl -o index.html https://raw.githubusercontent.com/zaffarsecure-lab/ak-brands-website/main/index.html

# Create the new About section content
cat > new_about.txt << 'EOF'
                <p>AK Brands Marketing is one of India's leading B2B liquidation and stock lot sourcing platforms, connecting buyers and sellers of quality liquidation inventory across India. With years of hands-on experience in the wholesale and liquidation industry, we have earned a strong reputation for reliability, transparency, and customer-focused service.</p>
                <p>We specialize in helping retailers, resellers, wholesalers, and online sellers access verified liquidation stock, factory surplus, and clearance inventory at competitive prices. At the same time, we provide manufacturers and distributors with a trusted platform to liquidate excess, slow-moving, or surplus stock efficiently.</p>
                <p>Our end-to-end approach covers quality verification, pricing support, documentation, and logistics coordination, ensuring a smooth and hassle-free experience for both buyers and sellers. Every transaction is handled with professionalism and clear communication, making us a preferred partner in the Indian liquidation market.</p>
                <p>Today, thousands of businesses across India trust AK Brands Marketing for dependable liquidation sourcing, profitable resale opportunities, and long-term business growth.</p>
EOF

# Use sed to replace the About section (lines 1715-1717)
# This is a placeholder - manual edit recommended

echo "Script created. Please manually update lines 1715-1717 in index.html with content from new_about.txt"
