
import { createClient } from 'redis';
import { config } from '../config';

export const redisClient = createClient({
  url: config.redisUrl,
});

redisClient.on('error', () => {
  // Silent fallback
});

export const initRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      // Connect with a 1-second timeout so local dev never blocks if Redis service is omitted
      const connectPromise = redisClient.connect();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Redis connect timeout')), 1000)
      );
      await Promise.race([connectPromise, timeoutPromise]);
      console.log('Redis connected successfully');
    }
  } catch (err) {
    console.log('Redis connection bypassed - running in memory mode');
  }
};
