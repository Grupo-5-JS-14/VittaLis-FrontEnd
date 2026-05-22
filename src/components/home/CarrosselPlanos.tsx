import { useRef } from "react";
import {
  Heart,
  Users,
  ShieldPlus,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const segurosVittalis = [
  {
    id: 1,
    icon: <Heart className="h-6 w-6 text-[#12312F]" />,
    title: "Seguro de Vida Individual",
    description: "Proteção financeira para você e para quem você ama.",
    price: "R$ 24,90",
    isCustom: false,
  },
  {
    id: 2,
    icon: <Users className="h-6 w-6 text-[#12312F]" />,
    title: "Seguro de Vida Familiar",
    description: "Proteção completa para toda a sua família.",
    price: "R$ 49,90",
    isCustom: false,
  },
  {
    id: 3,
    icon: <ShieldPlus className="h-6 w-6 text-[#12312F]" />,
    title: "Seguro de Acidentes Pessoais",
    description: "Mais segurança no dia a dia para imprevistos.",
    price: "R$ 19,90",
    isCustom: false,
  },
  {
    id: 4,
    icon: <Briefcase className="h-6 w-6 text-[#12312F]" />,
    title: "Seguro de Vida Empresarial",
    description: "Cuidado e segurança para seus colaboradores e sua empresa.",
    price: "",
    isCustom: true,
  },
];

export default function CarrosselPlanos() {
  const carrosselRef = useRef<HTMLDivElement>(null);

  const scrollEsquerda = () => {
    if (carrosselRef.current) {
      carrosselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollDireita = () => {
    if (carrosselRef.current) {
      carrosselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 w-full bg-[#F5F7F6] font-['Poppins',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título Centralizado*/}
        <div className="text-center mb-10 relative">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#12312F]">
            Nossos seguros
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Escolha a proteção ideal para você e sua família.
          </p>

          {/* Setas de navegação para Desktop */}
          <div className="hidden md:flex justify-between w-full absolute top-1/2 -translate-y-1/2 px-2 pointer-events-none">
            <button
              onClick={scrollEsquerda}
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 shadow-xs hover:bg-slate-50 pointer-events-auto transition-all cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollDireita}
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 shadow-xs hover:bg-slate-50 pointer-events-auto transition-all cursor-pointer"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Listagem com Scroll em Linha (Esconde a barra de rolagem cinza de forma nativa) */}
        <div
          ref={carrosselRef}
          className="flex gap-6 overflow-x-auto pb-6 px-2 snap-x snap-mandatory touch-pan-x scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {segurosVittalis.map((plano) => (
            <div
              key={plano.id}
              className="w-70 sm:w-75 shrink-0 snap-start bg-white rounded-2xl p-6 border border-slate-100 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col h-70 justify-between group"
            >
              {/* Topo do Card - Ícone e Textos */}
              <div>
                <div className="p-3 bg-[#F5F7F6] rounded-2xl w-fit mb-5">
                  {plano.icon}
                </div>
                <h3 className="text-base font-bold text-[#12312F] mb-1.5">
                  {plano.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {plano.description}
                </p>
              </div>

              {/* Rodapé do Card - Preço e Seta indicativa */}
              <div className="flex items-end justify-between pt-4">
                <div>
                  {plano.isCustom ? (
                    <span className="text-sm font-semibold text-orange-500">
                      Sob consulta
                    </span>
                  ) : (
                    <>
                      <span className="text-[10px] text-slate-400 block">
                        A partir de
                      </span>
                      <span className="text-sm font-bold text-orange-500">
                        {plano.price}
                        <span className="text-[11px] font-normal text-slate-400">
                          /mês
                        </span>
                      </span>
                    </>
                  )}
                </div>

                {/* Flecha minimalista cinza*/}
                <div className="text-slate-400 group-hover:translate-x-1 transition-transform duration-200">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link / Botão de Ação no rodapé do carrossel direcionando para /planos */}
        <div className="mt-10 flex justify-center">
          <a
            href="/planos"
            className="inline-flex items-center space-x-2 text-sm font-bold text-[#12312F] hover:text-orange-500 transition-colors border-b-2 border-transparent hover:border-orange-500 pb-1 group"
          >
            <span>Conhecer todos os nossos planos</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
