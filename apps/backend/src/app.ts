import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { apiLimiter } from './middleware/rateLimiter.middleware';
import { errorHandler } from './middleware/error.middleware';

import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';
import consultationRoutes from './routes/consultation.routes';
import subscriberRoutes from './routes/subscriber.routes';
import analyticsRoutes from './routes/analytics.routes';
import diagnosticsRoutes from './routes/diagnostics.routes';

const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
}));

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Global API rate limit
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Vayora Interiors API Engine',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/consultation', consultationRoutes);
app.use('/api/inquiries', consultationRoutes); // Alias for compatibility
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/diagnostics', diagnosticsRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
