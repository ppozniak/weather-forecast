import { ResponsivePie } from "@nivo/pie";

import { fetchWeekForecast, geocodingSearch } from "./api";

function App() {
  const dataPie = [
    {
      id: "javascript",
      label: "javascript",
      value: 456,
    },
    {
      id: "stylus",
      label: "stylus",
      value: 290,
    },
  ];

  const handleClick = async () => {
    const results = await geocodingSearch("paris");
    console.log("🚀 ~ fetchThing ~ results:", results);

    const { longitude, latitude } = results[0];
    const forecast = await fetchWeekForecast({ longitude, latitude });
    console.log("🚀 ~ handleClick ~ forecast:", forecast);
  };

  return (
    <div className="container h-screen">
      <div className="flex justify-center items-center h-full flex-col">
        <h1 className="text-4xl text-green-400">Hello there</h1>
        <div>
          <button onClick={handleClick}>Download</button>
        </div>
        <div className="w-full h-52 mt-4">
          <ResponsivePie data={dataPie} />
        </div>
      </div>
    </div>
  );
}

export default App;
