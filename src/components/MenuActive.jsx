import { CodeXml, Mail } from "lucide-react";
import linkedinSvg from "../assets/linkedin-svgrepo-com.svg";

function MenuActive() {
  return (
    <div id="social-menu" className="flex flex-col gap-2">
      <a
        href="https://github.com/AllisonMarquesSouza/movie-app"
        target="_blank"
        className="flex items-center gap-1 p-2 rounded-full text-slate-50 bg-slate-900 hover:cursor-pointer transition hover:bg-slate-600"
      >
        <CodeXml />
        <span>Source Code</span>
      </a>
      <a
        href="https://www.linkedin.com/in/allison--marques/"
        target="_blank"
        className="flex items-center gap-1 p-2 rounded-full text-slate-50 bg-slate-900 hover:cursor-pointer transition hover:bg-slate-600"
      >
        <img className="w-6" src={linkedinSvg} alt="Linkedin Svg" />
        <span>Linkedin</span>
      </a>
      <a
        href="mailto:allisonmarques@outlook.com.br"
        target="_blank"
        className="flex items-center gap-1 p-2 rounded-full text-slate-50 bg-slate-900 hover:cursor-pointer transition hover:bg-slate-600"
      >
        <Mail />
        <span>Email</span>
      </a>
    </div>
  );
}
export default MenuActive;
