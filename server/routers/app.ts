import { createRouter }from "../create-router";
import { userRouter } from "./user-router";
import { teamRouter } from "./team-router";

export const appRouter = createRouter()
    .merge("user.", userRouter)
    .merge("team.", teamRouter);

export type AppRouter = typeof appRouter;