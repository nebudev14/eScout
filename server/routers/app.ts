import { createRouter }from "../create-router";
import { userRouter } from "./user-router";

export const appRouter = createRouter()
    .merge("user.", userRouter);

export type AppRouter = typeof appRouter;