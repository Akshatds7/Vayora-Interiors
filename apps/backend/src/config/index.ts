import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'sky_home_furnishing_super_secret_jwt_key_2026',
  jwtExpiresIn: '7d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/skyhome_db?schema=public',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  // Email / SMTP configuration (use Gmail App Password for SMTP_PASS)
  smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
  smtpPort: Number(process.env.SMTP_PORT || 465),
  smtpSecure: (process.env.SMTP_SECURE || 'true') === 'true',
  smtpUser: process.env.SMTP_USER,
  smtpPassConfigured: !!process.env.SMTP_PASS,
  vayoraEmail: process.env.VAYORA_EMAIL || 'vayorainteriors@gmail.com',
};
