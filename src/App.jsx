import { useState, useEffect } from "react";
import InputSearchMovie from "./components/InputSearchMovie";
import Movie from "./components/Movie";
import NextPage from "./components/NextPage";
import { getPopularMovies, getMoviesByTitle, getGenres } from "./services/tmdb";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [title, setTitle] = useState("");

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const [error, setError] = useState("");
  const [errorGenre, setErrorGenre] = useState("");

  useEffect(() => {
    async function loadGenres() {
      try {
        const genres = await getGenres();
        setGenres(genres);
      } catch (err) {
        setErrorGenre(err.message);
      }
    }

    loadGenres();
  }, []);

  useEffect(() => {
    async function loadMovies() {
      try {
        //Faca outra condicao quando tiver usando filtros
        //Use um state, if filtrosAtivos, voce vai setMovies(moviesFiltrados pela determinada condicao...)
        //obviamente tenho que ter outro state representando os movies filtrados.

        if (!title.trim()) {
          //  é string vazia? entra na condicao
          const popularMovies = await getPopularMovies(pageNumber);
          setMovies(popularMovies);
          return;
        }
        //title existe? pesquisa baseado nele...
        const moviesByTitle = await getMoviesByTitle(title, pageNumber);
        setMovies(moviesByTitle);
      } catch (err) {
        setError(err.message);
      }
    }
    loadMovies();
  }, [title, setMovies, pageNumber]);

  return (
    <div className="flex flex-col items-center gap-10 pt-16 px-4 min-h-dvh  bg-[url(../../public/hero-bg.png)] text-center lg:text-left text-slate-50">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bebas-neue">
        Find Movies You'll Love Without the Hassle
      </h1>
      <InputSearchMovie setTitle={setTitle} setPageNumber={setPageNumber} />
      {!title.trim() && (
        <h2 className="text-left text-4xl md:text-5xl lg:text-6xl font-bebas-neue">
          Popular
        </h2>
      )}

      <Movie
        pageNumber={pageNumber}
        movies={movies}
        genres={genres}
        setErrorGenre={setErrorGenre}
      />
      <NextPage pageNumber={pageNumber} setPageNumber={setPageNumber} />
    </div>
  );
}

export default App;

//Catch and handle exceptions.. If they occur
//see if you can simplify error state in one component and use like props in the rest of them

//check later...
//Little windows to show when searching for movies... like options, instead of updating the whole page...
//Make the search page, after you type, you can click in the icon to search. check examples for that. (I need the little window to let it shows good)
//make page go to the top of it, after the loading of another page...
