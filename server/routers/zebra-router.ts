import { createRouter } from "../create-router";
import { z } from "zod";

export const zebraRouter = createRouter()
  .query("get-match-data", {
    input: z.object({
      matchId: z.string(),
      teamNumber: z.string(),
      color: z.string()
    }),
    async resolve({ input, ctx }) {
      // await fetch ()
    }
  })