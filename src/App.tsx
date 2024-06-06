import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function App() {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 800, pv: 2400, amt: 2400 },
  ];

  return (
    <div className="container h-screen">
      <div className="flex justify-center items-center h-full flex-col">
        <h1 className="text-4xl text-green-400">Hello there</h1>
        <div>
          <LineChart width={400} height={400} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default App;
