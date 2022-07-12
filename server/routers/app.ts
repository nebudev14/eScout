import { createRouter }from "../create-router";
import { userRouter } from "./user-router";
import { teamRouter } from "./team-router";
import { inviteRouter } from "./invite-router";
import { entryRouter } from "./entry-route";

export const appRouter = createRouter()
    .merge("user.", userRouter)
    .merge("team.", teamRouter)
    .merge("invite.", inviteRouter)
    .merge("entry.", entryRouter);

export type AppRouter = typeof appRouter;