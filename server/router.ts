import { createRouter }from "./create-router";

export const appRouter = createRouter();

export type AppRouter = typeof appRouter;