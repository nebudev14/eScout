import { initTRPC } from "@trpc/server";
import { router, authProcedure } from "../trpc";

export const appRouter = router({
  
});

export type AppRouter = typeof appRouter;

