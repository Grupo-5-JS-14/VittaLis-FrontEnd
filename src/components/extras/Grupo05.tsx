import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

type Grupo05Props = {
  variante?: "compacto" | "grande";
  isDarkMode?: boolean;
};

export default function Grupo05({ variante = "grande", isDarkMode = true }: Grupo05Props) {
  const integrantes = [
    {
      nome: "Lohanna Benjamim",
      cargo: "Desenvolvedora UX/UI",
      foto: "https://avatars.githubusercontent.com/u/188930169?v=4",
      github: "https://github.com/lohannab",
      linkedin: "https://www.linkedin.com/in/lohannab/",
      instagram: "https://www.instagram.com/lohannabr/"
    },
    {
      nome: "André Lucas",
      cargo: "Desenvolvedor Full Stack",
      foto: "https://avatars.githubusercontent.com/u/197832797?v=4",
      github: "https://github.com/luhdias-png",
      linkedin: "https://www.linkedin.com/in/andre-lucas-dias-lima/",
      instagram: "https://www.instagram.com/luhdias.gif/"
    },
    {
      nome: "Andressa Andrade",
      cargo: "Desenvolvedor Full Stack",
      foto: "https://avatars.githubusercontent.com/u/128521737?v=4",
      github: "https://github.com/Dessxevy",
      linkedin: "https://www.linkedin.com/in/andressa-andrade-dev/",
      instagram: "https://www.instagram.com/dessxevy/"
    },
    {
      nome: "Bruna Zuppini",
      cargo: "Desenvolvedor Full Stack",
      foto: "https://avatars.githubusercontent.com/u/48595147?s=400&u=37fda6b65b1ad54ff3d7d98f6f7662f12df7d2cc&v=4",
      github: "https://github.com/bruzuppini",
      linkedin: "https://www.linkedin.com/in/brunazuppini",
      instagram: "https://instagram.com/bruzuppini"
    },
    {
      nome: "Gabriel Coutinho",
      cargo: "Desenvolvedor Full Stack",
      foto: "https://avatars.githubusercontent.com/u/156151153?v=4",
      github: "https://github.com/gcoutinhoo",
      linkedin: "https://www.linkedin.com/in/gabriel-coutinho-de-souza/",
      instagram: "https://www.instagram.com/g_coutinhoo"
    },
    {
      nome: "Kay Ira do Val",
      cargo: "Desenvolvedor Full Stack",
      foto: "https://avatars.githubusercontent.com/u/260806102?v=4",
      github: "https://github.com/kayanedvlsantos-create",
      linkedin: "https://www.linkedin.com/in/kayane-do-val-lima/",
      instagram: "https://www.instagram.com/ratomanchado/"
    },
    {
      nome: "Douglas Santos",
      cargo: "Desenvolvedor Full Stack",
      foto: "https://avatars.githubusercontent.com/u/99764080?v=4",
      github: "https://github.com/DougSan7",
      linkedin: "https://www.linkedin.com/in/douglas-santos-ds/",
      instagram: "https://www.instagram.com/douglas_san7/"
    }
  ];

  const [index, setIndex] = useState(0);

  function voltar() {
    setIndex((indexAtual) =>
      indexAtual === 0 ? integrantes.length - 1 : indexAtual - 1
    );
  }

  function avancar() {
    setIndex((indexAtual) =>
      indexAtual === integrantes.length - 1 ? 0 : indexAtual + 1
    );
  }

  const pessoa = integrantes[index];
  const compacto = variante === "compacto";

 
  if (compacto) {
    return (
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex items-center gap-2 w-full justify-center">
          
          <button
            onClick={voltar}
            type="button"
            className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#f27825] hover:text-white transition-all cursor-pointer select-none"
          >
            <ChevronLeft size={14} />
          </button>

          <div className="w-full max-w-64 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-2.5 flex items-center gap-3">
            <img
              src={pessoa.foto}
              alt={pessoa.nome}
              className="w-10 h-10 rounded-lg object-cover grayscale hover:grayscale-0 border border-white/10 transition-all"
            />

            <div className="flex flex-col text-left min-w-0 flex-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wide truncate">
                {pessoa.nome}
              </h3>

              <p className="text-[10px] text-[#f27825] font-semibold uppercase tracking-wider truncate">
                {pessoa.cargo}
              </p>

              <div className="flex gap-2.5 mt-1 text-white/50">
                <a href={pessoa.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <GithubLogoIcon size={14} weight="fill" />
                </a>
                <a href={pessoa.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <LinkedinLogoIcon size={14} weight="fill" />
                </a>
                <a href={pessoa.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <InstagramLogoIcon size={14} weight="bold" />
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={avancar}
            type="button"
            className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#f27825] hover:text-white transition-all cursor-pointer select-none"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Indicadores de bolinha minimalistas */}
        <div className="flex gap-1 justify-center">
          {integrantes.map((_, posicao) => (
            <button
              key={posicao}
              type="button"
              onClick={() => setIndex(posicao)}
              className={`w-1 h-1 rounded-full transition-all cursor-pointer ${
                posicao === index ? "bg-[#f27825] w-2.5" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4 sm:gap-8">
        
        {/* Botão Voltar */}
        <button
          onClick={voltar}
          type="button"
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer select-none ${
            isDarkMode 
              ? "bg-transparent border-white/20 text-white hover:bg-white hover:text-[#074334]" 
              : "bg-transparent border-[#074334]/20 text-[#074334] hover:bg-[#074334] hover:text-white"
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Card Grande do Integrante */}
        <div className={`w-72 rounded-2xl overflow-hidden border transition-all shadow-xl ${
          isDarkMode 
            ? "bg-[#053227] border-white/10 shadow-black/20" 
            : "bg-white border-gray-100 shadow-gray-200/50"
        }`}>
          <div className="relative group overflow-hidden h-64">
            <img
              src={pessoa.foto}
              alt={pessoa.nome}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="p-6 flex flex-col items-center text-center">
            <h3 className={`text-lg font-bold font-kare uppercase tracking-wide ${isDarkMode ? "text-white" : "text-[#074334]"}`}>
              {pessoa.nome}
            </h3>

            <p className={`mt-2 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
              isDarkMode 
                ? "bg-white/5 border-white/10 text-[#f27825]" 
                : "bg-gray-50 border-gray-200/60 text-[#074334]"
            }`}>
              {pessoa.cargo}
            </p>

            /* Redes Sociais */
            <div className={`flex gap-5 mt-6 ${isDarkMode ? "text-white/60" : "text-[#074334]/60"}`}>
              <a href={pessoa.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#f27825] transition-transform hover:scale-110">
                <GithubLogoIcon size={22} weight="fill" />
              </a>
              <a href={pessoa.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#f27825] transition-transform hover:scale-110">
                <LinkedinLogoIcon size={22} weight="fill" />
              </a>
              <a href={pessoa.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#f27825] transition-transform hover:scale-110">
                <InstagramLogoIcon size={22} weight="bold" />
              </a>
            </div>
          </div>
        </div>

        {/* Botão Avançar */}
        <button
          onClick={avancar}
          type="button"
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer select-none ${
            isDarkMode 
              ? "bg-transparent border-white/20 text-white hover:bg-white hover:text-[#074334]" 
              : "bg-transparent border-[#074334]/20 text-[#074334] hover:bg-[#074334] hover:text-white"
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Paginação inferior por linhas fluidas */}
      <div className="flex gap-1.5">
        {integrantes.map((_, posicao) => (
          <button
            key={posicao}
            type="button"
            onClick={() => setIndex(posicao)}
            className={`h-1 rounded-full transition-all cursor-pointer ${
              posicao === index 
                ? "bg-[#f27825] w-5" 
                : isDarkMode ? "bg-white/20 w-2" : "bg-[#074334]/20 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}