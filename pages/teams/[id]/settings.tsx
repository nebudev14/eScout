import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { appRouter } from "@server/routers/_app";
import { createContextInner } from "@server/context";
import { getSession } from "next-auth/react";
import { MemberStatus } from "@prisma/client";
import { Tab } from "@headlessui/react";
import { ManageCompetitions } from "@components/ui/misc/competitions";
import { ManageScoutForm } from "@components/ui/misc/scout-forms";
import { Members } from "@components/ui/misc/members";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import Protected from "@components/auth/protected";

export default function TeamSettings(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const memberIndex = props.team?.members
    .map((e) => e.userId)
    .indexOf(props.session?.user.id as string);

  const isMember = memberIndex !== -1;
  const isAdmin =
    props.team?.members[Number(memberIndex)]?.status === MemberStatus.CREATOR;

  const router = useRouter();
  const tabs = ["Competitions", "Scout Forms", "Members"];

  return (
    <Protected>
      {isMember ? (
        <div className="min-h-screen px-16 py-8 md:px-8 dark:text-white md:h-full 2xl:h-full">
          <BiArrowBack
            size={30}
            className="mb-4 duration-150 hover:text-pink-600 hover:cursor-pointer"
            onClick={() => router.back()}
          />
          <h1 className="mb-2 text-4xl">{props.team?.name}</h1>
          <h1 className="mb-4 text-xl">Team {props.team?.number}</h1>
          <Tab.Group>
            <div className="flex flex-col items-start text-xl md:text-lg md:items-center">
              <Tab.List className="grid grid-cols-3 mt-4 mb-8">
                {tabs.map((tab, i) => (
                  <Tab
                    key={i}
                    className={({ selected }) =>
                      selected
                        ? "px-6 py-2 md:px-2 md:text-sm outline-none border-b-2 border-cyan-400"
                        : "px-6 py-2 md:px-2 md:text-sm"
                    }
                  >
                    {tab}
                  </Tab>
                ))}
              </Tab.List>
            </div>
            <Tab.Panels className="mt-4">
              <Tab.Panel>
                <ManageCompetitions
                  teamId={props.team?.id as string}
                  isAdmin={isAdmin}
                />
              </Tab.Panel>
              <Tab.Panel>
                <ManageScoutForm
                  teamId={props.team?.id as string}
                  isAdmin={isAdmin}
                />
              </Tab.Panel>
              <Tab.Panel>
                <Members teamId={props.team?.id as string} isAdmin={isAdmin} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
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
    },
  };
}
