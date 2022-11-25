import type { Context } from "../context";
import type { MiddlewareFunction } from "@trpc/server/dist/declarations/src/internals/middlewares";
import { TRPCError } from "@trpc/server";

export interface Meta {
  auth: boolean;
};
export const metaware: MiddlewareFunction<Context, Context, Meta> = ({
  ctx,
  next,
  meta,
}) => {
  if (!ctx.session && meta?.auth) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx,
  });
};

