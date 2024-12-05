import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Define environment variable schema
const envSchema = z.object({
  BASE_URL: z.string().url(),
  ADMIN_USERNAME: z.string().min(1),
  ADMIN_PASSWORD: z.string().min(1),
  USER_USERNAME: z.string().min(1),
  USER_PASSWORD: z.string().min(1),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
});

// Validate environment variables
try {
  envSchema.parse(process.env);
} catch (error) {
  console.error('❌ Invalid environment variables:', error);
  process.exit(1);
}

// Export typed environment variables
export const env = envSchema.parse(process.env);
