import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();
// Create PrismaClient instance (PostgreSQL is natively supported)
const prisma = new PrismaClient();

// Export a singleton instance
export { prisma };
export default prisma;

