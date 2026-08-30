# Movie App

A React application for searching movies, browsing popular titles, and viewing detailed information using the [TMDB API](https://www.themoviedb.org/).

## Live Demo

[Access the deployed application on Vercel](https://movie-app-alpha-rose-62.vercel.app/).

## Features

- Display popular movies.
- Search movies by title.
- Paginated search results.
- Display movie posters, ratings, and genres.
- Dedicated movie details page.
- Display overview, release date, status, languages, budget, revenue, and production companies.
- Display streaming, purchase, and rental providers with their logos.
- Navigation between the movie list and details page.
- Responsive layout built with Tailwind CSS.

## Technologies

- React
- Vite
- React Router
- Tailwind CSS
- Lucide React
- TMDB API

## Getting Started

### Prerequisites

- Node.js installed.
- A TMDB API access token.

### Installation

Clone the project and install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_TMDB_ACCESS_TOKEN=your_tmdb_token
```

Start the development server:

```bash
npm run dev
```

Then open the URL displayed by Vite in the terminal, usually:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev      # starts the development server
npm run build    # creates the production build
npm run preview  # previews the production build locally
npm run lint     # runs ESLint
```

## Project Structure

```text
src/
├── components/
│   ├── InputSearchMovie.jsx
│   ├── Movie.jsx
│   ├── NextPage.jsx
│   └── OptionGenre.jsx
├── pages/
│   └── MovieDetailsPage.jsx
├── services/
│   └── tmdb.js
├── utils/
│   ├── formatCurrency.js
│   └── formatDate.js
├── App.jsx
├── index.css
└── main.jsx
```

## Routes

| Route                 | Description                          |
| --------------------- | ------------------------------------ |
| `/`                   | Popular movies list and movie search |
| `/detail?id=MOVIE_ID` | Details of a specific movie          |

## Watch Providers

Streaming, purchase, and rental availability data are retrieved from the TMDB watch providers endpoint. The application currently queries providers for the `US` region.

Provider logos are loaded using the `logo_path` returned by the API:

```text
https://image.tmdb.org/t/p/w92{logo_path}
```

## Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

Provider availability data is provided through TMDB’s integration with JustWatch. See the [TMDB attribution requirements](https://developer.themoviedb.org/docs/faq) and the [Watch Providers documentation](https://developer.themoviedb.org/reference/movie-watch-providers).

## Notes

- Never commit the `.env` file to the repository.
- The `.env` file is already included in `.gitignore`.
- Future improvements may include better error handling, genre filters, and further responsive design refinements.
