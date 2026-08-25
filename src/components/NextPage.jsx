import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllPagesPopularMovies } from "../services/tmdb.js";

function NextPage({ pageNumber, setPageNumber }) {
  const [totalPageNumber, setTotalPageNumber] = useState();
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    async function loadPages() {
      try {
        const allPagesPopularMovies = await getAllPagesPopularMovies();
        setTotalPageNumber(allPagesPopularMovies);
      } catch (err) {
        setPageError(err.message);
      }
    }

    loadPages();
  }, []); //vazio roda apenas quando o component aparece na tela

  return (
    <div className="flex w-full justify-between">
      <button
        onClick={() =>
          setPageNumber(pageNumber > 1 ? pageNumber - 1 : pageNumber)
        }
        className=" p-3 rounded-md transition  hover:bg-slate-500 hover:cursor-pointer"
      >
        <ArrowLeft />
      </button>
      <p>
        {pageNumber}
        {" / "}
        {totalPageNumber}
      </p>
      <button
        onClick={() => setPageNumber(pageNumber + 1)}
        className=" p-3 rounded-md transition  hover:bg-slate-500 hover:cursor-pointer"
      >
        <ArrowRight />
      </button>
    </div>
  );
}

export default NextPage;
