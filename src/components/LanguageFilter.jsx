import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import { useEffect } from "react";
import { discoverMoviesByLanguage, getLanguages } from "../services/tmdb";

export default function LanguageFilter({ setMovies }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [languages, setLanguages] = useState([]);

  async function loadMoviesByLanguage(language) {
    const movies = await discoverMoviesByLanguage(language);
    setMovies(movies);
  }

  useEffect(() => {
    async function loadLanguages() {
      try {
        // setErrorMessage("");
        const languages = await getLanguages();
        setLanguages(languages);
      } catch (err) {
        console.log(err);
        // setErrorMessage(err.message);
      }
    }

    loadLanguages();
  }, []);

  return (
    <Listbox value={selectedLanguage} onChange={setSelectedLanguage}>
      <ListboxButton className="rounded-md bg-slate-800 px-3 py-2 text-white hover:bg-slate-500">
        {selectedLanguage ? selectedLanguage.english_name : "Language"}
      </ListboxButton>

      <ListboxOptions
        anchor="bottom start"
        className="w-56 rounded-md bg-gray-800 p-1"
      >
        {languages.map((language) => (
          <ListboxOption
            key={language.english_name}
            value={language}
            onClick={() => loadMoviesByLanguage(language.iso_639_1)}
            className="cursor-pointer rounded px-3 py-2 text-gray-300 data-focus:bg-white/10 data-selected:text-white"
          >
            {language.english_name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
