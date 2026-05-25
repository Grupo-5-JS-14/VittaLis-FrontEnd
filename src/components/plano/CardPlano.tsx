import type Plano from "../../models/Plano";
import ModalPlano from "./ModalPlano";

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
  token,
  tipoCobranca,
}: CardPlanoProps) {
  const valorMensal = Number(plano.valor);

  const valor =
    tipoCobranca === "anual"
      ? valorMensal * 12 * 0.9
      : valorMensal;

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
            R$ {valor.toFixed(2).replace(".", ",")}
          </span>

          <span className="ml-1 text-sm text-gray-500">
            /{tipoCobranca === "mensal" ? "mês" : "ano"}
          </span>
        </div>
      </div>

      {isAdmin && (
        <div className="mt-6 flex gap-3">
          <ModalPlano
            tipo="editar"
            plano={plano}
            buscarPlanos={buscarPlanos}
            token={token}
          />

          <ModalPlano
            tipo="deletar"
            plano={plano}
            buscarPlanos={buscarPlanos}
            token={token}
          />
        </div>
      )}
    </article>
  );
}

export default CardPlano;