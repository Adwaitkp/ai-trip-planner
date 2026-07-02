export function downloadPdf(element, filename = 'Itinerary') {
  const printWindow = window.open('', '_blank');

  if (!printWindow) {
    alert('Please allow pop-ups for this website to download the PDF.');
    return false;
  }

  // 1. Extract all currently loaded CSS from your app
  let cssStyles = '';
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        cssStyles += rule.cssText + '\n';
      }
    } catch (e) {
      // Ignore cross-origin stylesheet errors (like fonts)
    }
  }

  // 2. Write clean HTML to the new window
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>${filename}</title>
      <style>
        ${cssStyles}
        
        /* Clean up for PDF */
        body { 
          background: white !important; 
          padding: 40px; 
          color: black !important;
        }
        
        /* Remove glassmorphism/blurs that break in print */
        * {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          box-shadow: none !important;
          -webkit-box-shadow: none !important;
        }
        
        /* Force clean white backgrounds */
        .surface-card, .soft-card, .bg-slate-50, [class*="bg-slate"] {
          background-color: white !important;
          border: 1px solid #e2e8f0 !important;
        }
        
        /* Ensure text is visible */
        .text-slate-800, .text-slate-900, .text-slate-600, .text-slate-500 {
          color: #1e293b !important;
        }

        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      </style>
    </head>
    <body>
      ${element.innerHTML}
    </body>
    </html>
  `);

  printWindow.document.close();

  // 3. Wait a tiny bit for rendering, then open Print dialog
  setTimeout(() => {
    printWindow.print();
  }, 250);

  return true;
}