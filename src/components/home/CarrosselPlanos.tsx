import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Heart,
  Users,
  Briefcase,
  ShieldPlus,
} from "lucide-react";

import type Plano from "../../models/Plano";
import { buscar } from "../../services/Service";
import { AuthContext } from "../../contexts/AuthContext";

function CarrosselPlanos() {
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const carrosselRef = useRef<HTMLDivElement>(null);

  const auth = useContext(AuthContext) as any;
  const usuario = auth?.usuario;

  const token = usuario?.token || usuario?.acesso || "";

  const tokenFormatado = token
    ? token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`
    : "";

  const header = useMemo(() => {
    return {
      headers: {
        Authorization: tokenFormatado,
      },
    };
  }, [tokenFormatado]);

  function normalizarPlanos(resposta: any): Plano[] {
    if (Array.isArray(resposta)) return resposta;
    if (Array.isArray(resposta?.content)) return resposta.content;
    if (Array.isArray(resposta?.data)) return resposta.data;
    if (Array.isArray(resposta?.planos)) return resposta.planos;

    console.error("Resposta de planos não veio como lista:", resposta);
    return [];
  }

  async function buscarPlanos() {
    try {
      setIsLoading(true);

      await buscar(
        "/planos/all",
        (resposta: any) => {
          console.log("PLANOS CARROSSEL:", resposta);

          const listaPlanos = normalizarPlanos(resposta);
          setPlanos(listaPlanos);
        },
        tokenFormatado ? header : {}
      );
    } catch (error) {
      console.error("Erro ao buscar planos:", error);
      setPlanos([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarPlanos();
  }, [token]);

  function scrollEsquerda() {
    carrosselRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  }

  function scrollDireita() {
    carrosselRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  }

  function getIcon(nome: string) {
    const nomeLower = nome?.toLowerCase() || "";

    if (nomeLower.includes("individual")) {
      return <Heart className="h-6 w-6 text-text" />;
    }

    if (nomeLower.includes("familiar")) {
      return <Users className="h-6 w-6 text-text" />;
    }

    if (nomeLower.includes("empresarial")) {
      return <Briefcase className="h-6 w-6 text-text" />;
    }

    return <ShieldPlus className="h-6 w-6 text-text" />;
  }

  return (
    <section className="w-full bg-[#F5F7F6] py-16 font-['Poppins',sans-serif]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mb-10 text-center">
          <h2 className="text-2xl font-bold text-text sm:text-3xl">
            Nossos planos
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Escolha a proteção ideal para você e sua família.
          </p>

          <div className="pointer-events-none absolute top-1/2 hidden w-full -translate-y-1/2 justify-between px-2 md:flex">
            <button
              type="button"
              onClick={scrollEsquerda}
              className="pointer-events-auto cursor-pointer rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={scrollDireita}
              className="pointer-events-auto cursor-pointer rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {isLoading && (
          <p className="mb-6 text-center text-slate-500">
            Carregando planos...
          </p>
        )}

        <div
          ref={carrosselRef}
          className="flex snap-x snap-mandatory gap-5 sm:gap-6 overflow-x-auto px-2 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {planos.map((plano) => (
            <div
              key={plano.id}
              className="group flex h-[280px] w-[290px] sm:w-[300px] shrink-0 snap-start flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div>
                <div className="mb-5 w-fit rounded-2xl bg-[#F5F7F6] p-3">
                  {getIcon(plano.nome)}
                </div>

                <h3 className="mb-2 text-lg font-bold text-text">
                  {plano.nome}
                </h3>

                <p className="line-clamp-3 text-sm leading-relaxed text-slate-500">
                  {plano.descricao}
                </p>
              </div>

              <div className="flex items-end justify-between pt-4">
                <div>
                  {Number(plano.valor) > 0 ? (
                    <>
                      <span className="block text-[10px] text-slate-400">
                        A partir de
                      </span>

                      <span className="text-lg font-bold text-orange-500">
                        R$ {Number(plano.valor).toFixed(2).replace(".", ",")}
                        <span className="text-xs font-normal text-slate-400">
                          /mês
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-semibold text-orange-500">
                      Sob consulta
                    </span>
                  )}
                </div>

                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </div>
          ))}

          {planos.length === 0 && !isLoading && (
            <p className="w-full text-center text-slate-500">
              Nenhum plano encontrado.
            </p>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/planos"
            className="group inline-flex items-center gap-2 border-b-2 border-transparent pb-1 text-sm font-bold text-text transition hover:border-orange-500 hover:text-orange-500"
          >
            <span>Conhecer todos os nossos planos</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default CarrosselPlanos;