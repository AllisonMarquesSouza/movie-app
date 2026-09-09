import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import heroBg from "./assets/hero-bg.png";
import InputSearchMovie from "./components/InputSearchMovie";
import MenuActive from "./components/MenuActive";
import Movie from "./components/Movie";
import NextPage from "./components/NextPage";
import ErrorLoadingPage from "./pages/ErrorLoadingPage";
import { getGenres, getMoviesByTitle, getPopularMovies } from "./services/tmdb";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [title, setTitle] = useState("");

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activeMenu, setActiveMenu] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadGenres() {
      try {
        setErrorMessage("");
        const genres = await getGenres();
        setGenres(genres);
      } catch (err) {
        setErrorMessage(err.message);
      }
    }

    loadGenres();
  }, []);

  useEffect(() => {
    async function loadMovies() {
      try {
        setErrorMessage("");
        const result = title.trim()
          ? await getMoviesByTitle(title, pageNumber)
          : await getPopularMovies(pageNumber);

        setMovies(result);
      } catch (err) {
        console.log(err.status);
        setErrorMessage(err.message);
      }
    }
    loadMovies();
  }, [title, pageNumber]);

  return (
    <>
      {errorMessage ? (
        <ErrorLoadingPage errorMessage={errorMessage} />
      ) : (
        <div className="relative">
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <button
              type="button"
              className="flex gap-2 p-3 rounded-full text-slate-50 bg-slate-900 hover:cursor-pointer transition hover:bg-slate-600"
              onClick={() => setActiveMenu(!activeMenu)}
            >
              <Menu />
              <h2>Menu</h2>
            </button>

            {activeMenu && <MenuActive />}
          </div>

          <div
            className="flex flex-col items-center gap-10 pt-16 px-4 min-h-dvh text-center lg:text-left text-slate-50"
            style={{ backgroundImage: `url(${heroBg})` }}
          >
            <h1 className="text-3xl mt-4 md:text-4xl lg:text-6xl font-bebas-neue">
              Find Movies You'll Love Without the Hassle
            </h1>
            <InputSearchMovie
              setTitle={setTitle}
              setPageNumber={setPageNumber}
              genres={genres}
              setMovies={setMovies}
            />
            {!title.trim() && (
              <h2 className="text-left text-4xl md:text-5xl lg:text-6xl font-bebas-neue">
                Popular
              </h2>
            )}

            <Movie pageNumber={pageNumber} movies={movies} genres={genres} />
            <NextPage pageNumber={pageNumber} setPageNumber={setPageNumber} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
