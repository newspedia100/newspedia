import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

// Cache the client in development to prevent multiple instances
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db