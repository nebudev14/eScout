import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { appRouter } from "@server/routers/_app";
import { createContextInner } from "@server/context";
import { getSession } from "next-auth/react";

export default function TeamSettings() {}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({
      session: await getSession(context),
    }),
  });

  const teamId = context.params?.id as string;
  const team = await ssg.team.getById.fetch({ entityId: teamId });

  team?.members.forEach((m) => {
    m.user.created = String(m.user.created);
    m.user.emailVerified = String(m.user.emailVerified);
  });

  return {
    props: {
      team: team,
    },
  };
}
