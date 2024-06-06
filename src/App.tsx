import { fetchWeekForecast } from "./api";
import { useState } from "react";
import { forecastResultsToChart } from "./utils/chart-transformers";
import { Serie } from "@nivo/line";
import LineChart from "./components/line-chart";
import CitySearchForm from "./components/city-search-form";
import { GeocodeSearchResults } from "./api/types";

function App() {
  const [chartData, setChartData] = useState<Serie[]>([]);
  const [results, setResults] = useState<GeocodeSearchResults>();

  // @TODO: Loading state
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearchSuccess = async (results: GeocodeSearchResults[]) => {
    if (results.length) {
      setErrorMessage("");
      const { longitude, latitude } = results[0];
      setResults(results[0]);
      const forecast = await fetchWeekForecast({ longitude, latitude });
      const data = forecastResultsToChart(forecast);

      setChartData(data);
    } else {
      setErrorMessage("City not found");
    }
  };

  return (
    <div className="container h-screen">
      <div className="flex justify-center items-center h-full flex-col">
        <h1 className="text-4xl text-green-400 mb-4">Weather forecast</h1>
        <CitySearchForm onSearch={handleSearchSuccess} />

        {errorMessage && (
          <div className="text-red-700 mt-4 animate-pulse">{errorMessage}</div>
        )}

        <div className="w-full h-96 mt-4 max-w-4xl">
          {!!chartData.length && (
            <>
              <div>
                Forecast for {results?.country}, {results?.name}
              </div>
              <LineChart data={chartData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
