#!/usr/bin/env python3
"""
This script downloads index.html from GitHub, adds the Products section, and uploads it back.
Run this to automatically apply all changes.
"""

import requests
import base64
import json

# GitHub configuration
REPO = "zaffarsecure-lab/ak-brands-website"
BRANCH = "add-products-section"
FILE_PATH = "index.html"
GITHUB_TOKEN = "YOUR_GITHUB_TOKEN_HERE"  # Replace with your token

# GitHub API URLs
API_BASE = f"https://api.github.com/repos/{REPO}"
FILE_URL = f"{API_BASE}/contents/{FILE_PATH}?ref={BRANCH}"

print("🚀 Fetching index.html from GitHub...")

# Get current file
headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

response = requests.get(FILE_URL, headers=headers)
if response.status_code != 200:
    print(f"❌ Error fetching file: {response.status_code}")
    print(response.text)
    exit(1)

file_data = response.json()
current_content = base64.b64decode(file_data['content']).decode('utf-8')
current_sha = file_data['sha']

print("✅ File fetched successfully")
print(f"📊 Current file size: {len(current_content)} characters")

# STEP 1: Add Products to menu
print("\n📋 STEP 1: Adding 'Products' to menu...")

menu_old = '''                <div class="dropdown-content" id="menuDropdown">
                    <a href="#home">Home</a>
                    <a href="#features">Services</a>'''

menu_new = '''                <div class="dropdown-content" id="menuDropdown">
                    <a href="#home">Home</a>
                    <a href="#products">Products</a>
                    <a href="#features">Services</a>'''

if menu_old in current_content:
    current_content = current_content.replace(menu_old, menu_new)
    print("   ✅ Menu updated")
else:
    print("   ⚠️  Menu pattern not found")

# STEP 2: Add Products CSS
print("\n🎨 STEP 2: Adding Products section CSS...")

products_css = '''
        /* Products Section */
        .products {
            padding: 4rem 2rem;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .products-intro {
            max-width: 900px;
            margin: 0 auto 3rem auto;
            text-align: center;
            font-size: 1.1rem;
            line-height: 1.8;
            color: #555;
        }

        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .product-category {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .product-category:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .product-category h3 {
            color: #667eea;
            margin-bottom: 1rem;
            font-size: 1.4rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .product-category ul {
            list-style: none;
            padding: 0;
        }

        .product-category li {
            padding: 0.5rem 0;
            color: #666;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .product-category li:last-child {
            border-bottom: none;
        }

        .product-category li:before {
            content: "✓";
            color: #1abc9c;
            font-weight: bold;
        }

        .products-footer {
            max-width: 900px;
            margin: 3rem auto 0 auto;
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .products-footer h3 {
            color: #667eea;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }

        .products-footer p {
            color: #666;
            font-size: 1.1rem;
            line-height: 1.8;
        }

'''

# Insert CSS before </style>
css_marker = "    </style>"
if css_marker in current_content:
    current_content = current_content.replace(css_marker, products_css + css_marker)
    print("   ✅ CSS added")
else:
    print("   ⚠️  </style> tag not found")

# STEP 3: Add Products HTML section
print("\n📝 STEP 3: Adding Products section HTML...")

products_html = '''
    <section id="products" class="products">
        <div class="container">
            <h2 class="section-title">Our Products</h2>
            <div class="products-intro">
                <p>AK Brands Marketing offers a wide range of B2B liquidation, surplus, and wholesale products in India, sourced from trusted manufacturers, distributors, and sellers across the country. Our product portfolio is designed to meet the needs of retailers, resellers, wholesalers, and online sellers.</p>
            </div>
            
            <div class="products-grid">
                <div class="product-category">
                    <h3>👔 Garments & Apparels</h3>
                    <ul>
                        <li>Men's, women's & kids clothing</li>
                        <li>Western & ethnic wear</li>
                        <li>Undergarments & innerwear</li>
                        <li>Fashion surplus & clearance stock</li>
                    </ul>
                </div>

                <div class="product-category">
                    <h3>👟 Footwear</h3>
                    <ul>
                        <li>Casual, formal & sports footwear</li>
                        <li>Men's, women's & kids shoes</li>
                        <li>Bulk & liquidation footwear lots</li>
                    </ul>
                </div>

                <div class="product-category">
                    <h3>🏠 Home Appliances & Large Appliances</h3>
                    <ul>
                        <li>Small home appliances</li>
                        <li>Large appliances (ACs, refrigerators, washing machines, etc.)</li>
                        <li>Clearance & surplus appliance stock</li>
                    </ul>
                </div>

                <div class="product-category">
                    <h3>📱 Electronics & Mobile Accessories</h3>
                    <ul>
                        <li>Consumer electronics</li>
                        <li>Mobile phones & accessories</li>
                        <li>Chargers, earphones, power banks & gadgets</li>
                    </ul>
                </div>

                <div class="product-category">
                    <h3>🛒 FMCG & Groceries</h3>
                    <ul>
                        <li>Fast-moving consumer goods</li>
                        <li>Packaged food & grocery items</li>
                        <li>Daily essentials & household supplies</li>
                    </ul>
                </div>

                <div class="product-category">
                    <h3>🍽️ Crockery & Kitchenware</h3>
                    <ul>
                        <li>Crockery sets</li>
                        <li>Kitchen utilities & utensils</li>
                        <li>Home-use & commercial kitchen products</li>
                    </ul>
                </div>

                <div class="product-category">
                    <h3>🪑 Furniture</h3>
                    <ul>
                        <li>Home & office furniture</li>
                        <li>Plastic, metal & wooden furniture</li>
                        <li>Clearance & bulk furniture stock</li>
                    </ul>
                </div>

                <div class="product-category">
                    <h3>🧳 Luggage & Travel Products</h3>
                    <ul>
                        <li>Suitcases, trolley bags & backpacks</li>
                        <li>Travel accessories & storage solutions</li>
                    </ul>
                </div>

                <div class="product-category">
                    <h3>🧸 Toys & Baby Care Products</h3>
                    <ul>
                        <li>Kids toys & games</li>
                        <li>Baby care items & essentials</li>
                        <li>Educational & recreational products</li>
                    </ul>
                </div>

                <div class="product-category">
                    <h3>⌚ Watches & Fashion Accessories</h3>
                    <ul>
                        <li>Branded & non-branded watches</li>
                        <li>Belts, wallets, sunglasses & accessories</li>
                    </ul>
                </div>

                <div class="product-category">
                    <h3>🏋️ Sports, Fitness & Gym Equipment</h3>
                    <ul>
                        <li>Gym & fitness equipment</li>
                        <li>Sports goods & accessories</li>
                        <li>Home workout & training products</li>
                    </ul>
                </div>

                <div class="product-category">
                    <h3>🚴 Cycles & Outdoor Products</h3>
                    <ul>
                        <li>Bicycles & cycling accessories</li>
                        <li>Outdoor & recreational items</li>
                    </ul>
                </div>

                <div class="product-category">
                    <h3>💄 Beauty, Cosmetics & Personal Care</h3>
                    <ul>
                        <li>Beauty & cosmetic products</li>
                        <li>Bath & personal care items</li>
                        <li>Grooming & hygiene products</li>
                    </ul>
                </div>

                <div class="product-category">
                    <h3>🎨 Home Décor & Fancy Items</h3>
                    <ul>
                        <li>Decorative home accessories</li>
                        <li>Gift items & fancy products</li>
                        <li>Seasonal & trending décor</li>
                    </ul>
                </div>

                <div class="product-category">
                    <h3>🔧 Hardware & Electrical Items</h3>
                    <ul>
                        <li>Electrical fittings & accessories</li>
                        <li>Hardware tools & supplies</li>
                        <li>Construction & utility items</li>
                    </ul>
                </div>
            </div>

            <div class="products-footer">
                <h3>Product Sourcing & Supply</h3>
                <p>All products are available through verified liquidation stock, surplus inventory, and wholesale sourcing, with quality checks, transparent pricing, and PAN-India delivery support.</p>
            </div>
        </div>
    </section>

'''

# Insert before features section
features_marker = '    <section id="features" class="features">'
if features_marker in current_content:
    current_content = current_content.replace(features_marker, products_html + features_marker)
    print("   ✅ Products HTML added")
else:
    print("   ⚠️  Features section not found")

# Upload updated file
print("\n📤 Uploading updated file to GitHub...")

new_content_encoded = base64.b64encode(current_content.encode('utf-8')).decode('utf-8')

update_data = {
    "message": "Add Products section with 15 product categories",
    "content": new_content_encoded,
    "sha": current_sha,
    "branch": BRANCH
}

upload_response = requests.put(FILE_URL, headers=headers, data=json.dumps(update_data))

if upload_response.status_code in [200, 201]:
    print("✅ File updated successfully!")
    print(f"📊 New file size: {len(current_content)} characters")
    print(f"🔗 Commit: {upload_response.json()['commit']['html_url']}")
else:
    print(f"❌ Error uploading file: {upload_response.status_code}")
    print(upload_response.text)
    exit(1)

print("\n" + "="*60)
print("✅ PRODUCTS SECTION ADDED SUCCESSFULLY!")
print("="*60)
print("\n📋 Changes Made:")
print("   ✓ Added 'Products' menu item")
print("   ✓ Added Products section CSS")
print("   ✓ Added Products section with 15 categories")
print("\n🎯 Next Steps:")
print("   1. Create Pull Request:")
print(f"      https://github.com/{REPO}/compare/main...{BRANCH}")
print("   2. Merge to main")
print("   3. Your Products section is live!")
