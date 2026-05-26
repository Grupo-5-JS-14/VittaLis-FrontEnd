import { useContext, useState } from "react";
import { cadastrar } from "../../services/Service";
import type Plano from "../../models/Plano";
import ModalPlano from "./ModalPlano";
import { AuthContext } from "../../contexts/AuthContext";

interface CardPlanoProps {
  plano: Plano;
  buscarPlanos: () => void;
  isAdmin: boolean;
  token: string;
  tipoCobranca: "mensal" | "anual";
}

function CardPlano({
  plano,
  buscarPlanos,
  isAdmin,
  tipoCobranca,
}: CardPlanoProps) {
  const auth = useContext(AuthContext) as any;
  const usuario = auth?.usuario;

  const [isLoading, setIsLoading] = useState(false);

  const tokenRaw = usuario?.token || usuario?.acesso || "";

  const tokenFormatado = tokenRaw.startsWith("Bearer ")
    ? tokenRaw
    : `Bearer ${tokenRaw}`;

  const valorMensal = Number(plano.valor || 0);

  const valor =
    tipoCobranca === "anual"
      ? valorMensal * 12 * 0.9
      : valorMensal;

  const valorFormatado = valor.toFixed(2).replace(".", ",");

  const valorMensalEquivalente =
    tipoCobranca === "anual" ? valor / 12 : valorMensal;

  const valorMensalEquivalenteFormatado =
    valorMensalEquivalente.toFixed(2).replace(".", ",");

  async function contratarPlano() {
    if (isLoading) return;

    if (!tokenRaw) {
      alert("Você precisa estar logado para contratar um plano.");
      return;
    }

    if (!usuario?.id) {
      alert("Não foi possível identificar o usuário logado.");
      return;
    }

    if (!plano?.id) {
      alert("Não foi possível identificar o plano selecionado.");
      return;
    }

    try {
      setIsLoading(true);

      const header = {
        headers: {
          Authorization: tokenFormatado,
        },
      };

      const novaApolice = {
      usuario: {
        id: usuario.id,
      },
      plano: {
        id: plano.id,
      },
};

      console.log("USUARIO:", usuario);
      console.log("TOKEN FORMATADO:", tokenFormatado);
      console.log("BODY:", novaApolice);

      await cadastrar(
        "/apolices/cadastrar",
        novaApolice,
        () => {},
        header
      );

      alert("Plano contratado com sucesso!");
    } catch (error: any) {
      console.error("Erro completo:", error.response?.data || error);

      alert(
        error.response?.data?.message ||
          "Erro ao contratar plano."
      );
    } finally {
      setIsLoading(false);
    }
  }

    return (
    <article className="flex h-full min-h-90 w-full flex-col rounded-2xl border border-[#dbe6e4] bg-white p-5 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-1 flex-col">
        <h2 className="min-h-16 text-xl sm:text-2xl font-black text-[#004346] wrap-break-words">
          {plano.nome}
        </h2>

        <p className="mt-3 min-h-24 text-sm sm:text-base leading-relaxed text-gray-600 wrap-break-words">
          {plano.descricao}
        </p>

        <div className="mt-auto pt-6">
          <p className="text-xs font-semibold text-gray-500">
          à partir de:
        </p>

          <div className="mt-1 flex flex-wrap items-end gap-1">
            <span className="text-3xl sm:text-4xl font-black text-[#ff6b2c]">
            R$ {valorFormatado}
          </span>

            <span className="text-sm text-gray-500">
            /{tipoCobranca === "mensal" ? "mês" : "ano"}
          </span>
        </div>

          {tipoCobranca === "anual" && (
            <div className="mt-2 min-h-10">
            <p className="text-sm font-semibold text-green-600">
              10% de desconto no plano anual
            </p>

            <p className="text-sm text-gray-500">
              Equivalente a R$ {valorMensalEquivalenteFormatado}/mês
            </p>
          </div>
        )}
        </div>
      </div>

      {isAdmin ? (
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-auto">
            <ModalPlano
              tipo="editar"
              plano={plano}
              buscarPlanos={buscarPlanos}
              token={tokenRaw}
            />
          </div>

          <div className="w-full sm:w-auto">
            <ModalPlano
              tipo="deletar"
              plano={plano}
              buscarPlanos={buscarPlanos}
              token={tokenRaw}
            />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={contratarPlano}
          disabled={isLoading}
          className="mt-6 w-full cursor-pointer rounded-xl bg-[#004346] px-4 py-3 text-sm sm:text-base font-bold text-white transition hover:bg-[#005f63] disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isLoading ? "Selecionando..." : "Contratar"}
        </button>
      )}
    </article>
);
}

export default CardPlano;
