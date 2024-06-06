import { useState } from "react";
import { geocodingSearch } from "../api";
import { GeocodeSearchResults } from "../api/types";

interface CitySearchFormProps {
  onSearch: (results: GeocodeSearchResults[]) => void;
}

// @TODO: Would be much better to use autocomplete-dropdown component from some library
export default function CitySearchForm(props: CitySearchFormProps) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value) return;

    setLoading(true);

    try {
      // @TODO: Signal abort
      const results = await geocodingSearch(value);
      props.onSearch(results);
    } catch (error) {
      // @TODO: Error handling
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="bold block" htmlFor="search">
        Search for cities
      </label>
      <div className="flex">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="bold block border border-sky-500 p-2 mr-4"
          type="text"
          placeholder="City name"
          id="search"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-sky-500 px-4 hover:bg-sky-600 focus:bg-sky-600 disabled:bg-slate-400"
        >
          Search
        </button>
      </div>
    </form>
  );
}
