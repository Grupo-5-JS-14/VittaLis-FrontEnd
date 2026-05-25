import {
  IconChevronRight as ChevronRight,
  IconShield as Shield,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import type { ApolicePerfil } from "./tipos";

interface LinhaApoliceProps {
  apolice: ApolicePerfil;
}

function LinhaApolice({ apolice }: LinhaApoliceProps) {
  const navigate = useNavigate();
  const statusLabel = apolice.status ? "Ativa" : "Cancelada";
  const statusClass = apolice.status
    ? "bg-[#d8f5de] text-[#16863b]"
    : "bg-[#ffe4c7] text-[#e86b1f]";

  return (
    <article className="p-5">
      <div className="grid gap-4 xl:grid-cols-[2.4fr_1.45fr_1fr_1fr_1fr_1fr_150px] xl:items-center">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#e9f4f2] text-[#12312F]">
            <Shield size={23} />
          </div>
          <div>
            <p className="text-sm font-extrabold text-[#12312F]">
              {apolice.id}
            </p>
            <p className="mt-1 text-xs text-[#647b78]">{apolice.type}</p>
          </div>
        </div>

        <p className="hidden text-center text-sm text-[#526865] xl:block">
          {apolice.type}
        </p>
        <p className="text-sm text-[#526865] xl:text-center">
          <span className="mr-2 font-bold text-[#173c3a] xl:hidden">
            Contratação:
          </span>
          {apolice.hiredAt}
        </p>
        <div className="text-sm xl:text-center">
          <span className="mr-2 font-bold text-[#173c3a] xl:hidden">
            Vencimento:
          </span>
          <span className="text-[#526865]">{apolice.dueAt}</span>
          <p
            className={`mt-1 text-xs font-bold ${
              apolice.overdue ? "text-[#d71920]" : "text-[#16863b]"
            }`}
          >
            {apolice.dueNote}
          </p>
        </div>
        <p className="text-sm text-[#526865] xl:text-center">
          <span className="mr-2 font-bold text-[#12312F] xl:hidden">
            Cobertura:
          </span>
          {apolice.coverage}
        </p>
        <div className="xl:text-center">
          <span className="mr-2 font-bold text-[#12312F] xl:hidden">
            Status:
          </span>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold ${statusClass}`}
          >
            {statusLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/apolices/${apolice.id}`)}
          className="flex h-9 w-full items-center justify-center gap-2 rounded-md border border-[#12312F] px-3 text-xs font-bold text-[#12312F] transition hover:bg-[#eef7f5]"
        >
          Ver detalhes
          <ChevronRight size={15} />
        </button>
      </div>
    </article>
  );
}

export default LinhaApolice;
