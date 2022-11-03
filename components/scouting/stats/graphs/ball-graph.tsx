import { Statistics } from "../../../../util/calculate-stats";
import { Line } from "react-chartjs-2";
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
} from "chart.js";
import { Entry } from "@prisma/client";

export const BallGraph: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  entries.sort((a, b) => a.matchNumber - b.matchNumber);
  const matchNumbers: string[] = entries.map((e) => e.matchNumber.toString());
  const shots: number[] = entries.map((e) => e.autoHighShotsMade);

  const data: ChartData<"line"> = {
    labels: matchNumbers,
    datasets: [
      {
        type: "line",
        label: "Balls",
        data: shots,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};
