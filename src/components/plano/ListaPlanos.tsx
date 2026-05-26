import { useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BadgeCheck,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  HandCoins,
  Headphones,
  ShieldCheck,
  Users,
} from "lucide-react";

import type Plano from "../../models/Plano";
import { buscar } from "../../services/Service";
import { AuthContext } from "../../contexts/AuthContext";
import CardPlano from "./CardPlano";
import ModalPlano from "./ModalPlano";

function ListaPlanos() {
  const planosPadrao: Plano[] = [
    {
      id: 1,
      nome: "Individual",
      descricao: "Proteção financeira para você e para quem você ama.",
      valor: 34.9,
    },
    {
      id: 2,
      nome: "Familiar",
      descricao: "Proteção completa para toda sua família.",
      valor: 79.9,
    },
    {
      id: 3,
      nome: "Acidentes Pessoais",
      descricao: "Mais segurança no dia a dia para imprevistos.",
      valor: 24.9,
    },
    {
      id: 4,
      nome: "Empresarial",
      descricao: "Cuidado e segurança para seus colaboradores e sua empresa.",
      valor: 0,
    },
  ];

  const [planos, setPlanos] = useState<Plano[]>(planosPadrao);
  const [isLoading, setIsLoading] = useState(false);
  const [tipoCobranca, setTipoCobranca] = useState<"mensal" | "anual">("mensal");

  const auth = useContext(AuthContext) as any;
  const usuario = auth?.usuario;

  const token = usuario?.token || usuario?.acesso || "";

  const isAdmin =
    usuario?.role === "admin" ||
    usuario?.role === "ADMIN" ||
    usuario?.role === "ROLE_ADMIN" ||
    usuario?.tipo === "admin" ||
    usuario?.tipo === "ADMIN" ||
    usuario?.admin === true;

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
          const listaPlanos = normalizarPlanos(resposta);

          if (listaPlanos.length > 0) {
            setPlanos(listaPlanos);
          } else {
            setPlanos(planosPadrao);
          }
        },
        tokenFormatado ? header : {}
      );
    } catch (error) {
      console.error("Erro ao buscar planos:", error);
      setPlanos(planosPadrao);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarPlanos();
  }, [token]);

  const planosParaExibir = Array.isArray(planos) ? planos : planosPadrao;

  return (
    <main className="w-full min-h-screen bg-radial-gradient(circle_at_top,_#ffffff_0%,_#f8fbfa_42%,_#f5f8f7_100%) text-[#004346] px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <section className="w-full max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#004346] tracking-tight">
            Nossos planos
          </h1>

          <p className="mt-2 text-sm sm:text-base text-[#5f6d70]">
            Escolha a proteção ideal para você e sua família.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-8 items-start">
          <InfoItem
            icon={<ShieldCheck size={24} />}
            title="Contratação 100% digital"
            text="Rápida, simples e segura."
          />

          <InfoItem
            icon={<Users size={24} />}
            title="Coberturas completas"
            text="Proteção para todas as fases da vida."
          />

          <InfoItem
            icon={<Clock size={24} />}
            title="Assistência 24h"
            text="Suporte quando você mais precisa."
          />

          <InfoItem
            icon={<FileText size={24} />}
            title="Sem burocracia"
            text="Processo fácil e transparente do início ao fim."
          />
        </div>

        <div className="flex justify-center mt-8 px-2">
          <div className="relative flex w-full max-w-300px bg-white border border-[#dbe6e4] rounded-full p-1 shadow-lg overflow-hidden">
            <div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-lineear-to-br from-[#006b6b] to-[#004346] shadow-md transition-all duration-300"
              style={{
                left: tipoCobranca === "mensal" ? "4px" : "50%",
              }}
            />

            <button
              type="button"
              onClick={() => setTipoCobranca("mensal")}
              className={`relative z-10 w-1/2 rounded-full py-2 text-sm font-black transition ${
                tipoCobranca === "mensal"
                  ? "text-white scale-105"
                  : "text-[#00565a]"
              }`}
            >
              Mensal
            </button>

            <button
              type="button"
              onClick={() => setTipoCobranca("anual")}
              className={`relative z-10 w-1/2 rounded-full py-2 text-sm font-black transition ${
                tipoCobranca === "anual"
                  ? "text-white scale-105"
                  : "text-[#00565a]"
              }`}
            >
              Anual{" "}
              <span
                className={
                  tipoCobranca === "anual" ? "text-[#b9ffe0]" : "text-[#00a66a]"
                }
              >
                10% OFF
              </span>
            </button>
          </div>
        </div>

        <p className="text-center mt-2 text-[#5f6d70] text-sm min-h-18px">
          {tipoCobranca === "mensal"
            ? "Pague mensalmente e mantenha sua proteção ativa."
            : "Economize contratando no plano anual."}
        </p>

        {isAdmin && (
          <div className="flex justify-center sm:justify-end mt-7">
            <ModalPlano
              tipo="cadastrar"
              buscarPlanos={buscarPlanos}
              token={token}
            />
          </div>
        )}

        {isLoading && planosParaExibir.length === 0 && (
          <p className="text-center mt-10 text-[#5f6d70]">
            Carregando planos...
          </p>
        )}

        <div
          className={`relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8 items-stretch transition-opacity duration-300 ${
            isLoading ? "opacity-70" : "opacity-100"
          }`}
        >
          {planosParaExibir.map((plano) => (
            <CardPlano
              key={plano.id}
              plano={plano}
              buscarPlanos={buscarPlanos}
              isAdmin={isAdmin}
              token={token}
              tipoCobranca={tipoCobranca}
            />
          ))}
        </div>

        {isLoading && planosParaExibir.length > 0 && (
          <p className="text-center mt-3 text-[#5f6d70] text-sm">
            Atualizando planos...
          </p>
        )}

        <div className="w-full max-w-5xl mx-auto mt-8 bg-linear-to-r from-[#eaf7f4] to-[#f8fcfb] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white text-[#006b6b] flex items-center justify-center shrink-0">
              <Headphones size={25} />
            </div>

            <div>
              <h3 className="text-sm font-black text-[#004346]">
                Precisa de ajuda para escolher?
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-[#5f6d70]">
                Nossa equipe te ajuda a encontrar o plano ideal.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="w-full md:w-auto border-none bg-[#00565a] text-white px-5 py-3 rounded-lg text-sm font-black cursor-pointer whitespace-nowrap shadow-md transition hover:bg-[#004346] hover:-translate-y-1px"
          >
            Falar com especialista
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <InfoItem
            small
            icon={<BadgeCheck size={22} />}
            title="Processo 100% digital"
            text="Contrate online em poucos minutos."
          />

          <InfoItem
            small
            icon={<CreditCard size={22} />}
            title="Pagamento seguro"
            text="Ambiente criptografado."
          />

          <InfoItem
            small
            icon={<CheckCircle size={22} />}
            title="Cancelamento fácil"
            text="Sem complicações."
          />

          <InfoItem
            small
            icon={<HandCoins size={22} />}
            title="Reembolso garantido"
            text="Conforme condições do plano."
          />
        </div>
      </section>
    </main>
  );
}

interface InfoItemProps {
  icon: ReactNode;
  title: string;
  text: string;
  small?: boolean;
}

function InfoItem({ icon, title, text, small = false }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <div
        className={`${
          small ? "w-11 h-11 min-w-11" : "w-12 h-12 min-w-12"
        } rounded-full bg-[#dff3ef] text-[#006b6b] flex items-center justify-center`}
      >
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-black text-[#004346]">{title}</h3>

        <p className="mt-1 text-sm leading-5 text-[#5f6d70]">{text}</p>
      </div>
    </div>
  );
}

export default ListaPlanos;