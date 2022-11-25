import { NextPage } from "next";
import { useRouter } from "next/router";
import Protected from "../../../components/auth/protected";
import { Filter } from "../../../components/scouting/filter/filter";
import { ManageCompetitions } from "../../../components/ui/misc/competitions";
import { useQuery } from "../../../hooks/trpc";
import { Tab } from "@headlessui/react";
import { ManagePitScout } from "../../../components/ui/misc/pit-scout";
import Members from "../../../components/ui/misc/members";
import { useSession } from "next-auth/react";
import { MemberStatus } from "@prisma/client";

const TeamContent: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, isLoading } = useQuery([
    "team.get-by-id",
    { teamId: router.query.id as string },
  ]);

  const memberIndex = data?.members
    .map((e) => e.userId)
    .indexOf(session?.user.id as string);
  const isMember = memberIndex !== -1;
  const isAdmin =
    data?.members[(Number(memberIndex))]?.status === MemberStatus.CREATOR;

  const tabs = ["Data", "Misc"];

  return (
    <Protected>
      {isMember ? (
        <div className="min-h-screen px-16 py-8 md:px-8 dark:text-white md:h-full 2xl:h-full">
          <h1 className="mb-2 text-4xl">{data?.name}</h1>
          <h1 className="mb-4 text-xl">Team {data?.number}</h1>
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
                  <Filter teamId={data?.id as string} isAdmin={isAdmin} />
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
                          Pit Scout
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
                          teamId={data?.id as string}
                          isAdmin={isAdmin}
                        />
                      </Tab.Panel>
                      <Tab.Panel>
                        <ManagePitScout
                          teamId={data?.id as string}
                          isAdmin={isAdmin}
                        />
                      </Tab.Panel>
                      <Tab.Panel>
                        <Members
                          teamId={data?.id as string}
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
};

export default TeamContent;
