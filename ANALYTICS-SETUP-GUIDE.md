# 🎯 Analytics & Lead Capture Setup Guide
## AK Brands Marketing - Complete Visitor Tracking & Lead Generation System

---

## 📋 Table of Contents
1. [Overview](#overview)
2. [What You'll Track](#what-youll-track)
3. [Legal Compliance](#legal-compliance)
4. [Setup Instructions](#setup-instructions)
5. [Integration Steps](#integration-steps)
6. [Testing & Verification](#testing--verification)
7. [Viewing Your Data](#viewing-your-data)

---

## 🎯 Overview

This system provides **100% legal** visitor tracking and lead capture for your AK Brands website:

### ✅ What's Included:
- **Google Analytics 4** - Track anonymous visitor behavior
- **Microsoft Clarity** - Heatmaps and session recordings
- **Lead Capture Forms** - Collect contact information with consent
- **Google Sheets Integration** - Automatic lead storage
- **WhatsApp Notifications** - Instant lead alerts
- **Cookie Consent Banner** - GDPR/CCPA compliant

---

## 📊 What You'll Track

### Anonymous Data (No Consent Needed):
| Data Point | Example | Use Case |
|------------|---------|----------|
| 📍 Location | Mumbai, Maharashtra, India | Target marketing by region |
| 📱 Device | Desktop, Mobile, Tablet | Optimize for device types |
| 🌐 Browser | Chrome, Safari, Firefox | Fix compatibility issues |
| ⏱️ Time on Site | 2 minutes 34 seconds | Measure engagement |
| 📄 Pages Visited | Home → Products → Contact | Understand user journey |
| 🔗 Traffic Source | Google Search, Facebook, Direct | Optimize marketing channels |
| 🖱️ Click Patterns | Heatmap of clicks | Improve button placement |
| 📜 Scroll Depth | 75% of page | Optimize content length |

### Lead Data (With User Consent):
| Field | Required | Purpose |
|-------|----------|---------|
| 👤 Name | ✅ Yes | Personalization |
| 📧 Email | ✅ Yes | Follow-up communication |
| 📞 Phone | ✅ Yes | Direct contact |
| 🏢 Company | ❌ No | B2B context |
| 💼 Interest | ✅ Yes | Lead qualification |
| 💬 Message | ❌ No | Understanding needs |

---

## ⚖️ Legal Compliance

### ✅ This System is 100% Legal Because:

1. **Anonymous Analytics** - No personal data collected without consent
2. **Voluntary Lead Forms** - Users choose to provide information
3. **Cookie Consent** - Users can accept or decline tracking
4. **Transparent Privacy** - Clear disclosure of data usage
5. **Compliant with:**
   - 🇪🇺 GDPR (Europe)
   - 🇺🇸 CCPA (California)
   - 🇮🇳 DPDP Act 2023 (India)

### ❌ What We DON'T Do (Illegal):
- ❌ Secret tracking of personal information
- ❌ Collecting data without consent
- ❌ Sharing data with third parties without permission
- ❌ Tracking across websites without disclosure

---

## 🚀 Setup Instructions

### Step 1: Google Analytics 4 Setup (15 minutes)

1. **Create Google Analytics Account**
   - Go to https://analytics.google.com
   - Click "Start measuring"
   - Create Account name: "AK Brands Marketing"
   - Create Property name: "AK Brands Website"
   - Select Industry: "Retail/Ecommerce"
   - Select Business size: "Small"

2. **Get Your Measurement ID**
   - After creating property, you'll see a Measurement ID
   - Format: `G-XXXXXXXXXX`
   - Copy this ID

3. **Add to Website**
   - Open `analytics-setup.html`
   - Find line: `gtag('config', 'G-XXXXXXXXXX');`
   - Replace `G-XXXXXXXXXX` with your actual ID
   - Example: `gtag('config', 'G-ABC123DEF4');`

4. **Verify Installation**
   - Go to Analytics → Reports → Realtime
   - Open your website in another tab
   - You should see 1 active user

---

### Step 2: Microsoft Clarity Setup (10 minutes)

1. **Create Clarity Account**
   - Go to https://clarity.microsoft.com
   - Sign in with Microsoft account (create one if needed)
   - Click "Add new project"

2. **Setup Project**
   - Project name: "AK Brands Website"
   - Website URL: `https://zaffarsecure-lab.github.io/ak-brands-website/`
   - Click "Add project"

3. **Get Project ID**
   - After creating, you'll see installation code
   - Find the Project ID in the script
   - Format: 10-character code like `abc123def4`

4. **Add to Website**
   - Open `analytics-setup.html`
   - Find line: `})(window, document, "clarity", "script", "XXXXXXXXXX");`
   - Replace `XXXXXXXXXX` with your Project ID
   - Example: `})(window, document, "clarity", "script", "abc123def4");`

5. **Verify Installation**
   - Go to Clarity Dashboard
   - Open your website
   - Within 2 hours, you'll see recordings

---

### Step 3: Google Sheets Integration (20 minutes)

1. **Create Google Sheet**
   - Go to https://sheets.google.com
   - Create new sheet: "AK Brands Leads"
   - Keep it open

2. **Setup Apps Script**
   - In Google Sheet: Extensions → Apps Script
   - Delete any existing code
   - Copy the code from `lead-capture-integration.js` (the section marked "GOOGLE APPS SCRIPT CODE")
   - Paste it into the Apps Script editor
   - Click Save (💾 icon)

3. **Deploy as Web App**
   - Click Deploy → New deployment
   - Click gear icon ⚙️ → Select "Web app"
   - Settings:
     - Description: "AK Brands Lead Capture"
     - Execute as: **Me**
     - Who has access: **Anyone**
   - Click Deploy
   - Authorize the app (click "Authorize access")
   - Copy the Web App URL

4. **Add URL to Website**
   - Open `lead-capture-integration.js`
   - Find line: `const GOOGLE_SCRIPT_URL = 'YOUR_SCRIPT_URL_HERE';`
   - Replace with your Web App URL
   - Example: `const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ABC123.../exec';`

5. **Test Integration**
   - Submit a test lead through your form
   - Check Google Sheet - new row should appear
   - Check your email - you should receive notification

---

### Step 4: WhatsApp Notifications (5 minutes)

**Already configured!** Leads will automatically send to: **+91 8660502217**

To change the number:
1. Open `lead-capture-integration.js`
2. Find: `https://wa.me/918660502217`
3. Replace with your WhatsApp number (include country code, no + or spaces)
4. Example: `https://wa.me/919876543210`

---

## 🔧 Integration Steps

### Option A: Quick Integration (Recommended)

Add these 3 code blocks to your `index.html`:

**1. In `<head>` section (after opening `<head>` tag):**
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX'); // Replace with your GA4 ID
</script>

<!-- Microsoft Clarity -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "XXXXXXXXXX"); // Replace with your Clarity ID
</script>
```

**2. Before closing `</body>` tag:**
```html
<!-- Lead Capture Integration -->
<script src="lead-capture-integration.js"></script>

<!-- Cookie Consent Banner -->
<div class="cookie-banner" id="cookieBanner">
    <!-- Copy from analytics-setup.html -->
</div>
```

**3. In your Contact section:**
```html
<!-- Lead Capture Form -->
<div class="lead-form">
    <!-- Copy from analytics-setup.html -->
</div>
```

### Option B: Full Integration

See `analytics-setup.html` for complete code with styling.

---

## ✅ Testing & Verification

### Test Checklist:

- [ ] **Google Analytics**
  - Open website
  - Go to GA4 → Realtime
  - See 1 active user
  
- [ ] **Microsoft Clarity**
  - Open website
  - Wait 2 hours
  - Check Clarity dashboard for recordings
  
- [ ] **Lead Form**
  - Fill out form with test data
  - Submit
  - Check Google Sheet for new row
  - Check email for notification
  - Check WhatsApp for message
  
- [ ] **Cookie Banner**
  - Open website in incognito mode
  - See cookie banner appear
  - Click "Accept" - banner disappears
  - Refresh - banner doesn't appear again

---

## 📈 Viewing Your Data

### Google Analytics Dashboard

**Access:** https://analytics.google.com

**Key Reports:**
1. **Realtime** - See current visitors
2. **Acquisition** - Where visitors come from
3. **Engagement** - What pages they visit
4. **Demographics** - Location, device, browser
5. **Events** - Form submissions, clicks, scrolls

**Custom Reports:**
- Lead submissions: Events → lead_submission
- Scroll depth: Events → scroll
- Time on page: Events → time_on_page

### Microsoft Clarity Dashboard

**Access:** https://clarity.microsoft.com

**Features:**
1. **Heatmaps** - See where users click
2. **Recordings** - Watch user sessions
3. **Insights** - Rage clicks, dead clicks, quick backs
4. **Filters** - Filter by device, country, page

### Google Sheets Leads

**Access:** Your Google Sheet

**Columns:**
- Timestamp
- Name
- Email
- Phone
- Company
- Interest
- Message
- Source (which page)
- User Agent (browser/device)
- Referrer (how they found you)
- Screen Resolution
- Language

**Tips:**
- Sort by timestamp to see newest leads
- Filter by interest to segment leads
- Use conditional formatting to highlight high-value leads

---

## 📊 Sample Analytics Insights

### What You'll Learn:

**Traffic Sources:**
```
Google Search: 45%
Direct: 25%
Social Media: 20%
Referrals: 10%
```

**Top Pages:**
```
1. Home Page - 1,234 views
2. Products - 567 views
3. Contact - 234 views
```

**Visitor Locations:**
```
1. Mumbai - 30%
2. Delhi - 25%
3. Bangalore - 20%
4. Other - 25%
```

**Device Breakdown:**
```
Mobile: 60%
Desktop: 35%
Tablet: 5%
```

**Lead Conversion:**
```
Total Visitors: 1,000
Form Views: 100 (10%)
Form Submissions: 15 (15% of viewers, 1.5% of total)
```

---

## 🎯 Next Steps

1. ✅ Complete all setup steps above
2. ✅ Test each component
3. ✅ Monitor data for 1 week
4. ✅ Analyze patterns
5. ✅ Optimize based on insights

---

## 🆘 Troubleshooting

### Google Analytics not tracking?
- Check Measurement ID is correct
- Disable ad blockers
- Wait 24 hours for data to appear
- Check browser console for errors

### Clarity not recording?
- Wait 2 hours after installation
- Check Project ID is correct
- Ensure website is publicly accessible
- Try incognito mode

### Leads not saving to Google Sheet?
- Check Web App URL is correct
- Ensure Apps Script is deployed
- Check "Execute as: Me" and "Anyone" access
- Test with simple data first

### Cookie banner not showing?
- Clear localStorage
- Try incognito mode
- Check JavaScript console for errors

---

## 📞 Support

**Need Help?**
- Email: abdul@akbrandsmarketing.com
- Phone: +91 8660502217
- WhatsApp: +91 8660502217

---

## 🎉 Success!

Once setup is complete, you'll have:
- ✅ Real-time visitor tracking
- ✅ Heatmaps and session recordings
- ✅ Automatic lead capture
- ✅ Instant WhatsApp notifications
- ✅ Email alerts for new leads
- ✅ 100% legal and compliant system

**Your business growth starts now!** 🚀