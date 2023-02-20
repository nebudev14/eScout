import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({});

export type AppRouter = typeof appRouter;

