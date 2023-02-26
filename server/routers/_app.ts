
import { router } from "../trpc";
import { compRouter } from "./comp-router";
import { matchRouter } from "./match-router";
import { pitRouter } from "./pit-router";
import { statRouter } from "./stat-router";
import { teamRouter } from "./team-router";
import { userRouter } from "./user-router";

export const appRouter = router({
  user: userRouter,
  team: teamRouter,
  match: matchRouter,
  comp: compRouter,
  pit: pitRouter,
  stat: statRouter
});

export type AppRouter = typeof appRouter;

