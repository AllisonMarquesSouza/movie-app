import { useNavigate } from "react-router-dom";

function ErrorLoadingPage({ errorMessage }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-16 justify-center items-center w-full h-dvh bg-[url(../../public/hero-bg.png)] font-medium font-montserrat text-6xl text-slate-50">
      <h1>{errorMessage}</h1>
      <button
        onClick={() => navigate("/")}
        className="p-4  text-3xl bg-sky-800 rounded-md transition hover:bg-sky-600 active:bg-sky-950 "
      >
        Go home
      </button>
    </div>
  );
}

export default ErrorLoadingPage;
