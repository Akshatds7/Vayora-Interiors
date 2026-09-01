import { Router, Response } from 'express';
import { prisma } from '../prisma/client';
import { authenticateJwt, requireAdmin, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// GET /api/analytics (Admin only)
router.get('/', authenticateJwt, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const totalConsultations = await prisma.consultation.count();
    const pendingConsultations = await prisma.consultation.count({ where: { status: 'PENDING' } });
    const totalProducts = await prisma.product.count();
    const totalSubscribers = await prisma.newsletterSubscriber.count();

    const recentConsultations = await prisma.consultation.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
    });

    return res.json({
      success: true,
      data: {
        totalConsultations,
        pendingConsultations,
        totalProducts,
        totalSubscribers,
        recentConsultations,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch analytics.' });
  }
});

export default router;
