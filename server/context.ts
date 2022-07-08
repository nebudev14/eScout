import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";
import { prisma } from "./prisma";

export const createContext = async ({ req }: CreateNextContextOptions) => {
    const session = await getSession({ req });
    return { prisma, session };
};

export type Context = inferAsyncReturnType<typeof createContext>; 