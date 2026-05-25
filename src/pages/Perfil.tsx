import {
  IconCalendar as CalendarDays,
  IconClipboardList as ClipboardList,
  IconCurrencyReal as CircleDollarSign,
  IconShield as Shield,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import BarraLateral from "../components/perfil/BarraLateral";
import CardAjuda from "../components/perfil/CardAjuda";
import CardsResumo from "../components/perfil/CardsResumo";
import FiltrosApolices from "../components/perfil/FiltrosApolices";
import TabelaApolices from "../components/perfil/TabelaApolices";
import type {
  ApolicePerfil,
  ItemCardResumo,
} from "../components/perfil/tipos";

const cardsResumo: ItemCardResumo[] = [
  {
    label: "Apólices ativas",
    value: "2",
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
    value: "0",
    note: "Nada a vencer",
    icon: CalendarDays,
    tone: "text-[#ff6f2c] bg-[#fff1e9]",
  },
  {
    label: "Valor total de cobertura",
    value: "R$ 300.000,00",
    note: "Em apólices ativas",
    icon: CircleDollarSign,
    tone: "text-[#005b5b] bg-[#e9f4f2]",
    wide: true,
  },
];

const apolices: ApolicePerfil[] = [
  {
    id: "VIT-00012345",
    type: "Seguro de Vida Individual",
    hiredAt: "10/01/2024",
    dueAt: "10/01/2025",
    dueNote: "Faltam 220 dias",
    coverage: "R$ 200.000,00",
    status: true,
    expanded: false,
  },
  {
    id: "VIT-00012346",
    type: "Seguro de Vida Familiar",
    hiredAt: "08/01/2024",
    dueAt: "08/01/2025",
    dueNote: "Faltam 218 dias",
    coverage: "R$ 100.000,00",
    status: true,
  },
  {
    id: "VIT-00009876",
    type: "Seguro de Acidentes Pessoais",
    hiredAt: "15/03/2023",
    dueAt: "15/03/2024",
    dueNote: "Vencida",
    coverage: "R$ 50.000,00",
    status: false,
    overdue: true,
  },
];

function Perfil() {
  const [busca, setBusca] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("Todos");
  const [statusSelecionado, setStatusSelecionado] = useState("Todos");

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
  }, [busca, tipoSelecionado, statusSelecionado]);

  return (
    <div className="min-h-screen bg-[#f8faf9] font-poppins text-[#173c3a]">
      <div className="flex min-h-screen">
        <BarraLateral />

        <main className="flex-1 px-8 pt-8 pb-10">
          <section>
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
