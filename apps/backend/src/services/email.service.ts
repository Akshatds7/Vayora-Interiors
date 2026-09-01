import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = (process.env.SMTP_SECURE || 'true') === 'true';
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const VAYORA_EMAIL = process.env.VAYORA_EMAIL || 'vayorainteriors@gmail.com';

if (!SMTP_USER || !SMTP_PASS) {
  console.error('[Email Service] SMTP_USER or SMTP_PASS is not configured. Email will not work until configured.');
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
});

export async function verifyTransporter(): Promise<void> {
  try {
    if (!SMTP_USER || !SMTP_PASS) {
      throw new Error('SMTP credentials missing');
    }
    await transporter.verify();
    console.log('[Email Service] SMTP transporter verified successfully');
  } catch (err: any) {
    console.error('[Email Service] Failed to verify SMTP transporter:', err.message || err);
    throw err;
  }
}

function buildVayoraHtml(consultation: any) {
  const email = consultation.email ? consultation.email : 'Not provided';
  const createdAt = consultation.createdAt ? new Date(consultation.createdAt).toLocaleString() : new Date().toLocaleString();
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.4">
    <h2>New Consultation Request — ${consultation.name}</h2>
    <h3>Customer Information</h3>
    <p><strong>Full Name:</strong> ${consultation.name}</p>
    <p><strong>Phone Number:</strong> ${consultation.phone}</p>
    <p><strong>Email:</strong> ${email}</p>

    <h3>Consultation Preferences</h3>
    <p><strong>Preferred Contact Method:</strong> ${consultation.preferredContactMethod}</p>
    <p><strong>Preferred Time Slot:</strong> ${consultation.preferredTime}</p>
    <p><strong>Preferred Consultation Date:</strong> ${consultation.preferredDate}</p>

    <h3>Project Requirement</h3>
    <p>${consultation.query}</p>

    <h3>Submission Information</h3>
    <p><strong>Submitted At:</strong> ${createdAt}</p>
    <hr />
    <p>Regards,<br/>Vayora Interiors</p>
  </div>
  `;
}

function escapeHtml(value: any) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildCustomerHtml(consultation: any) {
  const name = escapeHtml(consultation.name || 'Customer');
  const preferredContactMethod = escapeHtml(consultation.preferredContactMethod || 'Not specified');
  const preferredTime = escapeHtml(consultation.preferredTime || 'Not specified');
  const preferredDate = escapeHtml(consultation.preferredDate || 'Not specified');
  const projectRequirement = escapeHtml(consultation.query || 'Not specified');

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.6;max-width:640px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;background:#fff">
    <p style="font-size:16px;color:#1f2937;">Dear ${name},</p>
    <p style="font-size:15px;color:#1f2937;">Thank you for contacting Vayora Interiors and submitting your consultation request.</p>
    <p style="font-size:15px;color:#1f2937;">We have successfully received your response and our team will review your requirements shortly.</p>

    <h3 style="margin:20px 0 12px;color:#111827;">Your Consultation Details:</h3>
    <ul style="margin:0 0 16px 20px;padding:0;color:#1f2937;">
      <li><strong>Preferred Contact Method:</strong> ${preferredContactMethod}</li>
      <li><strong>Preferred Time Slot:</strong> ${preferredTime}</li>
      <li><strong>Consultation Date:</strong> ${preferredDate}</li>
      <li><strong>Project Requirement:</strong> ${projectRequirement}</li>
    </ul>

    <p style="font-size:15px;color:#1f2937;">Our team will contact you according to your preferred consultation details.</p>
    <p style="font-size:15px;color:#1f2937;">We appreciate your interest in Vayora Interiors and look forward to assisting you with your project.</p>

    <p style="margin-top:24px;font-size:15px;color:#1f2937;">Regards,<br><strong>Vayora Interiors</strong><br>Your Space, Our Expertise</p>
  </div>
  `;
}

export async function sendVayoraNotification(consultation: any) {
  const mailOptions = {
    from: SMTP_USER || VAYORA_EMAIL,
    to: VAYORA_EMAIL,
    subject: `New Consultation Request — ${consultation.name}`,
    html: buildVayoraHtml(consultation),
  };

  return transporter.sendMail(mailOptions);
}

export async function sendCustomerConfirmation(consultation: any) {
  if (!consultation.email) {
    throw new Error('Customer email not provided');
  }
  const mailOptions = {
    from: SMTP_USER || VAYORA_EMAIL,
    to: consultation.email,
    subject: 'Thank You for Your Consultation Request – Vayora Interiors',
    html: buildCustomerHtml(consultation),
  };
  return transporter.sendMail(mailOptions);
}

export default transporter;
