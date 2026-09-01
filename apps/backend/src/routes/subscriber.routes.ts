import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma/client';
import { authenticateJwt, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

const subscriberSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

// POST /api/subscribers
router.post('/', async (req: Request, res: Response) => {
  try {
    const parseResult = subscriberSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, error: parseResult.error.errors[0]?.message });
    }

    const { email } = parseResult.data;

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      return res.json({ success: true, message: 'You are already subscribed to the Vayora newsletter.' });
    }

    await prisma.newsletterSubscriber.create({ data: { email } });

    return res.status(201).json({
      success: true,
      message: 'Welcome to Vayora Interiors. Check your inbox for exclusive design updates.',
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Subscription failed.' });
  }
});

// GET /api/subscribers (Admin only)
router.get('/', authenticateJwt, requireAdmin, async (req: Request, res: Response) => {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ success: true, data: subscribers });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch subscribers.' });
  }
});

export default router;
