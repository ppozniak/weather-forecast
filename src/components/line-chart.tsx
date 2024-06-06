import { LineProps, ResponsiveLine } from "@nivo/line";

export default function LineChart(props: LineProps) {
  return (
    <ResponsiveLine
      margin={{ top: 0, right: 110, bottom: 50, left: 60 }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: 100,
          itemWidth: 80,
          itemHeight: 20,
        },
      ]}
      {...props}
    />
  );
}
