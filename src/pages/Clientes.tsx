import { Search, Users, Shield, CreditCard, ArrowLeft, ArrowRight, LogOut, Menu } from "lucide-react";
import { useEffect, useState } from "react";

const apolices = [
  {
    id: 1,
    cliente: "Juliana",
    tipo: "Empresarial",
    valor: 500,
    status: "Ativa",
    data: "10/05/2026",
    vencimento: "10/05/2027"
  },
  {
    id: 2,
    cliente: "Carlos",
    tipo: "Empresarial",
    valor: 1200,
    status: "Pendente",
    data: "05/11/2024",
    vencimento: "05/12/2027"
  },
  {
    id: 3,
    cliente: "Gabriel",
    tipo: "Individual",
    valor: 8500,
    status: "Ativa",
    data: "21/09/2025",
    vencimento: "21/09/2026"
  },
  {
    id: 4,
    cliente: "Gabriel",
    tipo: "Familiar",
    valor: 1500,
    status: "Ativa",
    data: "21/09/2025",
    vencimento: "21/09/2026"
  },
];

export default function Clientes() {
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("Todos");
  const [paginaAtual, setPaginaAtual] = useState(0);

  const usuarios = apolices.reduce((acc, item) => {
    const usuarioExistente = acc.find(
      (usuario) => usuario.nome === item.cliente
    );

    if (usuarioExistente) {
      usuarioExistente.apolices += 1;
      usuarioExistente.valorTotal += item.valor;
      return acc;
    }

    acc.push({
      id: item.id,
      nome: item.cliente,
      status: item.status,
      apolices: 1,
      valorTotal: item.valor,
      ultimoContrato: item.data,
    });

    return acc;
  }, [] as {
    id: number;
    nome: string;
    status: string;
    apolices: number;
    valorTotal: number;
    ultimoContrato: string;
  }[]);

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const buscaOk = usuario.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    const statusOk =
      statusFiltro === "Todos" || usuario.status === statusFiltro;

    return buscaOk && statusOk;
  });

  const registrosPorPagina = 5;

  const totalPaginas = Math.ceil(
    usuariosFiltrados.length / registrosPorPagina
  );

  const usuariosPaginados = usuariosFiltrados.slice(
    paginaAtual * registrosPorPagina,
    paginaAtual * registrosPorPagina + registrosPorPagina
  );

  const totalClientes = usuarios.length;

  const clientesAtivos = usuarios.filter(
    (usuario) => usuario.status === "Ativa"
  ).length;

  const totalApolices = usuarios.reduce(
    (acc, usuario) => acc + usuario.apolices,
    0
  );

  const faturamentoTotal = usuarios.reduce(
    (acc, usuario) => acc + usuario.valorTotal,
    0
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [ativo, setAtivo] = useState<string | null>(null);
  
    useEffect(() => {
  
      if (sidebarOpen) {
  
        setIsVisible(true)
  
        setTimeout(() => {
          setIsAnimating(true)
        }, 20)
  
      } else {
  
        setIsAnimating(false)
  
        setTimeout(() => {
          setIsVisible(false)
        }, 300)
  
      }
  
    }, [sidebarOpen])

  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  return (
    <section className="bg-[#f5f7f7] min-h-screen flex">

    {isVisible && (
      <aside
        className={`
          overflow-hidden flex flex-col justify-between p-6
          transition-all duration-700 h-screen ease-in-out
          will-change-[width,opacity,transform]
          text-white bg-linear-to-b from-[#014d4e] to-[#012d2e]

          ${isAnimating ? "w-67.5 opacity-100" : "w-0 opacity-0 p-0"}
        `}
      >
        <div>
          <div className="mb-15 transition-all duration-500">
            <h1 className="text-3xl font-bold whitespace-nowrap">
              VITTALIS
            </h1>

            <p className="text-zinc-300 text-sm whitespace-nowrap">
              Seguro de Vida
            </p>
          </div>

          <nav className="space-y-1">
            {["Dashboard", "Clientes", "Apólices"].map((item) => (
              <button
                key={item}
                className={`
                  w-full flex items-center gap-5 px-4 py-3 rounded-xl
                  transition-all duration-300 hover:cursor-pointer hover:scale-[1.02]

                  ${
                    item === "Clientes"
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }
                `}
              >
                <div className="min-w-5">
                  <Shield size={18} />
                </div>

                <span className="whitespace-nowrap">
                  {item}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <button
          className="
            bg-orange-500/60 w-full flex items-center gap-3 px-5 py-4
            rounded-xl transition-all duration-300
            hover:bg-orange-500 hover:cursor-pointer
          "
        >
          <LogOut size={18} />
          Sair
        </button>
      </aside>
    )}

    <div className="flex-1 p-8">

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:cursor-pointer"
          >
            <Menu />
          </button>

          <div>
            <h1 className="text-4xl font-bold text-[#014d4e]">
              Usuários
            </h1>

            <p className="text-zinc-500 mt-2">
              Gerencie os clientes cadastrados na plataforma.
            </p>
          </div>
        </div>

        <button className="bg-[#014d4e] text-white px-5 py-3 rounded-xl hover:opacity-90 transition">
          Novo usuário
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <Users className="text-[#014d4e] mb-3" />
          <p className="text-sm text-zinc-500">Total de usuários</p>
          <h2 className="text-3xl font-bold">{totalClientes}</h2>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <Users className="text-emerald-600 mb-3" />
          <p className="text-sm text-zinc-500">Usuários ativos</p>
          <h2 className="text-3xl font-bold">{clientesAtivos}</h2>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <Shield className="text-[#014d4e] mb-3" />
          <p className="text-sm text-zinc-500">Apólices vinculadas</p>
          <h2 className="text-3xl font-bold">{totalApolices}</h2>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-5">
          <CreditCard className="text-orange-500 mb-3" />
          <p className="text-sm text-zinc-500">Valor total</p>
          <h2 className="text-3xl font-bold">
            R$ {faturamentoTotal.toLocaleString("pt-BR")}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 p-6">

        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 border border-zinc-300 rounded-xl px-4 py-3 w-full max-w-md">
            <Search size={18} className="text-zinc-400" />

            <input
              type="text"
              placeholder="Buscar usuário..."
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPaginaAtual(0);
              }}
              className="outline-none w-full"
            />
          </div>

          <select
            value={statusFiltro}
            onChange={(e) => {
              setStatusFiltro(e.target.value);
              setPaginaAtual(0);
            }}
            className="border border-zinc-300 rounded-xl px-4 py-3"
          >
            <option>Todos</option>
            <option>Ativa</option>
            <option>Pendente</option>
            <option>Cancelada</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-zinc-800 border-b">
                <th className="pb-4">ID</th>
                <th className="pb-4">Nome</th>
                <th className="pb-4">Apólices</th>
                <th className="pb-4">Valor total</th>
                <th className="pb-4">Último contrato</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {usuariosPaginados.map((usuario) => (
                <tr key={usuario.id} className="border-b last:border-none">
                  <td className="py-5">{usuario.id}</td>

                  <td className="font-medium text-zinc-800">
                    {usuario.nome}
                  </td>

                  <td>{usuario.apolices}</td>

                  <td>
                    R$ {usuario.valorTotal.toLocaleString("pt-BR")}
                  </td>

                  <td>{usuario.ultimoContrato}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        usuario.status === "Ativa"
                          ? "bg-emerald-100 text-emerald-700"
                          : usuario.status === "Pendente"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {usuario.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPaginas > 1 && (
          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 0))}
              disabled={paginaAtual === 0}
              className="px-4 py-2 rounded-lg border border-zinc-300 disabled:opacity-40 hover:bg-zinc-100"
            >
              <ArrowLeft size={18} />
            </button>

            <span className="text-sm text-zinc-500">
              Página {paginaAtual + 1} de {totalPaginas}
            </span>

            <button
              onClick={() =>
                setPaginaAtual((prev) =>
                  Math.min(prev + 1, totalPaginas - 1)
                )
              }
              disabled={paginaAtual === totalPaginas - 1}
              className="px-4 py-2 rounded-lg border border-zinc-300 disabled:opacity-40 hover:bg-zinc-100"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  </section>
  );
}