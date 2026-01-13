#!/bin/bash

# Products Section Auto-Installer for AK Brands Marketing
# This script makes all necessary changes to add the Products section

echo "🚀 AK Brands Marketing - Products Section Installer"
echo "===================================================="
echo ""

# Check if index.html exists
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found in current directory"
    echo "Please run this script from the repository root"
    exit 1
fi

echo "✅ Found index.html"
echo ""

# Create backup
cp index.html index.html.backup
echo "📦 Created backup: index.html.backup"
echo ""

# STEP 1: Add Products to Menu
echo "📋 STEP 1: Adding 'Products' to navigation menu..."

sed -i.tmp '/<a href="#home">Home<\/a>/a\
                    <a href="#products">Products</a>' index.html && rm index.html.tmp

if grep -q 'href="#products"' index.html; then
    echo "   ✅ Products menu item added"
else
    echo "   ⚠️  Warning: Could not add Products menu item"
fi

echo ""

# STEP 2: Add Products CSS
echo "🎨 STEP 2: Adding Products section CSS..."

# Find the line number of </style>
STYLE_LINE=$(grep -n '</style>' index.html | head -1 | cut -d: -f1)

if [ -n "$STYLE_LINE" ]; then
    # Insert CSS before </style>
    sed -i.tmp "${STYLE_LINE}i\\
\\
        /* Products Section */\\
        .products {\\
            padding: 4rem 2rem;\\
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);\\
        }\\
\\
        .products-intro {\\
            max-width: 900px;\\
            margin: 0 auto 3rem auto;\\
            text-align: center;\\
            font-size: 1.1rem;\\
            line-height: 1.8;\\
            color: #555;\\
        }\\
\\
        .products-grid {\\
            display: grid;\\
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\\
            gap: 2rem;\\
            max-width: 1200px;\\
            margin: 0 auto;\\
        }\\
\\
        .product-category {\\
            background: white;\\
            padding: 2rem;\\
            border-radius: 12px;\\
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);\\
            transition: transform 0.3s, box-shadow 0.3s;\\
        }\\
\\
        .product-category:hover {\\
            transform: translateY(-5px);\\
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);\\
        }\\
\\
        .product-category h3 {\\
            color: #667eea;\\
            margin-bottom: 1rem;\\
            font-size: 1.4rem;\\
            display: flex;\\
            align-items: center;\\
            gap: 0.5rem;\\
        }\\
\\
        .product-category ul {\\
            list-style: none;\\
            padding: 0;\\
        }\\
\\
        .product-category li {\\
            padding: 0.5rem 0;\\
            color: #666;\\
            border-bottom: 1px solid #f0f0f0;\\
            display: flex;\\
            align-items: center;\\
            gap: 0.5rem;\\
        }\\
\\
        .product-category li:last-child {\\
            border-bottom: none;\\
        }\\
\\
        .product-category li:before {\\
            content: \"✓\";\\
            color: #1abc9c;\\
            font-weight: bold;\\
        }\\
\\
        .products-footer {\\
            max-width: 900px;\\
            margin: 3rem auto 0 auto;\\
            text-align: center;\\
            padding: 2rem;\\
            background: white;\\
            border-radius: 12px;\\
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);\\
        }\\
\\
        .products-footer h3 {\\
            color: #667eea;\\
            margin-bottom: 1rem;\\
            font-size: 1.5rem;\\
        }\\
\\
        .products-footer p {\\
            color: #666;\\
            font-size: 1.1rem;\\
            line-height: 1.8;\\
        }
" index.html && rm index.html.tmp
    
    echo "   ✅ Products CSS added"
else
    echo "   ⚠️  Warning: Could not find </style> tag"
fi

echo ""

# STEP 3: Add Products HTML Section
echo "📝 STEP 3: Adding Products section HTML..."

# This is complex, so we'll create a separate file and insert it
cat > products_section.html << 'PRODUCTS_EOF'

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

PRODUCTS_EOF

# Find the features section and insert before it
FEATURES_LINE=$(grep -n '<section id="features"' index.html | head -1 | cut -d: -f1)

if [ -n "$FEATURES_LINE" ]; then
    # Insert the products section before features
    sed -i.tmp "${FEATURES_LINE}r products_section.html" index.html && rm index.html.tmp
    echo "   ✅ Products section HTML added"
else
    echo "   ⚠️  Warning: Could not find features section"
fi

# Clean up temp file
rm -f products_section.html

echo ""
echo "===================================================="
echo "✅ Installation Complete!"
echo "===================================================="
echo ""
echo "📋 Changes Made:"
echo "   ✓ Added 'Products' to navigation menu"
echo "   ✓ Added Products section CSS styling"
echo "   ✓ Added Products section with 15 categories"
echo ""
echo "📁 Files:"
echo "   • index.html - Updated with Products section"
echo "   • index.html.backup - Original backup"
echo ""
echo "🎯 Next Steps:"
echo "   1. Review the changes: diff index.html.backup index.html"
echo "   2. Test locally by opening index.html in browser"
echo "   3. Commit: git add index.html"
echo "   4. Commit: git commit -m 'Add Products section with 15 categories'"
echo "   5. Push: git push origin add-products-section"
echo "   6. Create Pull Request and merge to main"
echo ""
echo "🌐 Your Products section is ready!"
