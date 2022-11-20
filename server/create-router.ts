import { router } from "@trpc/server";
import type { Context } from "./context";
import { Meta } from "./middleware/metaware";

export const createRouter = () => router<Context, Meta>();