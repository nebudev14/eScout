import { Prisma } from "@prisma/client";


export const getUserInclude = () =>
  Prisma.validator<Prisma.UserInclude>()({
    teams: {
      include: {
        team: {
          include: {
            entries: true,
            members: true,
            comps: true,
            pitScouts: true,
            matchScouts: true,
          }
        }
      }
    }
  })

export const getFormInclude = () =>
  Prisma.validator<Prisma.UserInclude>()({
    teams: {
      include: {
        team: {
          include: { matchScouts: { include: { categories: { include: { questions: true } } } } }
        }
      }
    }
  })