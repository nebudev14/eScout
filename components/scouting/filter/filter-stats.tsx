import { percentageFormat, Statistics } from "../../../util/calculate-stats";
import { NumberStats } from "../stats/number-stats";
import { Tab } from "@headlessui/react";
import { BallGraph } from "../stats/graphs/ball-graph";
import { Entry } from "@prisma/client";
import { ClimbGraph } from "../stats/graphs/climb-graph";

export const FilterStats: React.FC<{ data: Entry[], stats: Statistics }> = ({ data, stats }) => {
  const tabs = ["General", "Cargo", "Climb"];

  return (
    <div>
      <Tab.Group>
        <div className="flex flex-col items-center text-xl md:text-base">
          <Tab.List className="grid grid-cols-3">
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
            <NumberStats stats={stats} />
          </Tab.Panel>
          <Tab.Panel>
            <BallGraph entries={data} />
          </Tab.Panel>
          <Tab.Panel><ClimbGraph entries={data} stats={stats} /></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
