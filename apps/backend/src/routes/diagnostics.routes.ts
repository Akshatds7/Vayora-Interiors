import { Router, Request, Response } from 'express';
import transporter, { verifyTransporter } from '../services/email.service';
import { config } from '../config';

const router = Router();

// GET /api/diagnostics/email
router.get('/email', async (req: Request, res: Response) => {
  try {
    const smtpHostConfigured = !!process.env.SMTP_HOST;
    const smtpPortConfigured = !!process.env.SMTP_PORT;
    const smtpUserConfigured = !!process.env.SMTP_USER;
    const smtpPassConfigured = !!process.env.SMTP_PASS;

    const diagnostics: any = {
      smtpHostConfigured,
      smtpPortConfigured,
      smtpUserConfigured,
      smtpPassConfigured,
      vayoraEmail: process.env.VAYORA_EMAIL ? true : false,
    };

    // Try transporter.verify() but do not reveal secrets
    try {
      if (smtpUserConfigured && smtpPassConfigured) {
        await verifyTransporter();
        diagnostics.transportVerified = true;
      } else {
        diagnostics.transportVerified = false;
        diagnostics.transportError = 'SMTP credentials missing';
      }
    } catch (err: any) {
      diagnostics.transportVerified = false;
      diagnostics.transportError = err.message || String(err);
    }

    return res.json({ success: true, data: diagnostics });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Diagnostics error' });
  }
});

export default router;
