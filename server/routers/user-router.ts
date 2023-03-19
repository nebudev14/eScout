import { router } from "../trpc"
import { authProcedure } from "../middleware/auth";
import { getFormInclude, getUserInclude } from "../repositories/user-repo";

export const userRouter = router({
  getUser: authProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: getUserInclude()
    })
  }),

  getForms: authProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: getFormInclude()
    })
  }),

})

