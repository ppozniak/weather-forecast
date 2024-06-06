import { ResponsiveLine, LineSvgProps } from "@nivo/line";

import { fetchWeekForecast, geocodingSearch } from "./api";
import { useState } from "react";
import { forecastResultsToChart } from "./utils/chart-transformers";

function App() {
  const [chartData, setChartData] = useState<LineSvgProps["data"]>([]);

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
        <div className="w-full h-96 mt-4">
          {!!chartData.length && (
            <ResponsiveLine
              data={chartData}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
              }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "day",
                legendOffset: 36,
                legendPosition: "middle",
                truncateTickAt: 0,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "count",
                legendOffset: -40,
                legendPosition: "start",
                truncateTickAt: 0,
              }}
              enableGridX={false}
              enableGridY={false}
              lineWidth={1}
              pointSize={4}
              pointColor={{ theme: "background" }}
              pointLabel="data.x"
              pointLabelYOffset={-12}
              areaOpacity={0}
              enableTouchCrosshair={true}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
