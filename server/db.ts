import { Prisma, PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient;
}

export const prisma = new PrismaClient({
    log: ["query"],
})