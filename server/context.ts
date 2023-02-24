import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";
import { prisma } from "./prisma";

export const createContext = async(options: CreateNextContextOptions) => {
  const session = await getSession({ req: options.req });

  return {
    prisma, session
  };
}

export type Context = inferAsyncReturnType<typeof createContext>; 