#!/usr/bin/env python3
"""
Script to add Google Analytics tracking to index.html
Measurement ID: G-SH29FGTV34
"""

# Google Analytics code to inject
GA_CODE = """    <!-- Google Analytics 4 - Visitor Tracking -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-SH29FGTV34"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        // Default consent to denied (GDPR compliant)
        gtag('consent', 'default', {
            'analytics_storage': 'denied'
        });
        
        gtag('config', 'G-SH29FGTV34', {
            'anonymize_ip': true,
            'cookie_flags': 'SameSite=None;Secure'
        });
        
        // Track page view
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href,
            'page_path': window.location.pathname
        });
    </script>

"""

# Read the current index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the position right after <head>
head_pos = content.find('<head>') + len('<head>')

# Insert Google Analytics code
new_content = content[:head_pos] + '\n' + GA_CODE + content[head_pos:]

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Google Analytics G-SH29FGTV34 successfully added to index.html!")
print("📊 Analytics will start tracking visitors immediately after deployment")
print("🔗 View your analytics at: https://analytics.google.com")
