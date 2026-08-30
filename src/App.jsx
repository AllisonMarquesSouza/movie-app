import { useEffect, useState } from "react";
import InputSearchMovie from "./components/InputSearchMovie";
import Movie from "./components/Movie";
import NextPage from "./components/NextPage";
import ErrorLoadingPage from "./pages/ErrorLoadingPage";
import { getGenres, getMoviesByTitle, getPopularMovies } from "./services/tmdb";
import heroBg from "./assets/hero-bg.png";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [title, setTitle] = useState("");

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

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
        <div>
          <div
            className="flex flex-col items-center gap-10 pt-16 px-4 min-h-dvh text-center lg:text-left text-slate-50"
            style={{ backgroundImage: `url(${heroBg})` }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bebas-neue">
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

//check later...
//Little windows to show when searching for movies... like options, instead of updating the whole page...
//Make the search page, after you type, you can click in the icon to search. check examples for that. (I need the little window to let it shows good)
//make page go to the top of it, after the loading of another page...
