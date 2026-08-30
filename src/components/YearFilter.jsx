import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import movieYears from "../utils/data";
import { discoverMoviesByReleaseYear } from "../services/tmdb";

export default function YearFilter({ setMovies }) {
  const [selectedYear, setSelectedYear] = useState(null);

  async function loadMoviesByYear(year) {
    const movies = await discoverMoviesByReleaseYear(year);
    setMovies(movies);
  }

  return (
    <Listbox value={selectedYear} onChange={setSelectedYear}>
      <ListboxButton className="rounded-md bg-slate-800 px-3 py-2 text-white hover:bg-slate-500">
        {selectedYear ? selectedYear.year : "Year"}
      </ListboxButton>

      <ListboxOptions
        anchor="bottom start"
        className="w-56 rounded-md bg-gray-800 p-1"
      >
        {movieYears.map((movieYear) => (
          <ListboxOption
            key={movieYear.id}
            value={movieYear}
            onClick={() => loadMoviesByYear(movieYear.year)}
            className="cursor-pointer rounded px-3 py-2 text-gray-300 data-focus:bg-white/10 data-selected:text-white"
          >
            {movieYear.year}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
