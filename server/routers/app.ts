import { createRouter }from "../create-router";
import { userRouter } from "./user-router";
import { teamRouter } from "./team-router";
import { entryRouter } from "./entry-route";
import { compRouter } from "./comp-router";

export const appRouter = createRouter()
    .merge("user.", userRouter)
    .merge("team.", teamRouter)
    .merge("entry.", entryRouter)
    .merge("comp.", compRouter);

export type AppRouter = typeof appRouter;