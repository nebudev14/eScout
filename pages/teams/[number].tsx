import { NextPage } from "next";
import { useRouter } from "next/router";
import { Protected } from "../../components/auth/protected";
import { Filter } from "../../components/scouting/filter";
import { useQuery } from "../../hooks/trpc";
import { Tab } from "@headlessui/react";

const TeamContent: NextPage = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery([
    "team.get-by-number",
    { number: Number(router.query.number) },
  ]);

  const tabs = ["Entries", "Competitions"];

  return (
    <Protected>
      <div className="h-screen px-6 py-4">
        <h1 className="mb-2 text-4xl">{data?.name}</h1>
        <h1 className="mb-6 text-xl">Team {data?.number}</h1>
        <div className="flex flex-col items-center justify-center">
          <Tab.Group>
            <Tab.List className="grid grid-cols-2">
              {tabs.map((content, i) => (
                <Tab
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
            <Tab.Panels>
              <Tab.Panel>
                <Filter teamNum={Number(router.query.number)} />
              </Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </Protected>
  );
};

export default TeamContent;
