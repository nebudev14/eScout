import { createRouter }from "../create-router";
import { userRouter } from "./user-router";
import { teamRouter } from "./team-router";
import { inviteRouter } from "./invite-router";

export const appRouter = createRouter()
    .merge("user.", userRouter)
    .merge("team.", teamRouter)
    .merge("invite.", inviteRouter);

export type AppRouter = typeof appRouter;