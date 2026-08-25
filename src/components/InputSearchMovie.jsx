import { Search } from "lucide-react";

function InputSearchMovie({ setTitle, setPageNumber }) {
  /*
  min-h-dvh = “a página nunca será menor que a tela”
  max-w-xl  = “o conteúdo não vai ficar largo demais no desktop”
  w-full    = “no celular, ocupe a largura disponível”  
  */
  return (
    <div className="flex items-center gap-2 w-full max-w-md md:max-w-xl">
      <input
        className="w-full rounded-full  px-4 py-3 bg-slate-950 opacity-50 text-slate-50 outline-none  placeholder:text-slate-50 transition hover:shadow-xl hover:opacity-100 hover: focus:opacity-100"
        type="text"
        onChange={(event) => {
          setTitle(event.target.value);
          setPageNumber(1);
        }}
        placeholder="Search through 300+ movies online"
      />
      <button className="transition hover:opacity-50 hover:cursor-pointer">
        <Search />
      </button>
    </div>
  );
}

export default InputSearchMovie;
