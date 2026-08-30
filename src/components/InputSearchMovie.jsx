import { FilterIcon, Search } from "lucide-react";
import { useState } from "react";
import GenreFilter from "./GenreFilter";
import YearFilter from "./YearFilter";
import CountryFilter from "./CountryFilter";
import LanguageFilter from "./LanguageFilter";

function InputSearchMovie({ setTitle, setPageNumber, genres, setMovies }) {
  const [filterStatus, setFilterStatus] = useState(false);

  /*
  min-h-dvh = “a página nunca será menor que a tela”
  max-w-xl  = “o conteúdo não vai ficar largo demais no desktop”
  w-full    = “no celular, ocupe a largura disponível”  
  */
  return (
    <div className="flex justify-center items-center gap-2 w-full">
      <button
        className="flex gap-2 p-3 rounded-full bg-slate-900 hover:cursor-pointer transition hover:bg-slate-600"
        onClick={() => setFilterStatus(!filterStatus)}
      >
        <FilterIcon />
        <h2>Filter</h2>
      </button>
      {filterStatus ? (
        <>
          <GenreFilter setMovies={setMovies} genres={genres} />
          <YearFilter setMovies={setMovies} />
          <CountryFilter setMovies={setMovies} />
          <LanguageFilter setMovies={setMovies} />
        </>
      ) : (
        ""
      )}

      <input
        className="w-3xl rounded-full  px-4 py-3 bg-slate-900 opacity-50 text-slate-50 outline-none  placeholder:text-slate-50 transition hover:shadow-xl hover:opacity-100 hover: focus:opacity-100"
        type="text"
        onChange={(event) => {
          setTitle(event.target.value);
          setPageNumber(1);
        }}
        placeholder="Search through 300+ movies online"
      />
      <button className="transition hover:opacity-50 hover:cursor-pointer">
        <Search />
      </button>
    </div>
  );
}

export default InputSearchMovie;
