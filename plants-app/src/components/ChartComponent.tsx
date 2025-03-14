import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {DatapointReport} from "../../domain/entities/DatapointReport.ts";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ChartComponentProps = {
  data: DatapointReport[]
}

const ChartComponent = ({ data }: ChartComponentProps) => {
  const chartData = {
    labels: data.map((item) => item.day), // Extract days
    datasets: [
      {
        label: "Total Energy Expected",
        data: data.map((item) => item.total_energy_expected),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Total Energy Observed",
        data: data.map((item) => item.total_energy_observed),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Total Irradiation Expected",
        data: data.map((item) => item.total_irradiation_expected),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "Total Irradiation Observed",
        data: data.map((item) => item.total_irradiation_observed),
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Energy and Irradiation Metrics Over Time" },
    },
  };

  // @ts-ignore
  return <Line data={chartData} options={options} />;
};

export default ChartComponent;
