import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import type Plano from "../../models/Plano";
import { atualizar, cadastrar } from "../../services/Service";

interface FormPlanoProps {
  plano?: Plano;
  tipo: "cadastrar" | "editar";
  fecharModal: () => void;
  buscarPlanos: () => void;
  token: string;
}

function FormPlano({
  plano,
  tipo,
  fecharModal,
  buscarPlanos,
  token,
}: FormPlanoProps) {
  const [planoForm, setPlanoForm] = useState<Plano>({
    id: 0,
    nome: "",
    descricao: "",
    valor: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const header = {
    headers: {
      Authorization: token,
  },
};

  useEffect(() => {
    if (tipo === "editar" && plano) {
      setPlanoForm({
        id: plano.id,
        nome: plano.nome,
        descricao: plano.descricao,
        valor: Number(plano.valor),
      });
    }
  }, [plano, tipo]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setPlanoForm({
      ...planoForm,
      [name]: name === "valor" ? Number(value) : value,
    });
  }

  async function salvarPlano(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      alert("Você precisa estar logado como admin para fazer essa ação.");
      return;
    }

    if (!planoForm.nome.trim()) {
      alert("Preencha o nome do plano.");
      return;
    }

    if (!planoForm.descricao.trim()) {
      alert("Preencha a descrição do plano.");
      return;
    }

    if (Number(planoForm.valor) < 0) {
      alert("O valor não pode ser negativo.");
      return;
    }

    try {
      setIsLoading(true);

      if (tipo === "cadastrar") {
        const planoCadastro = {
          nome: planoForm.nome,
          descricao: planoForm.descricao,
          valor: Number(planoForm.valor),
        };

       await cadastrar( "/admin/planos/cadastrar", planoCadastro, setPlanoForm, header )
        alert("Plano cadastrado com sucesso!");
      } else {
        await atualizar( "/admin/planos/atualizar", planoForm, setPlanoForm, header )
        alert("Plano atualizado com sucesso!");
      }

      buscarPlanos();
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar plano:", error);
      alert("Erro ao salvar o plano.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={salvarPlano} className="flex flex-col gap-5">
      <div className="pr-8">
        <h2 className="text-2xl font-black text-[#004346]">
          {tipo === "cadastrar" ? "Cadastrar plano" : "Editar plano"}
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Preencha as informações do plano de seguro de vida.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="nome" className="font-extrabold text-[#004346]">
          Nome do plano
        </label>

        <input
          id="nome"
          name="nome"
          type="text"
          value={planoForm.nome}
          onChange={atualizarEstado}
          placeholder="Ex: Familiar"
          className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#006b6b] focus:ring-4 focus:ring-[#006b6b]/10"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="descricao" className="font-extrabold text-[#004346]">
          Descrição
        </label>

        <textarea
          id="descricao"
          name="descricao"
          value={planoForm.descricao}
          onChange={atualizarEstado}
          placeholder="Ex: Proteção completa para toda sua família."
          rows={5}
          className="resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#006b6b] focus:ring-4 focus:ring-[#006b6b]/10"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="valor" className="font-extrabold text-[#004346]">
          Valor mensal
        </label>

        <input
          id="valor"
          name="valor"
          type="number"
          min="0"
          step="0.01"
          value={planoForm.valor}
          onChange={atualizarEstado}
          placeholder="Ex: 49.90"
          className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#006b6b] focus:ring-4 focus:ring-[#006b6b]/10"
        />
      </div>

      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={fecharModal}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-extrabold text-gray-700 transition hover:bg-gray-100"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-[#ff6b2c] px-4 py-3 font-extrabold text-white transition hover:bg-[#e85c20] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading
            ? "Salvando..."
            : tipo === "cadastrar"
              ? "Cadastrar"
              : "Atualizar"}
        </button>
      </div>
    </form>
  );
}

export default FormPlano;