import {
  IconChevronDown as ChevronDown,
  IconFilter as Filter,
  IconSearch as Search,
} from "@tabler/icons-react";
import { useState, type Dispatch, type SetStateAction } from "react";

interface FiltrosApolicesProps {
  busca: string;
  setBusca: Dispatch<SetStateAction<string>>;
  tipoSelecionado: string;
  setTipoSelecionado: Dispatch<SetStateAction<string>>;
  statusSelecionado: string;
  setStatusSelecionado: Dispatch<SetStateAction<string>>;
}

function FiltrosApolices({
  busca,
  setBusca,
  tipoSelecionado,
  setTipoSelecionado,
  statusSelecionado,
  setStatusSelecionado,
}: FiltrosApolicesProps) {
  const [tipoAberto, setTipoAberto] = useState(false);
  const [statusAberto, setStatusAberto] = useState(false);

  const tiposSeguro = [
    "Todos",
    "Seguro de Vida Individual",
    "Seguro de Vida Empresarial",
    "Seguro de Vida Familiar",
    "Seguro de Acidentes Pessoais",
  ];

  const statusApolices = ["Todos", "Ativas", "Cancelados"];

  function limparFiltros() {
    setBusca("");
    setTipoSelecionado("Todos");
    setStatusSelecionado("Todos");
    setTipoAberto(false);
    setStatusAberto(false);
  }

  return (
    <div className="mt-6 rounded-md border border-[#dde8e5] bg-white p-4 shadow-[0_12px_30px_rgba(0,91,91,0.05)]">
      <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px_auto]">
        <label className="flex h-11 items-center gap-3 rounded-md border border-[#d9e5e2] px-4 text-sm text-[#647b78]">
          <Search size={18} className="text-[#12312F]" />
          <input
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#8ea09c]"
            placeholder="Buscar por número da apólice ou tipo"
          />
        </label>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setTipoAberto((aberto) => !aberto);
              setStatusAberto(false);
            }}
            className="flex h-11 w-full items-center justify-between rounded-md border border-[#d9e5e2] px-4 text-left"
          >
            <span>
              <span className="block text-xs text-[#647b78]">
                Tipo de seguro
              </span>
              <span className="text-xs font-semibold text-[#173c3a]">
                {tipoSelecionado}
              </span>
            </span>
            <ChevronDown size={16} className="text-[#005b5b]" />
          </button>

          {tipoAberto && (
            <div className="absolute left-0 top-12 z-20 w-full overflow-hidden rounded-md border border-[#d9e5e2] bg-white shadow-[0_12px_28px_rgba(0,91,91,0.14)]">
              {tiposSeguro.map((tipo) => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => {
                    setTipoSelecionado(tipo);
                    setTipoAberto(false);
                  }}
                  className="block w-full px-4 py-3 text-left text-xs font-semibold text-[#173c3a] transition hover:bg-[#eef7f5]"
                >
                  {tipo}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setStatusAberto((aberto) => !aberto);
              setTipoAberto(false);
            }}
            className="flex h-11 w-full items-center justify-between rounded-md border border-[#d9e5e2] px-4 text-left"
          >
            <span>
              <span className="block text-xs text-[#647b78]">Status</span>
              <span className="text-xs font-semibold text-[#173c3a]">
                {statusSelecionado}
              </span>
            </span>
            <ChevronDown size={16} className="text-[#005b5b]" />
          </button>

          {statusAberto && (
            <div className="absolute left-0 top-12 z-20 w-full overflow-hidden rounded-md border border-[#d9e5e2] bg-white shadow-[0_12px_28px_rgba(0,91,91,0.14)]">
              {statusApolices.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    setStatusSelecionado(status);
                    setStatusAberto(false);
                  }}
                  className="block w-full px-4 py-3 text-left text-xs font-semibold text-[#173c3a] transition hover:bg-[#eef7f5]"
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={limparFiltros}
          className="flex h-11 items-center justify-center gap-3 rounded-md border border-[#12312F] px-5 text-sm font-bold text-[#005b5b] transition hover:bg-[#eef7f5]"
        >
          Limpar filtros
          <Filter size={17} />
        </button>
      </div>
    </div>
  );
}

export default FiltrosApolices;
