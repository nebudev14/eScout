import * as trpcNext from "@trpc/server/adapters/next";
import { AppRouter } from "../../../server/routers/_app";

export default trpcNext.createNextApiHandler({
  router: AppRouter,
  createContext: () => ({}),
}); 