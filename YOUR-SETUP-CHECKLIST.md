# 🎯 YOUR SETUP CHECKLIST - Abdul Zaffar
## AK Brands Analytics & Lead Capture Setup

**Total Time Required:** 30-40 minutes  
**Your Email:** zaffarsecure@gmail.com  
**Your Phone:** +91 8660502217

---

## ✅ WHAT I'VE ALREADY DONE FOR YOU:

✅ Created all the code files  
✅ Set up lead capture form  
✅ Configured WhatsApp notifications to +91 8660502217  
✅ Added cookie consent banner  
✅ Set up event tracking  
✅ Created integration snippets  

---

## 📋 WHAT YOU NEED TO DO (3 Simple Steps):

### **STEP 1: Google Analytics Setup** ⏱️ 15 minutes

**What you'll get:** Track all website visitors, see where they come from, what pages they visit

**Instructions:**

1. **Open Google Analytics**
   - Go to: https://analytics.google.com
   - Sign in with your Google account (zaffarsecure@gmail.com or any Gmail)

2. **Create Account**
   - Click "Start measuring" (blue button)
   - Account name: Type `AK Brands Marketing`
   - Click "Next"

3. **Create Property**
   - Property name: Type `AK Brands Website`
   - Time zone: Select `India`
   - Currency: Select `Indian Rupee (₹)`
   - Click "Next"

4. **Business Details**
   - Industry: Select `Retail/Ecommerce`
   - Business size: Select `Small - 1 to 10 employees`
   - Click "Next"

5. **Business Objectives**
   - Select: `Generate leads`
   - Click "Create"
   - Accept Terms of Service

6. **Get Your Measurement ID**
   - You'll see a screen with "Web" option
   - Click "Web"
   - Website URL: Type `https://zaffarsecure-lab.github.io/ak-brands-website/`
   - Stream name: Type `AK Brands Website`
   - Click "Create stream"
   
7. **COPY THIS ID** 📋
   - You'll see: **Measurement ID: G-XXXXXXXXXX**
   - **COPY THIS ENTIRE ID** (it starts with G-)
   - Example: `G-ABC123DEF4`
   
   **Send me this ID and I'll update the code!**

---

### **STEP 2: Microsoft Clarity Setup** ⏱️ 10 minutes

**What you'll get:** See heatmaps of where users click, watch recordings of user sessions

**Instructions:**

1. **Open Microsoft Clarity**
   - Go to: https://clarity.microsoft.com
   - Click "Sign in"
   - Use your Microsoft account (or create one - it's free)

2. **Create New Project**
   - Click "Add new project" (big blue button)
   
3. **Project Details**
   - Name: Type `AK Brands Website`
   - Website URL: Type `https://zaffarsecure-lab.github.io/ak-brands-website/`
   - Site category: Select `Ecommerce`
   - Click "Add new project"

4. **Get Your Project ID**
   - After creating, you'll see "Setup" page
   - Look for the installation code
   - Find this line: `clarity("script", "XXXXXXXXXX");`
   - The XXXXXXXXXX is your Project ID (10 characters)
   
5. **COPY THIS ID** 📋
   - Example: `abc123def4`
   
   **Send me this ID and I'll update the code!**

---

### **STEP 3: Google Sheets Setup** ⏱️ 15 minutes

**What you'll get:** All leads automatically saved to a Google Sheet, email notifications for new leads

**Instructions:**

1. **Create Google Sheet**
   - Go to: https://sheets.google.com
   - Click "+ Blank" to create new sheet
   - Name it: `AK Brands Leads`

2. **Open Apps Script**
   - In the Google Sheet, click: **Extensions** → **Apps Script**
   - You'll see a code editor

3. **Delete Existing Code**
   - Select all the code you see (Ctrl+A)
   - Delete it

4. **Paste New Code**
   - Copy this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'Company',
        'Interest',
        'Message',
        'Source',
        'User Agent',
        'Referrer',
        'Screen Resolution',
        'Language'
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setBackground('#667eea');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
    }
    
    // Add lead data
    sheet.appendRow([
      new Date(data.timestamp).toLocaleString('en-IN'),
      data.name,
      data.email,
      data.phone,
      data.company,
      data.interest,
      data.message,
      data.source,
      data.userAgent,
      data.referrer,
      data.screenResolution,
      data.language
    ]);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 12);
    
    // Send email notification
    MailApp.sendEmail({
      to: 'abdul@akbrandsmarketing.com',
      subject: '🎯 New Lead from AK Brands Website',
      body: `New lead received!\n\n` +
            `👤 Name: ${data.name}\n` +
            `📧 Email: ${data.email}\n` +
            `📞 Phone: ${data.phone}\n` +
            `🏢 Company: ${data.company}\n` +
            `💼 Interest: ${data.interest}\n` +
            `💬 Message: ${data.message}\n\n` +
            `🌐 Source: ${data.source}\n` +
            `🕐 Time: ${new Date(data.timestamp).toLocaleString('en-IN')}\n\n` +
            `View all leads: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Lead saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. **Save the Script**
   - Click the 💾 Save icon (or Ctrl+S)
   - Name it: `Lead Capture`

6. **Deploy as Web App**
   - Click "Deploy" → "New deployment"
   - Click the gear icon ⚙️ next to "Select type"
   - Select "Web app"
   
7. **Configure Deployment**
   - Description: Type `AK Brands Lead Capture`
   - Execute as: Select **Me (zaffarsecure@gmail.com)**
   - Who has access: Select **Anyone**
   - Click "Deploy"

8. **Authorize Access**
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to Lead Capture (unsafe)" → "Allow"
   - (Don't worry, this is your own script, it's safe!)

9. **COPY THE WEB APP URL** 📋
   - You'll see: "Web app URL: https://script.google.com/macros/s/ABC123.../exec"
   - **COPY THIS ENTIRE URL**
   
   **Send me this URL and I'll update the code!**

---

## 📨 SEND ME THESE 3 THINGS:

Once you complete the steps above, send me:

1. ✅ **Google Analytics Measurement ID**  
   Example: `G-ABC123DEF4`

2. ✅ **Microsoft Clarity Project ID**  
   Example: `abc123def4`

3. ✅ **Google Sheets Web App URL**  
   Example: `https://script.google.com/macros/s/ABC123.../exec`

**Just paste them in the chat and I'll update everything automatically!**

---

## 🎯 AFTER I UPDATE THE CODE:

You'll be able to:

### **View Analytics:**
- 📊 **Google Analytics:** https://analytics.google.com
  - See real-time visitors
  - Traffic sources (Google, Facebook, Direct)
  - Popular pages
  - Visitor locations
  - Device breakdown

- 🎥 **Microsoft Clarity:** https://clarity.microsoft.com
  - Watch session recordings
  - See click heatmaps
  - Analyze user behavior
  - Find problem areas

### **View Leads:**
- 📝 **Google Sheets:** Your sheet will auto-update with new leads
- 📧 **Email:** You'll get instant notifications at abdul@akbrandsmarketing.com
- 💬 **WhatsApp:** Leads will send to +91 8660502217

### **Download Leads:**
- Open browser console (F12)
- Type: `AKBrandsAnalytics.downloadLeads()`
- Get CSV file with all leads

---

## ❓ NEED HELP?

**Stuck on any step?** Just tell me:
- Which step you're on
- What you're seeing
- Any error messages

I'll guide you through it! 🚀

---

## ⏰ TIMELINE:

**Now:** Complete the 3 setup steps (30-40 minutes)  
**Send me the IDs:** I'll update the code (5 minutes)  
**Done:** Your analytics will be live!  

**Let's get started! Which step are you starting with?** 🎯