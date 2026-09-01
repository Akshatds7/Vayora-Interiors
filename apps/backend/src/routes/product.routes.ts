import { Router, Request, Response } from 'express';
import { prisma } from '../prisma/client';
import { authenticateJwt, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// GET /api/products
router.get('/', async (req: Request, res: Response) => {
  try {
    const categoryId = req.query.category as string;
    const featured = req.query.featured === 'true';
    const search = req.query.search as string;

    const where: any = {};

    if (categoryId && categoryId !== 'all') {
      where.OR = [
        { categoryId: categoryId },
        { category: { slug: categoryId } },
      ];
    }

    if (featured) {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch products.' });
  }
});

// GET /api/products/:slugOrId
router.get('/:slugOrId', async (req: Request, res: Response) => {
  try {
    const { slugOrId } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id: slugOrId }, { slug: slugOrId }],
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }

    return res.json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch product details.' });
  }
});

// POST /api/products (Admin only)
router.post('/', authenticateJwt, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { title, slug, description, sku, categoryId, image, featured } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description,
        sku: sku || `VAY-${Math.floor(1000 + Math.random() * 9000)}`,
        categoryId,
        image,
        featured: Boolean(featured),
      },
      include: { category: true },
    });

    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to create product.' });
  }
});

// DELETE /api/products/:id (Admin only)
router.delete('/:id', authenticateJwt, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    return res.json({ success: true, message: 'Product deleted.' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to delete product.' });
  }
});

export default router;
