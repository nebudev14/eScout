import { router } from "@trpc/server";
import type { Context } from "./context";

export const createRouter = () => router<Context>;