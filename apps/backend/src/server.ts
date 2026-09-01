import app from './app';
import { config } from './config';
import { initRedis } from './redis/client';
import { verifyTransporter } from './services/email.service';

const startServer = async () => {
  await initRedis();

  // Verify SMTP transporter if credentials provided
  try {
    await verifyTransporter();
  } catch (err) {
    console.error('[Startup] SMTP verification failed. Emails may not be delivered until SMTP is configured correctly.');
  }
  
  app.listen(Number(config.port), '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(` SKY HOME FURNISHING - API Engine Active`);
    console.log(` Environment : ${config.nodeEnv}`);
    console.log(` Running on  : http://127.0.0.1:${config.port}`);
    console.log(`=======================================================`);
  });
};

startServer();
