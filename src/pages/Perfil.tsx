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

  const { usuario } = useContext(AuthContext);

  const header = {
    headers: {
      Authorization: `Bearer ${usuario.token}`,
    },
  };

  async function buscarApolices() {
    try {
      const resposta: any = await buscar(
        `/apolices/all`,
        setApolices,
        header
      );

      const apolicesFormatadas: ApolicePerfil[] = resposta.map(
        (apolice: any) => ({
          id: apolice.id?.toString(),
          type: apolice.plano?.nome || "Plano",
          hiredAt: apolice.dataContratacao || "Sem data",
          dueAt: apolice.dataVencimento || "Sem data",
          dueNote: apolice.ativa ? "Ativa" : "Vencida",
          coverage: `R$ ${Number(apolice.valorCobertura || 0)
            .toFixed(2)
            .replace(".", ",")}`,
          status: apolice.ativa,
          overdue: !apolice.ativa,
        })
      );

      setApolices(apolicesFormatadas);
    } catch (error) {
      console.error("Erro ao buscar apólices:", error);
    }
  }

  useEffect(() => {
    if (usuario.token !== "") {
      buscarApolices();
    }
  }, [usuario]);

  const cardsResumo: ItemCardResumo[] = [
    {
      label: "Apólices ativas",

      value: apolices
        .filter((a) => a.status)
        .length
        .toString(),

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

      value: apolices
        .filter((a) => !a.status)
        .length
        .toString(),

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
          );

          return acc + valor;
        }, 0)
        .toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
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
            <div className="mb-8 flex items-center gap-4 rounded-[28px] border border-[#e5e7eb] bg-white p-5 shadow-sm">
              <img
                src={
                  usuario.foto ||
                  "https://i.pinimg.com/736x/fe/6d/c3/fe6dc31f5d5f3463c9fbd7b4c5c9bca3.jpg"
                }
                alt={usuario.nome}
                className="h-16 w-16 rounded-full object-cover"
              />

              <div>
                <p className="text-sm text-[#647b78]">
                  Bem-vinda de volta,
                </p>

                <h2 className="text-2xl font-semibold text-[#005b5b]">
                  {usuario.nome || "Usuário"}
                </h2>

                <p className="text-sm text-[#647b78]">
                  {usuario.usuario}
                </p>
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

            <TabelaApolices apolices={apolicesFiltradas} />

            <CardAjuda />
          </section>
        </main>
      </div>
    </div>
  );
}

export default Perfil;