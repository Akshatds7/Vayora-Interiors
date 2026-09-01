import { Router, Request, Response } from 'express';
import { prisma } from '../prisma/client';
import { authenticateJwt, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// GET /api/categories
router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    const formatted = categories.map((c) => ({
      ...c,
      productCount: c._count.products,
    }));

    return res.json({ success: true, data: formatted });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch categories.' });
  }
});

// POST /api/categories (Admin only)
router.post('/', authenticateJwt, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, slug, description, image } = req.body;
    const category = await prisma.category.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description,
        image,
      },
    });
    return res.status(201).json({ success: true, data: category });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to create category.' });
  }
});

export default router;
