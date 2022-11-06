import {
  Chart,
  ChartData,
  ChartOptions,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { Entry, RungLevel } from "@prisma/client";
import { Statistics } from "../../../../util/calculate-stats";

export const ClimbGraph: React.FC<{ entries: Entry[]; stats: Statistics }> = ({
  entries,
  stats,
}) => {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );
  const climbStats = stats.climbStats;

  entries!?.sort((a, b) => a.matchNumber - b.matchNumber);
  const matchNumbers: string[] = entries!?.map((e) => e.matchNumber.toString());
  const climbTimes: number[] = entries!?.map((e) => e.climbStart - e.climbEnd);
  const rungLevelPerMatch: RungLevel[] = entries!?.map((e) => e.climbRung);
  const rungLevels: number[] = [
    climbStats.noClimb,
    climbStats.lowClimb,
    climbStats.midClimb,
    climbStats.highClimb,
    climbStats.travClimb,
  ];

  const timeData: ChartData<"line"> = {
    labels: matchNumbers,
    datasets: [
      {
        type: "line",
        label: "Climb time",
        data: climbTimes,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],

  };

  const rungData: ChartData<"pie"> = {
    labels: ["None", "Low", "Mid", "High", "Traversal"],
    datasets: [
      {
        type: "pie",
        label: "Rung levels",
        data: rungLevels,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(10, 204, 72)",
          "rgb(139, 10, 204)",
        ],
      },
    ],
  };

  const rungOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Rung Levels",
      },
    },
  };

  const timeOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Climb time",
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Qualification #",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Time (s)",
        },
      },
    },
  };

  return (
    <>
      <div className="mb-6">
        <Line options={timeOptions} data={timeData} />
      </div>
      <div className="flex flex-col items-center">
        <div className="text-center w-[30rem]">
          <Pie options={rungOptions} data={rungData} />
        </div>
      </div>
    </>
  );
};
