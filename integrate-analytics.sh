#!/bin/bash

# Google Analytics Integration Script
# Measurement ID: G-SH29FGTV34

echo "🚀 Adding Google Analytics to AK Brands Website..."

# Create the Google Analytics code
cat > /tmp/ga-code.txt << 'GACODE'
    <!-- Google Analytics 4 - Visitor Tracking -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-SH29FGTV34"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-SH29FGTV34', {
            'anonymize_ip': true,
            'send_page_view': true
        });
    </script>

GACODE

# Insert the code after <head> tag
sed -i '/<head>/r /tmp/ga-code.txt' index.html

# Clean up
rm /tmp/ga-code.txt

echo "✅ Google Analytics G-SH29FGTV34 successfully added!"
echo "📊 Analytics will start tracking visitors immediately"
echo "🔗 View at: https://analytics.google.com"
