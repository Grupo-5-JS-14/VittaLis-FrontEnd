import {
  IconCalendar as CalendarDays,
  IconClipboardList as ClipboardList,
  IconCurrencyReal as CircleDollarSign,
  IconShield as Shield,
} from "@tabler/icons-react";

import { useContext, useEffect, useMemo, useState } from "react";

import BarraLateral from "../components/perfil/BarraLateral";
import CardAjuda from "../components/perfil/CardAjuda";
import CardsResumo from "../components/perfil/CardsResumo";
import FiltrosApolices from "../components/perfil/FiltrosApolices";
import TabelaApolices from "../components/perfil/TabelaApolices";

import { AuthContext } from "../contexts/AuthContext";

import type {
  ApolicePerfil,
  ItemCardResumo,
} from "../components/perfil/tipos";

import { buscar } from "../services/Service";

function Perfil() {
  const [busca, setBusca] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("Todos");
  const [statusSelecionado, setStatusSelecionado] = useState("Todos");
  const [apolices, setApolices] = useState<ApolicePerfil[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { usuario } = useContext(AuthContext);

  const tokenRaw = usuario?.token || usuario?.acesso || "";

  const tokenFormatado = tokenRaw.startsWith("Bearer ")
    ? tokenRaw
    : `Bearer ${tokenRaw}`;

  const header = {
    headers: {
      Authorization: tokenFormatado,
    },
  };

  function formatarData(data: string) {
    if (!data) return "Sem data";

    return new Date(data).toLocaleDateString("pt-BR");
  }

  function formatarValor(valor: number) {
    return Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function verificarStatus(status: any) {
    return status === true || status === "ATIVA" || status === "Ativa";
  }

  async function buscarApolices() {
    if (!tokenRaw) {
      console.log("Token não encontrado no Perfil.");
      return;
    }

    try {
      setIsLoading(true);

      await buscar(
        "/apolices/all",
        (resposta: any[]) => {
          console.log("APÓLICES DO BACK:", resposta);
          console.log("USUÁRIO LOGADO:", usuario);

          const lista = Array.isArray(resposta) ? resposta : [];

          const apolicesDoUsuario = lista.filter((apolice: any) => {
            return apolice.usuario?.id === usuario.id;
          });

          const apolicesFormatadas: ApolicePerfil[] = apolicesDoUsuario.map(
            (apolice: any) => {
              const statusAtivo = verificarStatus(apolice.status);

              return {
                id: `VIT-${String(apolice.id).padStart(8, "0")}`,
                type: apolice.plano?.nome || "Plano contratado",
                hiredAt: formatarData(apolice.dataContratacao),
                dueAt: apolice.dataVencimento
                  ? formatarData(apolice.dataVencimento)
                  : "Em vigência",
                dueNote: statusAtivo ? "Apólice ativa" : "Cancelada",
                coverage: formatarValor(apolice.valorFinal),
                status: statusAtivo,
                overdue: !statusAtivo,
              };
            }
          );

          setApolices(apolicesFormatadas);
        },
        header
      );
    } catch (error: any) {
      console.error("Erro ao buscar apólices:", error.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (tokenRaw) {
      buscarApolices();
    }
  }, [tokenRaw, usuario.id]);

  const cardsResumo: ItemCardResumo[] = [
    {
      label: "Apólices ativas",
      value: apolices.filter((a) => a.status).length.toString(),
      note: "Total contratado",
      icon: Shield,
      tone: "text-[#005b5b] bg-[#e9f4f2]",
    },
    {
      label: "Apólices em análise",
      value: "0",
      note: "Aguardando aprovação",
      icon: ClipboardList,
      tone: "text-[#005b5b] bg-[#e9f4f2]",
    },
    {
      label: "Apólices vencidas",
      value: apolices.filter((a) => !a.status).length.toString(),
      note: "Total vencidas",
      icon: CalendarDays,
      tone: "text-[#ff6f2c] bg-[#fff1e9]",
    },
    {
      label: "Valor total de cobertura",
      value: `R$ ${apolices
        .reduce((acc, apolice) => {
          const valor = Number(
            apolice.coverage
              .replace("R$", "")
              .replace(/\./g, "")
              .replace(",", ".")
              .trim()
          );

          return acc + valor;
        }, 0)
        .toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      note: "Em apólices ativas",
      icon: CircleDollarSign,
      tone: "text-[#005b5b] bg-[#e9f4f2]",
      wide: true,
    },
  ];

  const apolicesFiltradas = useMemo(() => {
    const buscaNormalizada = busca.trim().toLowerCase();

    return apolices.filter((apolice) => {
      const correspondeBusca =
        buscaNormalizada.length === 0 ||
        apolice.id.toLowerCase().includes(buscaNormalizada) ||
        apolice.type.toLowerCase().includes(buscaNormalizada);

      const correspondeTipo =
        tipoSelecionado === "Todos" || apolice.type === tipoSelecionado;

      const correspondeStatus =
        statusSelecionado === "Todos" ||
        (statusSelecionado === "Ativas" && apolice.status) ||
        (statusSelecionado === "Cancelados" && !apolice.status);

      return correspondeBusca && correspondeTipo && correspondeStatus;
    });
  }, [busca, tipoSelecionado, statusSelecionado, apolices]);

  return (
    <div className="min-h-screen bg-[#f8faf9] font-poppins text-[#173c3a]">
      <div className="flex min-h-screen">
        <BarraLateral />

        <main className="flex-1 px-8 pt-8 pb-10">
          <section>
            <div className="mb-8 flex items-center gap-9 rounded-[28px] border border-[#e5e7eb] bg-white p-5 shadow-sm">
              <img
                src={
                  usuario.foto ||
                  "https://i.pinimg.com/736x/fe/6d/c3/fe6dc31f5d5f3463c9fbd7b4c5c9bca3.jpg"
                }
                alt={usuario.nome || "Usuário"}
                className="h-30 w-30 rounded-full object-cover"
              />

              <div>
                <p className="text-sm text-[#647b78]">Bem-vindo de volta,</p>

                <h2 className="text-2xl font-semibold text-[#005b5b]">
                  {usuario.nome || "Usuário"}
                </h2>

                <p className="text-sm text-[#647b78]">{usuario.usuario}</p>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-4xl font-poppins font-semibold text-[#005b5b] md:text-4xl">
                Minhas apólices
              </h1>

              <p className="mt-2 text-sm text-[#647b78]">
                Acompanhe todos os detalhes das suas apólices de seguro.
              </p>
            </div>

            <CardsResumo cards={cardsResumo} />

            <FiltrosApolices
              busca={busca}
              setBusca={setBusca}
              tipoSelecionado={tipoSelecionado}
              setTipoSelecionado={setTipoSelecionado}
              statusSelecionado={statusSelecionado}
              setStatusSelecionado={setStatusSelecionado}
            />

            {isLoading ? (
              <p className="mt-8 text-center text-sm text-[#647b78]">
                Carregando apólices...
              </p>
            ) : (
              <TabelaApolices apolices={apolicesFiltradas} />
            )}

            <CardAjuda />
          </section>
        </main>
      </div>
    </div>
  );
}

export default Perfil;