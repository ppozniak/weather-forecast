import { Datum, Serie } from "@nivo/line";
import { ForecastResults } from "../api/types";
import { pick } from "lodash";

export function forecastResultsToChart(results: ForecastResults): Serie[] {
  // Pick serializable data sets
  const serializable = pick(results.daily, [
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_sum",
  ]);

  // x axis are days, transform them into dates
  const xAxis = results.daily.time.map((stringDate) =>
    new Date(stringDate).toLocaleDateString()
  );

  // Construct series
  const series = Object.entries(serializable).reduce<Serie[]>(
    (final, [id, data]) => {
      const points: Datum[] = data.map((value, index) => ({
        x: xAxis[index],
        y: value,
      }));

      return [...final, { id, data: points }];
    },
    []
  );

  return series;
}
