import { initTRPC } from "@trpc/server";
import { router, procedure } from "../trpc";

const appRouter = router({});

export type AppRouter = typeof appRouter;

