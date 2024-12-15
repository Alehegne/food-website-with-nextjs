import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Use globalThis to store the Prisma instance in development mode
if (!globalThis.prismaGlobal) {
  globalThis.prismaGlobal = prismaClientSingleton();
}

const prisma = globalThis.prismaGlobal;

export default prisma;
