const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'vayora interiors brochure.pdf');

const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 260 >>
stream
BT
/F1 22 Tf
50 720 Td
(VAYORA INTERIORS - LUXURY CATALOGUE 2026) Tj
0 -40 Td
/F1 12 Tf
(Where Quality Meets Design) Tj
0 -30 Td
(Wall Panels, WPC Louvers, Flooring, Blinds, Curtains & Exterior Solutions) Tj
0 -40 Td
(Contact: Email: vayorainteriors@gmail.com | Website: www.vayorainteriors.com) Tj
0 -20 Td
( ) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000313 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
620
%%EOF`;

fs.writeFileSync(targetFile, pdfContent);
console.log('PDF Brochure created successfully.');
