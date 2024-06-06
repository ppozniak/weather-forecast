import { fetchWeekForecast, geocodingSearch } from "./api";
import { useState } from "react";
import { forecastResultsToChart } from "./utils/chart-transformers";
import { Serie } from "@nivo/line";
import LineChart from "./components/line-chart";

function App() {
  const [chartData, setChartData] = useState<Serie[]>([]);

  const handleClick = async () => {
    const results = await geocodingSearch("paris");
    console.log("🚀 ~ fetchThing ~ results:", results);

    const { longitude, latitude } = results[0];
    const forecast = await fetchWeekForecast({ longitude, latitude });
    console.log("🚀 ~ handleClick ~ forecast:", forecast);

    const data = forecastResultsToChart(forecast);
    console.log("🚀 ~ handleClick ~ data:", data);

    setChartData(data);
  };

  return (
    <div className="container h-screen">
      <div className="flex justify-center items-center h-full flex-col">
        <h1 className="text-4xl text-green-400">Hello there</h1>
        <div>
          <button onClick={handleClick}>Download</button>
        </div>
        <div className="w-full h-96 mt-4 max-w-4xl">
          {!!chartData.length && <LineChart data={chartData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
