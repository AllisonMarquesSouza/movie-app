import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieDetailsPage from "./pages/MovieDetailsPage.jsx";
import ErrorLoadingPage from "./pages/ErrorLoadingPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/detail",
    element: <MovieDetailsPage />,
  },
  {
    path: "/errorPage",
    element: <ErrorLoadingPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
