import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import type Plano from "../../models/Plano";
import { deletar } from "../../services/Service";

interface DeletarPlanoProps {
  plano?: Plano;
  fecharModal: () => void;
  buscarPlanos: () => void;
  token: string;
}

function DeletarPlano({
  plano,
  fecharModal,
  buscarPlanos,
  token,
}: DeletarPlanoProps) {

  const [isLoading, setIsLoading] = useState(false);

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  async function deletarPlano() {

    if (!token) {
      alert("Você precisa estar logado como admin para fazer essa ação.");
      return;
    }

    if (!plano?.id) {
      alert("Plano não encontrado.");
      return;
    }

    try {
      setIsLoading(true);

      await deletar(
        `/admin/planos/deletar/${plano.id}`,
        header
      );

      alert("Plano deletado com sucesso!");

      buscarPlanos();
      fecharModal();

    } catch (error) {
      console.error("Erro ao deletar plano:", error);
      alert("Erro ao deletar o plano.");

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">

      <div className="flex items-center gap-4 pr-8">

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertTriangle size={30} />
        </div>

        <div>
          <h2 className="text-2xl font-black text-[#004346]">
            Deletar plano
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Essa ação não poderá ser desfeita.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-[#f8fbfa] p-5">

        <p className="text-sm text-gray-600">
          Você está prestes a deletar:
        </p>

        <h3 className="mt-2 text-xl font-black text-[#004346]">
          {plano?.nome}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {plano?.descricao}
        </p>

        <p className="mt-3 font-black text-[#ff6b2c]">
          {Number(plano?.valor) > 0
            ? `R$ ${Number(plano?.valor || 0)
                .toFixed(2)
                .replace(".", ",")}/mês`
            : "Sob consulta"}
        </p>

      </div>

      <p className="text-gray-700">
        Tem certeza que deseja excluir este plano?
      </p>

      <div className="flex gap-3">

        <button
          type="button"
          onClick={fecharModal}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-extrabold text-gray-700 transition hover:bg-gray-100"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={deletarPlano}
          disabled={isLoading}
          className="w-full rounded-lg bg-red-500 px-4 py-3 font-extrabold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Deletando..." : "Deletar"}
        </button>

      </div>
    </div>
  );
}

export default DeletarPlano;