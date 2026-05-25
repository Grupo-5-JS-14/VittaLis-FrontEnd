import LinhaApolice from "./LinhaApolice";
import type { ApolicePerfil } from "./tipos";

interface TabelaApolicesProps {
  apolices: ApolicePerfil[];
}

function TabelaApolices({ apolices }: TabelaApolicesProps) {
  return (
    <section className="mt-5 overflow-hidden rounded-md border border-[#dde8e5] bg-white shadow-[0_12px_30px_rgba(0,91,91,0.05)]">
      <div className="hidden grid-cols-[2.4fr_1.45fr_1fr_1fr_1fr_1fr_180px] border-b border-[#e7eeee] px-5 py-4 text-xs font-bold text-[#526865] xl:grid">
        <span>Apólice</span>
        <span className="text-center">Tipo de seguro</span>
        <span className="text-center mr-3">Contratação</span>
        <span className="text-center">Vencimento</span>
        <span className="text-center ml-4">Cobertura</span>
        <span className="text-center ml-8">Status</span>
        <span className="sr-only">Ações</span>
      </div>

      <div className="divide-y divide-[#edf2f0]">
        {apolices.map((apolice) => (
          <LinhaApolice key={apolice.id} apolice={apolice} />
        ))}
      </div>
    </section>
  );
}

export default TabelaApolices;
