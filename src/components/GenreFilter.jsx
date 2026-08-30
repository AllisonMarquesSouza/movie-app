import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import { discoverMoviesByGenre } from "../services/tmdb";

export default function GenreFilter({ genres, setMovies }) {
  const [selectedGenre, setSelectedGenre] = useState(null);

  async function loadMoviesByGenre(genreId) {
    const movies = await discoverMoviesByGenre(genreId);
    setMovies(movies);
  }

  return (
    <Listbox value={selectedGenre} onChange={setSelectedGenre}>
      <ListboxButton className="rounded-md bg-slate-800 px-3 py-2 text-white hover:bg-slate-500">
        {selectedGenre ? selectedGenre.name : "Genre"}
      </ListboxButton>

      <ListboxOptions
        anchor="bottom start"
        className="w-56 rounded-md bg-gray-800 p-1"
      >
        {genres.map((genre) => (
          <ListboxOption
            key={genre.id}
            value={genre}
            onClick={() => loadMoviesByGenre(genre.id)}
            className="cursor-pointer rounded px-3 py-2 text-gray-300 data-focus:bg-white/10 data-selected:text-white"
          >
            {genre.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
