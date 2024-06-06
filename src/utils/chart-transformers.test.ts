import { describe, expect, test } from "vitest";
import { forecastResultsToChart } from "./chart-transformers";
import { ForecastResults } from "../api/types";
import { Serie } from "@nivo/line";

const FORECAST_EXAMPLE: ForecastResults = {
  latitude: 48.86,
  longitude: 2.3399997,
  generationtime_ms: 0.071,
  utc_offset_seconds: 0,
  timezone: "GMT",
  timezone_abbreviation: "GMT",
  elevation: 43.0,
  daily_units: {
    time: "iso8601",
    temperature_2m_max: "°C",
    temperature_2m_min: "°C",
    precipitation_sum: "mm",
  },
  daily: {
    time: ["2024-06-06", "2024-06-07"],
    temperature_2m_max: [21.4, 21.3],
    temperature_2m_min: [10.1, 9.7],
    precipitation_sum: [0.0, 0.0],
  },
};

const FORECAST_CHART_EXAMPLE: Serie[] = [
  {
    id: "temperature_2m_max",
    data: [
      {
        x: "6/6/2024",
        y: 21.4,
      },
      {
        x: "6/7/2024",
        y: 21.3,
      },
    ],
  },
  {
    id: "temperature_2m_min",
    data: [
      {
        x: "6/6/2024",
        y: 10.1,
      },
      {
        x: "6/7/2024",
        y: 9.7,
      },
    ],
  },
  {
    id: "precipitation_sum",
    data: [
      {
        x: "6/6/2024",
        y: 0.0,
      },
      {
        x: "6/7/2024",
        y: 0.0,
      },
    ],
  },
];

describe("chart-transformers", () => {
  describe("forecastResultsToChart()", () => {
    test("transforms data properly", () => {
      expect(forecastResultsToChart(FORECAST_EXAMPLE)).toStrictEqual(
        FORECAST_CHART_EXAMPLE
      );
    });
  });
});
