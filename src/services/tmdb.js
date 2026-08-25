const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies(pageNumber) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Could not fetch popular movies");
  }

  const data = await response.json();

  return data.results;
}
export async function getMovieDetail(id) {
  // https://api.themoviedb.org/3/movie/{movie_id}
  const response = await fetch(`${BASE_URL}/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch popular movies");
  }

  const data = await response.json();

  return data;
}
export async function getMovieProviders(id) {
  const response = await fetch(`${BASE_URL}/movie/${id}/watch/providers`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch watch providers");
  }

  const data = await response.json();

  // O operador ?. evita crash se BR ou flatrate forem undefined
  // Se não existir, retorna um array vazio []
  // return data.results?.US?.flatrate || [];
  return data.results?.US || [];
}

export async function getAllPagesPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&page=${1}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Could not fetch popular movies");
  }

  const data = await response.json();

  return data.total_pages;
}

export async function getGenres() {
  const response = await fetch(`${BASE_URL}/genre/movie/list?language=en`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch popular movies");
  }

  const data = await response.json();
  return data.genres;
}

export async function getLanguages() {
  const response = await fetch(`${BASE_URL}/configuration/languages`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch popular movies");
  }

  const data = await response.json();
  data.sort((a, b) => a.english_name.localeCompare(b.english_name)); //ordenando list
  return data;
}

export async function getMoviesByTitle(title, pageNumber) {
  const query = new URLSearchParams();
  query.set("query", title);
  query.set("include_adult", false);
  query.set("language", "en-US");
  query.set("page", pageNumber);
  if (title === null) return getPopularMovies(1);
  const response = await fetch(`${BASE_URL}/search/movie?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch popular movies");
  }

  const data = await response.json();
  return data.results;
}
