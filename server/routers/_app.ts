import { initTRPC } from "@trpc/server";
import { router, authProcedure } from "../trpc";
import { userRouter } from "./user-router";

export const appRouter = router({
  
});

export type AppRouter = typeof appRouter;

