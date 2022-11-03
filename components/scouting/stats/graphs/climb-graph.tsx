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
import { Line } from "react-chartjs-2";
import { Entry } from "@prisma/client";
import { Statistics } from "../../../../util/calculate-stats";

export const ClimbGraph: React.FC<{ entries: Entry[], stats: Statistics }> = ({ entries }) => {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  entries!?.sort((a, b) => a.matchNumber - b.matchNumber);
  const matchNumbers: string[] = entries!?.map((e) => e.matchNumber.toString());
  const climbTimes: number[] = entries!?.map((e) => e.climbStart - e.climbEnd);
  
  const timeData: ChartData<"line"> = {
    labels: matchNumbers,
    datasets: [
      {
        type: "line",
        label: "Climb time",
        data: climbTimes,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      }
    ]
  }

  const timeOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Climb time"
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Qualification #"
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Time (s)"
        }
      }
    }
  };

  return (
    <div>
      <Line options={timeOptions} data={timeData} />
    </div>
  );
}