import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma/client';
import { inquiryLimiter } from '../middleware/rateLimiter.middleware';
import { sendVayoraNotification, sendCustomerConfirmation } from '../services/email.service';
import { authenticateJwt, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Indian Phone regex or international standard phone
const phoneRegex = /^(\+91[\-\s]?)?[0-9]{10}$/;

const consultationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().refine((val) => phoneRegex.test(val.replace(/\s+/g, '')), {
    message: 'Please enter a valid 10-digit Indian phone number (e.g. 7394987500)',
  }),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  query: z.string().min(5, 'Requirement details must be at least 5 characters'),
  preferredContactMethod: z.string().default('PHONE'),
  preferredDate: z.string().min(1, 'Please select a preferred consultation date'),
  preferredTime: z.string().min(1, 'Please select a preferred time slot'),
});

// POST /api/consultation (Public Booking)
router.post('/', inquiryLimiter, async (req: Request, res: Response) => {
  try {
    const parseResult = consultationSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: parseResult.error.errors[0]?.message || 'Validation error',
      });
    }

    const data = parseResult.data;
    const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';

    let consultation: any = null;

    // If DATABASE_URL is configured, persist the consultation, otherwise continue without DB persistence
    if (process.env.DATABASE_URL) {
      try {
        consultation = await prisma.consultation.create({
          data: {
            name: data.name,
            phone: data.phone,
            email: data.email || null,
            query: data.query,
            preferredContactMethod: data.preferredContactMethod || 'PHONE',
            preferredDate: data.preferredDate,
            preferredTime: data.preferredTime,
            ip,
            status: 'PENDING',
          },
        });
      } catch (dbErr) {
        console.error('Consultation DB save error:', dbErr);
        // Do not fail the entire request if DB is unavailable; preserve lead by continuing
        consultation = {
          id: `temp-${Date.now()}`,
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          query: data.query,
          preferredContactMethod: data.preferredContactMethod || 'PHONE',
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          ip,
          status: 'PENDING',
          createdAt: new Date().toISOString(),
        };
      }
    } else {
      // DB not configured — create a temporary consultation object so emails still include fields and timestamps
      consultation = {
        id: `temp-${Date.now()}`,
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        query: data.query,
        preferredContactMethod: data.preferredContactMethod || 'PHONE',
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        ip,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      };
    }

    // Send notification email to Vayora and optional confirmation to customer
    try {
      // Primary: notify Vayora
      await sendVayoraNotification(consultation);
    } catch (emailErr) {
      console.error('[Email Dispatch Service] Failed to send notification to Vayora:', emailErr);
      // Important: do not lose the lead — return server error so frontend knows submission failed
      return res.status(500).json({ success: false, error: 'Failed to send notification email. Please try again later.' });
    }

    // Attempt customer confirmation if email provided
    let customerEmailWarning = null;
    if (consultation.email) {
      try {
        await sendCustomerConfirmation(consultation);
      } catch (custErr) {
        console.error('[Email Dispatch Service] Failed to send confirmation to customer:', custErr);
        customerEmailWarning = 'Failed to send confirmation email to customer.';
      }
    }

    // Success (Vayora received the notification)
    const responsePayload: any = {
      success: true,
      message: 'Your consultation has been booked successfully! Our interior specialist will contact you on your preferred date.',
      // include the consultation record and the message together so frontend can access message via fetchApi
      data: { consultation, message: 'Your consultation has been booked successfully! Our interior specialist will contact you on your preferred date.' },
    };
    if (customerEmailWarning) responsePayload.warning = customerEmailWarning;

    return res.status(201).json(responsePayload);
  } catch (error) {
    console.error('Consultation booking error:', error);
    return res.status(500).json({ success: false, error: 'Failed to process consultation request.' });
  }
});

// GET /api/consultation (Admin only)
router.get('/', authenticateJwt, requireAdmin, async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string;
    const search = req.query.search as string;

    const where: any = {};
    if (status && ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].includes(status)) {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { query: { contains: search, mode: 'insensitive' } },
      ];
    }

    const consultations = await prisma.consultation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ success: true, data: consultations });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch consultations.' });
  }
});

// PATCH /api/consultation/:id/status (Admin only)
router.patch('/:id/status', authenticateJwt, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status value.' });
    }

    const updated = await prisma.consultation.update({
      where: { id },
      data: { status },
    });

    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to update consultation status.' });
  }
});

// DELETE /api/consultation/:id (Admin only)
router.delete('/:id', authenticateJwt, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.consultation.delete({ where: { id } });
    return res.json({ success: true, message: 'Consultation record deleted.' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to delete consultation.' });
  }
});

export default router;
