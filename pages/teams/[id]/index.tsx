import { useRouter } from "next/router";
import Protected from "@components/auth/protected";
import { Filter } from "@components/scouting/filter/filter";
import { ManageCompetitions } from "@components/ui/misc/competitions";
import { Tab } from "@headlessui/react";
import { ManageScoutForm } from "@components/ui/misc/scout-forms";
import { Members } from "@components/ui/misc/members";
import { useSession, getSession } from "next-auth/react";
import { MemberStatus } from "@prisma/client";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { appRouter } from "@server/routers/_app";
import { createContextInner } from "@server/context";
import { MdSettings } from "react-icons/md";
import Link from "next/link";

export default function TeamContent(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { teamId } = props;

  const memberIndex = props.team?.members
    .map((e) => e.userId)
    .indexOf(props.session?.user.id as string);
  const isMember = memberIndex !== -1;

  return (
    <Protected>
      {isMember ? (
        <div className="min-h-screen px-16 py-8 md:px-8 dark:text-white md:h-full 2xl:h-full">
          <div className="flex justify-start">
            <h1 className="mb-2 mr-auto text-4xl">{props.team?.name}</h1>
            <Link href={`/teams/${teamId}/settings`} passHref>
              <MdSettings
                size={30}
                className="duration-150 hover:cursor-pointer hover:text-pink-600"
              />
            </Link>
          </div>
          <h1 className="mb-4 text-xl">Team {props.team?.number}</h1>
          <div className="grid grid-cols-2 gap-12 py-2">
            {/* <div>
              {props.team?.matchScouts?.[0].responses.map((response, i) => (
                <div>
                  {response.comments}
                </div>
              ))}
            </div> */}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen text-3xl dark:text-white">
          You aren&apos;t a part of that team!
        </div>
      )}
    </Protected>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({
      session: session,
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
      session: session,
      teamId,
    },
  };
}
