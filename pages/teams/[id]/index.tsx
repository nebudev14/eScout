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

export default function TeamContent(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const { data: session } = useSession();

  const memberIndex = props.team?.members
    .map((e) => e.userId)
    .indexOf(session?.user.id as string);
  const isMember = memberIndex !== -1;
  const isAdmin =
    props.team?.members[Number(memberIndex)]?.status === MemberStatus.CREATOR;

  const tabs = ["Data", "Misc"];

  return (
    <Protected>
      {isMember ? (
        <div className="min-h-screen px-16 py-8 md:px-8 dark:text-white md:h-full 2xl:h-full">
          <h1 className="mb-2 text-4xl">{props.team?.name}</h1>
          <h1 className="mb-4 text-xl">Team {props.team?.number}</h1>
          <div className="">
            <Tab.Group>
              <div className="flex flex-col items-start text-2xl md:text-lg md:items-center">
                <Tab.List className="grid grid-cols-2">
                  {tabs.map((content, i) => (
                    <Tab
                      key={i}
                      className={({ selected }) =>
                        selected
                          ? "px-6 py-2 outline-none border-b-2 border-pink-600"
                          : "px-6 py-2"
                      }
                    >
                      {content}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="mt-4">
                <Tab.Panel>
                  <div>
                    <select className="h-full p-2 mb-4 border-r-4 rounded-lg shadow-md outline-none dark:text-white dark:bg-zinc-900 dark:border-zinc-700">
                      
                    </select>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <Tab.Group>
                    <div className="flex flex-col items-center justify-center text-xl md:text-lg md:items-center">
                      <Tab.List className="grid grid-cols-3">
                        <Tab
                          className={({ selected }) =>
                            selected
                              ? "px-6 py-2 md:px-2 md:text-sm outline-none border-b-2 border-cyan-400"
                              : "px-6 py-2 md:px-2 md:text-sm"
                          }
                        >
                          Competitions
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            selected
                              ? "px-6 py-2 md:px-2 md:text-sm outline-none border-b-2 border-cyan-400"
                              : "px-6 py-2 md:px-2 md:text-sm"
                          }
                        >
                          Scout Forms
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            selected
                              ? "px-6 py-2 md:px-2 md:text-sm outline-none border-b-2 border-cyan-400"
                              : "px-6 py-2 md:px-2 md:text-sm"
                          }
                        >
                          Members
                        </Tab>
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
                        <Members
                          teamId={props.team?.id as string}
                          isAdmin={isAdmin}
                        />
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
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
