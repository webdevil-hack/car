import { PrismaClient } from "../generated/prisma";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: [{ emit: "event", level: "error" }],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
