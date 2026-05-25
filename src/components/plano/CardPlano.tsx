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
    <article className="flex flex-col justify-between rounded-2xl border border-[#dbe6e4] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div>
        <h2 className="text-2xl font-black text-[#004346]">
          {plano.nome}
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          {plano.descricao}
        </p>

        <div className="mt-6">
          <span className="text-4xl font-black text-[#ff6b2c]">
            R$ {valorFormatado}
          </span>

          <span className="ml-1 text-sm text-gray-500">
            /{tipoCobranca === "mensal" ? "mês" : "ano"}
          </span>
        </div>

        {tipoCobranca === "anual" && (
          <div className="mt-2">
            <p className="text-sm font-semibold text-green-600">
              10% de desconto no plano anual
            </p>

            <p className="text-sm text-gray-500">
              Equivalente a R$ {valorMensalEquivalenteFormatado}/mês
            </p>
          </div>
        )}
      </div>

      {isAdmin ? (
        <div className="mt-6 flex gap-3">
          <ModalPlano
            tipo="editar"
            plano={plano}
            buscarPlanos={buscarPlanos}
            token={tokenRaw}
          />

          <ModalPlano
            tipo="deletar"
            plano={plano}
            buscarPlanos={buscarPlanos}
            token={tokenRaw}
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={contratarPlano}
          disabled={isLoading}
          className="mt-6 w-full cursor-pointer rounded-xl bg-[#004346] px-4 py-3 font-bold text-white transition hover:bg-[#005f63] disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isLoading ? "Selecionando..." : "Contratar"}
        </button>
      )}
    </article>
  );
}

export default CardPlano;