import { useNavigate } from "react-router-dom";

function Movie({ movies, genres }) {
  const navigate = useNavigate();
  function onSeeDetailsMovie(movie) {
    const query = new URLSearchParams();
    query.set("id", movie.id);
    navigate(`/detail?${query.toString()}`);
  }

  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <li
          key={movie.id}
          className="flex flex-col gap-1  mouse transition duration-300 hover:scale-105 hover:cursor-pointer"
        >
          {movie.poster_path && (
            <img
              className="rounded-lg hover:bg-slate-50 "
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={`Poster for ${movie.title}`}
              onClick={() => onSeeDetailsMovie(movie)}
            />
          )}
          <h1>{movie.original_title}</h1>
          <div className="flex gap-1 font-dm-sans">
            <p>
              {movie.vote_average.toFixed(1)} •{" "}
              {movie.genre_ids
                .map((genreId) => {
                  const genre = genres.find((genre) => genre.id === genreId);

                  return genre ? genre.name : "";
                })
                .join(", ")}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Movie;
