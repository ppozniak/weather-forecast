import { GeocodeSearchResults } from "./types";

const OPEN_METEO_API = "https://geocoding-api.open-meteo.com/v1/";

const DEFAULT_SEARCH_PARAMS = new URLSearchParams({
  count: "10",
  language: "en",
  format: "json",
});

// https://open-meteo.com/en/docs/geocoding-api
/**
 * Searches for a city by provided `name` returning geocoding data
 */
export async function geocodingSearch(
  name: string
): Promise<GeocodeSearchResults[]> {
  const searchParams = new URLSearchParams(DEFAULT_SEARCH_PARAMS);
  searchParams.append("name", name);

  const response = await fetch(
    `${OPEN_METEO_API}/search?${searchParams.toString()}`
  );
  const json = await response.json();

  return json?.results ?? [];
}

//  https://open-meteo.com/en/docs
export function fetchDocs() {}
