import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import { useEffect } from "react";
import { discoverMoviesByCountry, getCountries } from "../services/tmdb";

export default function CountryFilter({ setMovies }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);

  async function loadMoviesByCountry(country) {
    const movies = await discoverMoviesByCountry(country);
    setMovies(movies);
  }

  useEffect(() => {
    async function loadCountries() {
      try {
        // setErrorMessage("");
        const countries = await getCountries();
        setCountries(countries);
      } catch (err) {
        console.log(err);
        // setErrorMessage(err.message);
      }
    }

    loadCountries();
  }, []);

  return (
    <Listbox value={selectedCountry} onChange={setSelectedCountry}>
      <ListboxButton className="rounded-md bg-slate-800 px-3 py-2 text-white hover:bg-slate-500">
        {selectedCountry ? selectedCountry.english_name : "Country"}
      </ListboxButton>

      <ListboxOptions
        anchor="bottom start"
        className="w-56 rounded-md bg-gray-800 p-1"
      >
        {countries.map((country) => (
          <ListboxOption
            key={country.english_name}
            value={country}
            onClick={() => loadMoviesByCountry(country.iso_3166_1)}
            className="cursor-pointer rounded px-3 py-2 text-gray-300 data-focus:bg-white/10 data-selected:text-white"
          >
            {country.english_name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
