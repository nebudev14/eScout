import { router } from "../trpc"
import { authProcedure } from "../trpc";
import { getFormInclude, getUserInclude } from "../repositories/user-repo";

export const user = router({
  getUser: authProcedure.query(async ({ ctx }) => {
    return await prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: getUserInclude()
    })
  }),

  getForms: authProcedure.query(async ({ ctx }) => {
    return await prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: getFormInclude()
    })
  }),

})

