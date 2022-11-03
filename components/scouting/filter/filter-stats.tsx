import { percentageFormat, Statistics } from "../../../util/calculate-stats";
import { NumberStats } from "../stats/number-stats";
import { Tab } from "@headlessui/react";

export const FilterStats: React.FC<{ stats: Statistics }> = ({ stats }) => {
  const tabs = ["Numerical Data", "Ball Graphs", "Climb Graphs"];

  return (
    <div>
      <Tab.Group>
      <div className="flex flex-col items-center text-xl">
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
        <Tab.Panel>ball grpah</Tab.Panel>
        <Tab.Panel>climb grpah</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
    </div>
  );
};
