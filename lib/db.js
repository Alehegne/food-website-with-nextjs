// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// // Use globalThis to store the Prisma instance in development mode
// if (!globalThis.prismaGlobal) {
//   globalThis.prismaGlobal = prismaClientSingleton();
// }

// const prisma = globalThis.prismaGlobal;

// export default prisma;

import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to avoid creating multiple Prisma clients
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
