import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";
import { prisma } from "./prisma";
import type { Session } from "next-auth";

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  session: Session | null;
}

export async function createContextInner(opts?: CreateInnerContextOptions) {
  return {
    prisma,
    session: opts?.session,
  };
}

export const createContext = async (options: CreateNextContextOptions) => {
  const session = await getSession({ req: options.req });
  const contextInner = await createContextInner({ session });

  return {
    ...contextInner,
    prisma,
    session,
  };
};

export type Context = inferAsyncReturnType<typeof createContextInner>;
