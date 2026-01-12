/**
 * AK Brands Lead Capture Integration
 * Automatically saves leads to Google Sheets
 * 
 * Setup Instructions:
 * 1. Create a Google Sheet for leads
 * 2. Go to Extensions → Apps Script
 * 3. Paste the doPost function below
 * 4. Deploy as Web App
 * 5. Copy the Web App URL and replace SCRIPT_URL below
 */

// Replace with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'YOUR_SCRIPT_URL_HERE';

// Lead Form Submission Handler
async function submitLead(formData) {
    try {
        // Add metadata
        const leadData = {
            ...formData,
            timestamp: new Date().toISOString(),
            source: window.location.href,
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'Direct',
            screenResolution: `${screen.width}x${screen.height}`,
            language: navigator.language
        };
        
        // Send to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadData)
        });
        
        // Track in Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'lead_submission', {
                'event_category': 'Lead',
                'event_label': leadData.interest,
                'value': 1
            });
        }
        
        // Save to localStorage as backup
        const leads = JSON.parse(localStorage.getItem('leads') || '[]');
        leads.push(leadData);
        localStorage.setItem('leads', JSON.stringify(leads));
        
        // Send notification to WhatsApp
        sendWhatsAppNotification(leadData);
        
        return { success: true, data: leadData };
        
    } catch (error) {
        console.error('Lead submission error:', error);
        
        // Save to localStorage as fallback
        const leads = JSON.parse(localStorage.getItem('leads') || '[]');
        leads.push(formData);
        localStorage.setItem('leads', JSON.stringify(leads));
        
        return { success: false, error: error.message };
    }
}

// Send WhatsApp notification
function sendWhatsAppNotification(leadData) {
    const message = `🎯 *New Lead from AK Brands Website!*\n\n` +
        `👤 *Name:* ${leadData.name}\n` +
        `📧 *Email:* ${leadData.email}\n` +
        `📞 *Phone:* ${leadData.phone}\n` +
        `🏢 *Company:* ${leadData.company || 'Not provided'}\n` +
        `💼 *Interest:* ${leadData.interest}\n` +
        `💬 *Message:* ${leadData.message || 'No message'}\n\n` +
        `🌐 *Source:* ${leadData.source}\n` +
        `🕐 *Time:* ${new Date(leadData.timestamp).toLocaleString('en-IN')}`;
    
    const whatsappUrl = `https://wa.me/918660502217?text=${encodeURIComponent(message)}`;
    
    // Optional: Auto-send to WhatsApp
    // window.open(whatsappUrl, '_blank');
    
    return whatsappUrl;
}

// Download leads as CSV
function downloadLeadsCSV() {
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    
    if (leads.length === 0) {
        alert('No leads to download');
        return;
    }
    
    // Create CSV content
    const headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Interest', 'Message', 'Source'];
    const csvContent = [
        headers.join(','),
        ...leads.map(lead => [
            lead.timestamp,
            lead.name,
            lead.email,
            lead.phone,
            lead.company || '',
            lead.interest,
            `"${(lead.message || '').replace(/"/g, '""')}"`,
            lead.source
        ].join(','))
    ].join('\n');
    
    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ak-brands-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// View all leads
function viewLeads() {
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    console.table(leads);
    return leads;
}

// Clear all leads (use with caution)
function clearLeads() {
    if (confirm('Are you sure you want to clear all leads? This cannot be undone.')) {
        localStorage.removeItem('leads');
        alert('All leads cleared');
    }
}

// Export functions
window.AKBrandsLeads = {
    submit: submitLead,
    download: downloadLeadsCSV,
    view: viewLeads,
    clear: clearLeads
};

/* 
 * GOOGLE APPS SCRIPT CODE
 * Copy this to your Google Sheet's Apps Script editor
 * 
 * Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Delete any existing code
 * 4. Paste the code below
 * 5. Click Deploy → New deployment
 * 6. Select "Web app"
 * 7. Execute as: Me
 * 8. Who has access: Anyone
 * 9. Click Deploy
 * 10. Copy the Web App URL
 * 11. Replace GOOGLE_SCRIPT_URL above with this URL
 */

/*
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
    }
    
    // Add lead data
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.company || '',
      data.interest,
      data.message || '',
      data.source,
      data.userAgent,
      data.referrer,
      data.screenResolution,
      data.language
    ]);
    
    // Send email notification (optional)
    MailApp.sendEmail({
      to: 'abdul@akbrandsmarketing.com',
      subject: '🎯 New Lead from AK Brands Website',
      body: `New lead received:\n\n` +
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Phone: ${data.phone}\n` +
            `Company: ${data.company || 'Not provided'}\n` +
            `Interest: ${data.interest}\n` +
            `Message: ${data.message || 'No message'}\n\n` +
            `Source: ${data.source}\n` +
            `Time: ${data.timestamp}`
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
*/