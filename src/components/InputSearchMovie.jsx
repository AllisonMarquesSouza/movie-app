import { FilterIcon, Search } from "lucide-react";
import { useState } from "react";
import GenreFilter from "./GenreFilter";
import YearFilter from "./YearFilter";
import CountryFilter from "./CountryFilter";
import LanguageFilter from "./LanguageFilter";

function InputSearchMovie({ setTitle, setPageNumber, genres, setMovies }) {
  const [filterStatus, setFilterStatus] = useState(false);

  return (
    <div className="flex flex-col-reverse items-center w-64 gap-2 md:flex-row md:w-full md:justify-center">
      <div className="flex gap-2">
        <button
          className="flex gap-2 p-3 rounded-full bg-slate-900 hover:cursor-pointer transition hover:bg-slate-600"
          onClick={() => setFilterStatus(!filterStatus)}
        >
          <FilterIcon />
          <h2>Filter</h2>
        </button>

        <button className="transition hover:opacity-50 hover:cursor-pointer">
          <Search />
        </button>
      </div>
      {filterStatus ? (
        <div className="flex gap-2">
          <GenreFilter setMovies={setMovies} genres={genres} />
          <YearFilter setMovies={setMovies} />
          <CountryFilter setMovies={setMovies} />
          <LanguageFilter setMovies={setMovies} />
        </div>
      ) : (
        ""
      )}

      <input
        className="w-80 sm:w-2xl md:w-3xl rounded-full  px-4 py-3 bg-slate-900 opacity-50 text-slate-50 outline-none  placeholder:text-slate-50 transition hover:shadow-xl hover:opacity-100 hover: focus:opacity-100"
        type="text"
        onChange={(event) => {
          setTitle(event.target.value);
          setPageNumber(1);
        }}
        placeholder="Search through 300+ movies online"
      />
    </div>
  );
}

export default InputSearchMovie;
