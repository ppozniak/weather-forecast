import { ForecastResults, GeocodeSearchResults } from "./types";

const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1";
const OPEN_METEO_API_URL = "https://api.open-meteo.com/v1/";

// @TODO: Better fetch and safer typing

// https://open-meteo.com/en/docs/geocoding-api
/**
 * Searches for a city by provided `name` returning geocoding data
 */
export async function geocodingSearch(
  name: string
): Promise<GeocodeSearchResults[]> {
  const searchParams = new URLSearchParams({
    count: "10",
    language: "en",
    format: "json",
    name,
  });

  const response = await fetch(
    `${GEOCODING_API_URL}/search?${searchParams.toString()}`
  );
  const json = await response.json();

  return json?.results ?? [];
}

// https://open-meteo.com/en/docs
/**
 * Fetches 7 day forecast for given lat/long
 */
export async function fetchWeekForecast({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<ForecastResults> {
  const searchParams = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
  });

  const response = await fetch(
    `${OPEN_METEO_API_URL}/forecast?${searchParams.toString()}`
  );
  const json = await response.json();

  return json;
}
