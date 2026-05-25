import { IconFileDownload as FileDown } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface DetalhesApoliceProps {
  apoliceId: string;
}

function DetalhesApolice({ apoliceId }: DetalhesApoliceProps) {
  const navigate = useNavigate();

  return (
    <div className="mt-5 grid gap-4 rounded-md border border-[#e4ecea] bg-white px-5 py-4 text-xs text-[#526865] md:grid-cols-2 xl:grid-cols-5">
      <div>
        <p className="font-bold text-[#12312F]">Segurado</p>
        <p className="mt-2">Juliana Martins da Silva</p>
        <p>CPF: 123.456.789-10</p>
      </div>
      <div>
        <p className="font-bold text-[#173c3a]">Beneficiários</p>
        <p className="mt-2">3 beneficiários</p>
        <button
          type="button"
          onClick={() => navigate(`/apolices/${apoliceId}/beneficiarios`)}
          className="mt-1 font-bold text-[#12312F]"
        >
          Ver detalhes
        </button>
      </div>
      <div>
        <p className="font-bold text-[#12312F]">Forma de pagamento</p>
        <p className="mt-2">Cartão de crédito</p>
        <p>Mensal</p>
      </div>
      <div>
        <p className="font-bold text-[#12312F]">Próxima cobrança</p>
        <p className="mt-2">10/07/2024</p>
        <p>R$ 49,90</p>
      </div>
      <div>
        <p className="font-bold text-[#12312F]">Documento da apólice</p>
        <button
          type="button"
          onClick={() => navigate(`/apolices/${apoliceId}/documento`)}
          className="mt-2 flex items-center gap-2 font-bold text-[#12312F]"
        >
          <FileDown size={15} />
          Baixar documento
        </button>
        <p className="mt-1">PDF - 1,2 MB</p>
      </div>
    </div>
  );
}

export default DetalhesApolice;
