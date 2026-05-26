import { useState } from "react";
import { createPortal } from "react-dom";

import type Plano from "../../models/Plano";
import DeletarPlano from "./DeletarPlano";
import FormPlano from "./FormPlano";

interface ModalPlanoProps {
  plano?: Plano;
  tipo: "cadastrar" | "editar" | "deletar";
  buscarPlanos: () => void;
  token: string;
}

function ModalPlano({
  plano,
  tipo,
  buscarPlanos,
  token,
}: ModalPlanoProps) {
  const [modalAberto, setModalAberto] = useState(false);

  function abrirModal(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function textoBotao() {
    if (tipo === "cadastrar") return "Cadastrar plano";
    if (tipo === "editar") return "Editar";
    return "Deletar";
  }

  function classeBotao() {
    if (tipo === "cadastrar") {
      return "cursor-pointer rounded-lg bg-[#ff6b2c] px-6 py-3 text-xs font-extrabold text-white shadow transition hover:bg-[#e85c20]";
    }

    if (tipo === "editar") {
      return "w-full cursor-pointer rounded-lg bg-[#00565a] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#004346]";
    }

    return "w-full cursor-pointer rounded-lg bg-red-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-600";
  }

  const modal = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4"
      onClick={fecharModal}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-7 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={fecharModal}
          className="absolute right-5 top-4 z-10 cursor-pointer text-2xl font-black text-gray-400 transition hover:text-gray-700"
        >
          ×
        </button>

        {tipo === "deletar" ? (
          <DeletarPlano
            plano={plano}
            fecharModal={fecharModal}
            buscarPlanos={buscarPlanos}
            token={token}
          />
        ) : (
          <FormPlano
            plano={plano}
            tipo={tipo === "editar" ? "editar" : "cadastrar"}
            fecharModal={fecharModal}
            buscarPlanos={buscarPlanos}
            token={token}
          />
        )}
      </div>
    </div>
  );

  return (
    <>
      <button type="button" onClick={abrirModal} className={classeBotao()}>
        {textoBotao()}
      </button>

      {modalAberto && createPortal(modal, document.body)}
    </>
  );
}

export default ModalPlano;