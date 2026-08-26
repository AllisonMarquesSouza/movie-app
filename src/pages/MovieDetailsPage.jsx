import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMovieDetail, getMovieProviders } from "../services/tmdb";
import { ArrowLeft, LoaderCircle, Star } from "lucide-react";
import formatCurrency from "../utils/formatCurrency";
import formatDate from "../utils/formatDate";
import ErrorLoadingPage from "./ErrorLoadingPage";
import DetailLabel from "../components/DetailLabel";

function MovieDetailsPage() {
  const [movieDetail, setMovieDetail] = useState(null);
  const [streamingProviders, setStreamingProviders] = useState(null);
  const [buyersProviders, setBuyersProviders] = useState(null);
  const [rentProviders, setRentProviders] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;
    async function loadDetail() {
      try {
        setErrorMessage("");
        const detailMovie = await getMovieDetail(id);
        const movieProviders = await getMovieProviders(id);
        setMovieDetail(detailMovie);
        //DEFININDO PROVIDERS
        setStreamingProviders(movieProviders.flatrate || []);
        setBuyersProviders(movieProviders.buy || []);
        setRentProviders(movieProviders.rent || []);
      } catch (err) {
        console.log(err);
        setErrorMessage(err.message);
      }
    }

    loadDetail();
  }, [id]);

  if (!id) {
    return <ErrorLoadingPage errorMessage={"Movie not found"} />;
  }
  if (errorMessage) {
    return <ErrorLoadingPage errorMessage={errorMessage} />;
  }

  if (!movieDetail) {
    return (
      <div className="flex flex-col gap-4 w-full h-dvh bg-[url(../../public/hero-bg.png)] items-center justify-center text-amber-50 text-4xl font-medium font-montserrat">
        <p>Loading page...</p>
        <LoaderCircle className="h-16 w-16 animate-spin "></LoaderCircle>
      </div>
    );
  }

  //Ver se vale a pena criar componentes extras nesse codigo para diminuir o tamanho, mt dificil a leitura.

  return (
    <div className="flex flex-col gap-4 p-4 items-center bg-[url(../../public/hero-bg.png)]  text-slate-50">
      <div className="flex w-full justify-start">
        <button
          onClick={() => navigate(-1)}
          className=" p-3 rounded-md transition  hover:bg-slate-500 hover:cursor-pointer"
        >
          <ArrowLeft />
        </button>
      </div>

      <div>
        <img
          className="rounded-lg hover:bg-slate-50 w-fit"
          src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
          alt={`Poster for ${movieDetail.title}`}
        />
      </div>
      <div className="flex items-center gap-2">
        <Star />
        <p className="text-2xl font-dm-sans">
          {movieDetail.vote_average.toFixed(1)}
        </p>
      </div>
      <h1 className="text-5xl font-bebas-neue">{movieDetail.title}</h1>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-x-6 gap-y-4 font-dm-sans text-2xl md:grid-cols-[max-content_1fr] ">
        {/* flex-wrap define se os itens flexíveis são forçados a ficarem na mesma linha ou se podem ser quebradas em varias linhas. Se o argumento for valido, ele define a direção em que as linhas são empilhadas.*/}
        <DetailLabel>Genres:</DetailLabel>
        <div className="flex flex-wrap gap-2">
          {movieDetail.genres.map((genre) => (
            <span
              className="rounded-md bg-[#221F3D] px-4 py-2 font-semibold"
              key={genre.id}
            >
              {genre.name}
            </span>
          ))}
        </div>

        <DetailLabel>Overview:</DetailLabel>
        <p className="max-w-6xl">{movieDetail.overview}</p>

        <DetailLabel>Release Date:</DetailLabel>
        <p className="text-[#D6C7FF] font-semibold">
          {formatDate(movieDetail.release_date)}
        </p>

        <DetailLabel>Status:</DetailLabel>
        <p className="text-[#D6C7FF] font-semibold">{movieDetail.status}</p>

        <DetailLabel>Language:</DetailLabel>
        <div className="flex flex-wrap gap-2">
          {movieDetail.spoken_languages.map((language) => (
            <span
              className="text-[#D6C7FF] font-semibold"
              key={language.iso_639_1}
            >
              {language.name}
            </span>
          ))}
        </div>

        <DetailLabel>Budget:</DetailLabel>
        <p className="text-[#D6C7FF] font-semibold">
          {formatCurrency(movieDetail.budget)}
        </p>

        <DetailLabel>Revenue:</DetailLabel>
        <p className="text-[#D6C7FF] font-semibold">
          {formatCurrency(movieDetail.revenue)}
        </p>

        <h2 className="text-[#A8B5DB]">
          Production
          <br className="hidden md:block" /> Companies:
        </h2>

        <div className="flex flex-wrap gap-2 text-[#D6C7FF] font-semibold">
          {movieDetail.production_companies.map((company) => (
            <span className="text-[#D6C7FF] font-semibold" key={company.id}>
              {company.name},{" "}
            </span>
          ))}
        </div>

        <h2 className="text-[#A8B5DB]">
          Streaming <br className="hidden md:block" /> Providers:
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {streamingProviders.length > 0 ? (
            streamingProviders.map((provider) => (
              <img
                key={provider.provider_id}
                className="h-12 w-12 rounded-md object-contain"
                src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                alt={provider.provider_name}
                title={provider.provider_name}
              />
            ))
          ) : (
            <span className="text-[#D6C7FF] font-semibold">
              No streaming available
            </span>
          )}
        </div>

        <h2 className="text-[#A8B5DB]">
          Buy <br className="hidden md:block" /> Providers:
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {buyersProviders.length > 0 ? (
            buyersProviders.map((provider) => (
              <img
                key={provider.provider_id}
                className="h-12 w-12 rounded-md object-contain"
                src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                alt={provider.provider_name}
                title={provider.provider_name}
              />
            ))
          ) : (
            <span className="text-[#D6C7FF] font-semibold">
              No buy available
            </span>
          )}
        </div>

        <h2 className="text-[#A8B5DB]">
          Rent <br className="hidden md:block" />
          Providers:
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {rentProviders.length > 0 ? (
            rentProviders.map((provider) => (
              <img
                key={provider.provider_id}
                className="h-12 w-12 rounded-md object-contain"
                src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                alt={provider.provider_name}
                title={provider.provider_name}
              />
            ))
          ) : (
            <span className="text-[#D6C7FF] font-semibold">
              No rent available
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
