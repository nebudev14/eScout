import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/app";
import { createContext } from "../../../server/context";

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext,
});