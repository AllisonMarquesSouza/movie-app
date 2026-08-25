import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMovieDetail, getMovieProviders } from "../services/tmdb";
import { ArrowLeft, Star } from "lucide-react";
import formatCurrency from "../utils/formatCurrency";
import formatDate from "../utils/formatDate";

function MovieDetailsPage() {
  const [movieDetail, setMovieDetail] = useState(null);
  const [streamingProviders, setStreamingProviders] = useState(null);
  const [buyersProviders, setBuyersProviders] = useState(null);
  const [rentProviders, setRentProviders] = useState(null);

  const navigate = useNavigate(); //put navigate -1, when back to previous page...
  const [searchParams] = useSearchParams(); //to get the params brought by the url (task?title=newTitle)
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;
    async function loadDetail() {
      try {
        const detailMovie = await getMovieDetail(id);
        const movieProviders = await getMovieProviders(id);
        setMovieDetail(detailMovie);
        //DEFININDO PROVIDERS
        setStreamingProviders(movieProviders.flatrate || []);
        setBuyersProviders(movieProviders.buy || []);
        setRentProviders(movieProviders.rent || []);
      } catch (err) {
        console.log(err);
      }
    }

    loadDetail();
  }, [id]);

  if (!id) {
    return <p>ID do filme não encontrado.</p>;
  }

  if (!movieDetail) {
    return <p>Carregando detalhes...</p>;
  }

  //FAZER ESSA PAGINA RESPONSIVA... Titulos, tamanhos ... etc... padding talvez enfim...

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

      {/* flex-wrap oq e , pesquisar... */}

      {/*

      
      md:grid-cols-[max-content_1fr] ->  \
      O que cada parte significamd:: É um prefixo de responsividade. Indica que a regra só será aplicada em telas de tamanho médio (medium) ou superior (telas de tablet para cima, com largura mínima de 768px). Em telas menores, essa regra é ignorada.grid-cols-[...]: É a notação de valor arbitrário do Tailwind para a propriedade CSS grid-template-columns. Permite escrever regras personalizadas de colunas diretamente entre colchetes.max-content: É o valor da primeira coluna. Ele diz que a coluna deve ter exatamente o tamanho necessário para acomodar o seu conteúdo interno, sem quebrar linhas e sem ocupar espaço extra.1fr: É o valor da segunda coluna. A unidade fr significa "fração" (fraction). O 1fr indica que esta coluna vai ocupar todo o restante do espaço livre disponível no contêiner.  
      */}
      <div className="grid w-full max-w-6xl grid-cols-1 gap-x-6 gap-y-4 font-dm-sans text-2xl md:grid-cols-[max-content_1fr] ">
        {/* flex-wrap define se os itens flexíveis são forçados a ficarem na mesma linha ou se podem ser quebradas em varias linhas. Se o argumento for valido, ele define a direção em que as linhas são empilhadas. Nesse caso estou dizendo que
        pode quebrar em varias linhas... Ou seja se tiver mais genres da linha, pode quebrar e jogar na proxima */}
        <h2>Genres:</h2>
        <div className="flex flex-wrap gap-2">
          {movieDetail.genres.map((genre) => (
            <span className="rounded-md bg-[#221F3D] px-4 py-2" key={genre.id}>
              {genre.name}
            </span>
          ))}
        </div>

        <h2>Overview:</h2>
        <p className="max-w-6xl">{movieDetail.overview}</p>

        <h2>Release Date:</h2>
        <p>{formatDate(movieDetail.release_date)}</p>

        <h2>Status:</h2>
        <p>{movieDetail.status}</p>

        <h2>Language:</h2>
        <div className="flex flex-wrap gap-2">
          {movieDetail.spoken_languages.map((language) => (
            <span key={language.iso_639_1}>{language.name}</span>
          ))}
        </div>

        <h2>Budget:</h2>
        <p>{formatCurrency(movieDetail.budget)}</p>

        <h2>Revenue:</h2>
        <p>{formatCurrency(movieDetail.revenue)}</p>

        <h2>
          Production <br /> Companies:
        </h2>
        <div className="flex flex-wrap gap-2">
          {movieDetail.production_companies.map((company) => (
            <span key={company.id}>{company.name}</span>
          ))}
        </div>

        <h2>
          Streaming <br /> Providers:
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
            <span>No streaming available</span>
          )}
        </div>

        <h2>
          Buy <br /> Providers:
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
            <span>No buy available</span>
          )}
        </div>

        <h2>
          Rent <br />
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
            <span>No rent available</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
