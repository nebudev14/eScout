import { initTRPC } from "@trpc/server";
import { router, procedure } from "../trpc";
import { userRouter } from "./user-router";

export const appRouter = router({
  
});

export type AppRouter = typeof appRouter;

