import { NextPage } from "next";
import { useRouter } from "next/router";
import { Protected } from "../../../components/auth/protected";
import { Filter } from "../../../components/scouting/filter/filter";
import { ManageCompetitions } from "../../../components/ui/misc/competitions";
import { useQuery } from "../../../hooks/trpc";
import { Tab } from "@headlessui/react";
import { ManagePitScout } from "../../../components/ui/misc/pit-scout";

const TeamContent: NextPage = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery([
    "team.get-by-number",
    { number: Number(router.query.number) },
  ]);

  const tabs = ["Data", "Misc"];

  return (
    <Protected>
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
                <Filter teamNum={Number(router.query.number)} />
              </Tab.Panel>
              <Tab.Panel>
                <Tab.Group>
                  <div className="flex flex-col items-center justify-center text-xl md:text-lg md:items-center">
                    <Tab.List className="grid grid-cols-2">
                      <Tab
                        className={({ selected }) =>
                          selected
                            ? "px-6 py-2 outline-none border-b-2 border-cyan-400"
                            : "px-6 py-2"
                        }
                      >
                        Competitions
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          selected
                            ? "px-6 py-2 outline-none border-b-2 border-cyan-400"
                            : "px-6 py-2"
                        }
                      >
                        Pit Scout
                      </Tab>
                    </Tab.List>
                  </div>
                  <Tab.Panels className="mt-4">
                    <Tab.Panel>
                      <ManageCompetitions
                        teamNum={Number(router.query.number)}
                      />
                    </Tab.Panel>
                    <Tab.Panel>
                      <ManagePitScout teamNum={Number(router.query.number)} />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </Protected>
  );
};

export default TeamContent;
