import { Bell, Shield, FileText, CreditCard, Users, LogOut, Menu, TrendingUp, TrendingDown, } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, Line, Tooltip, CartesianGrid, XAxis, YAxis, BarChart, Bar, Legend, } from "recharts";
import type Apolice from "../models/Apolice";
import { AuthContext } from "../contexts/AuthContext";
import { buscar } from "../services/Service";


const data = new Date();

const dataDiara = data.toLocaleDateString("pt-BR");

// BUSCADOR DE DATA


function converterData(data: string) {
  return new Date(data)
}


function formatarInputDate(data: Date) {
  return data.toISOString().split("T")[0];
}


function StatsCard({ title, value, percentage, positive = true, icon, }: any) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-700 text-sm">{title}</p>

          <h2 className="text-3xl font-bold text-zinc-800 mt-2">
            {value}
          </h2>

          <div
            className={`flex items-center gap-1 mt-3 text-sm ${positive ? "text-emerald-600" : "text-red-600"
              }`}
          >
            {positive ? (
              <TrendingUp size={25} />
            ) : (
              <TrendingDown size={25} />
            )}

            {percentage}
          </div>
        </div>

        <div className="bg-zinc-100 p-3 rounded-xl text-[#014d4e]">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {

const [apolices, setApolices] = useState<Apolice[]>([])

const { usuario } = useContext(AuthContext)

async function buscarApolices() {

  try {

    const tokenRaw = usuario?.token || ""

    const tokenFormatado = tokenRaw.startsWith("Bearer ")
      ? tokenRaw
      : `Bearer ${tokenRaw}`

await buscar("/admin/apolices", (dados: Apolice[]) => {
  
  setApolices(dados)
}, {
  headers: {
    Authorization: tokenFormatado
  }
})

  } catch (error) {

    console.log("ERRO:", error)

  }
}

useEffect(() => {
  if (usuario.token) {
    buscarApolices()
  }
}, [usuario.token])

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



// ==============================
// DATAS
// ==============================

const hoje = new Date()

const datasConvertidas = apolices
  .map(item => converterData(item.dataContratacao))
  .filter(data => !isNaN(data.getTime()))

const menorData = datasConvertidas.length > 0
  ? new Date(Math.min(...datasConvertidas.map(data => data.getTime())))
  : hoje

const maiorData = datasConvertidas.length > 0
  ? new Date(Math.max(...datasConvertidas.map(data => data.getTime())))
  : hoje

// ==============================
// STATES DAS DATAS
// ==============================

const [dataInicial, setDataInicial] = useState(
  formatarInputDate(menorData)
)

const [dataFinal, setDataFinal] = useState(
  formatarInputDate(maiorData)
)

// ==============================
// FILTRO DAS APÓLICES
// ==============================

const apolicesFiltradas = apolices.filter((item) => {

  if (!dataInicial || !dataFinal) {
    return true
  }

  const dataItem = converterData(item.dataContratacao)

  return (
    dataItem >= new Date(dataInicial) &&
    dataItem <= new Date(dataFinal)
  )

})

// ==============================
// CÁLCULOS
// ==============================

const totalGeral = apolicesFiltradas.reduce(
  (acc, item) => acc + Number(item.valorFinal || 0),
  0
)

const clientesAtivos = apolicesFiltradas.filter(
  item => item.status
)

const clientesInativos = apolicesFiltradas.filter(
  item => !item.status
)
const valorInativos = clientesInativos.reduce(
  (acc, item) => acc + Number(item.valorFinal || 0),
  0
)

  const valorAtivos = totalGeral - valorInativos

  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

const lineData = meses.map((mes, index) => ({
  month: mes,

  apolices: apolicesFiltradas.filter(
    item => new Date(item.dataContratacao).getMonth() === index
  ).length,

  Valor: apolicesFiltradas
    .filter(item => new Date(item.dataContratacao).getMonth() === index)
    .reduce((acc, item) => acc + Number(item.valorFinal || 0), 0)
}))

  const tipos = [...new Set(apolices.map(item => item.plano?.nome).filter(Boolean))] as string[];

const pieData = meses.map((mes, index) => {

  const apoliceMes = apolicesFiltradas.filter(
    item => new Date(item.dataContratacao).getMonth() === index
  )

  const data: Record<string, number | string> = {
    month: mes
  }

  tipos.forEach((tipo) => {

    data[tipo] = apoliceMes
      .filter(item => item.plano?.nome === tipo)
      .reduce(
        (acc, item) => acc + Number(item.valorFinal || 0),
        0
      )

  })

  return data

})


useEffect(() => {
  if (apolices.length > 0) {
    setDataInicial(formatarInputDate(menorData))
    setDataFinal(formatarInputDate(maiorData))
  }
}, [apolices])
  // =====================================================================================================================

  function calcularVariacao(valorAtual: number, valorAnterior: number) {
    if (valorAnterior === 0) {
      return valorAtual > 0 ? 100 : 0;
    }

    return ((valorAtual - valorAnterior) / valorAnterior) * 100;
  }


  function calcularPeriodoAnterior(dataInicial: string, dataFinal: string) {
    const inicioAtual = new Date(dataInicial);
    const fimAtual = new Date(dataFinal);

    const diferencaDias =
      (fimAtual.getTime() - inicioAtual.getTime()) / (1000 * 60 * 60 * 24);

    const fimAnterior = new Date(inicioAtual);
    fimAnterior.setDate(fimAnterior.getDate() - 1);

    const inicioAnterior = new Date(fimAnterior);
    inicioAnterior.setDate(inicioAnterior.getDate() - diferencaDias);

    return {
      inicioAnterior,
      fimAnterior
    };
  }

  const { inicioAnterior, fimAnterior } = calcularPeriodoAnterior(
    dataInicial,
    dataFinal
  );

  const apolicesPeriodoAnterior = apolices.filter((item) => {
    const dataItem = converterData(item.dataContratacao);

    return (
      dataItem >= inicioAnterior &&
      dataItem <= fimAnterior
    );
  });

  const percentualClientes = calcularVariacao(
    apolicesFiltradas.length,
    apolicesPeriodoAnterior.length
  );

  // ===========================================================================================================================

  const [paginaAtual, setPaginaAtual] = useState(0);
  const [modoExpandido, setModoExpandido] = useState(false);


  const registrosPorPagina = modoExpandido ? 5 : 2;

  const apolicesOrdenadas = [...apolicesFiltradas].sort((a, b) => {
    return converterData(b.dataContratacao).getTime() - converterData(a.dataContratacao).getTime();
  });

  const totalPaginas = Math.ceil(apolicesOrdenadas.length / registrosPorPagina);

  const apolicesPaginadas = apolicesOrdenadas.slice(
    paginaAtual * registrosPorPagina,
    paginaAtual * registrosPorPagina + registrosPorPagina
  );

  return (
    <div className="min-h-screen bg-[#f5f7f7] flex">
      {/* SIDEBAR */}

      {isVisible && (

        <aside
          className={`overflow-hidden p-6 transition-all duration-700 ease-in-out will-change-[width,opacity,transform] text-white bg-linear-to-b from-[#014d4e] to-[#012d2e]
      ${isAnimating ? "w-67.5 opacity-100" : "w-0 opacity-0"}`}>
          <div>

            {/* LOGO */}

            <div
              className={`mb-15 transition-all duration-500`}>
              <h1 className="text-3xl font-bold whitespace-nowrap">
                VITTALIS
              </h1>
              <p className="text-zinc-300 text-sm whitespace-nowrap">
                Seguro de Vida
              </p>

            </div>

            {/* NAV */}

            <nav className="space-y-1">

              {[
                "Dashboard",
                "Clientes",
                "Apólices",
              ].map((item) => (

                <button key={item} className={`w-full flex items-center gap-5 px-4 py-3 rounded-xl transition-all duration-300 
          hover:cursor-pointer hover:scale-[1.02]
          ${item === "Dashboard"
                    ? "bg-white/10"
                    : "hover:bg-white/5"
                  }
            `}>

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
          <div>
            <button className="mt-25 bg-orange-500/60 w-full flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300
          hover:bg-orange-500 hover: cursor-pointer">
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </aside>
      )}

      {/* CONTENT */}

      <main className="flex-1">
        {/* TOPBAR */}

        <header className="h-20 bg-white border-b border-zinc-200 px-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hover:cursor-pointer">
              <Menu />
            </button>
            <h2 className="text-2xl font-semibold text-zinc-700">
              Painel administrativo
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <Bell className="text-zinc-500" />

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#d8ece7] flex items-center justify-center font-bold text-[#014d4e]">
                AL
              </div>

              <div>
                <p className="font-semibold text-zinc-800">Admin</p>
                <p className="text-sm text-zinc-500">
                  Administrador
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* BODY */}

        <section className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#014d4e]">
                Olá, Admin!
              </h1>

              <p className="text-zinc-500 mt-2">
                Bem-vindo ao painel administrativo da Vittalis. - {dataDiara}
              </p>
            </div>

            <div className="flex gap-4">

              <input
                type="date"
                value={dataInicial}
                onChange={(e) => setDataInicial(e.target.value)}
                className="border border-zinc-300 px-4 py-2 rounded-xl"
              />

              <input
                type="date"
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
                className="border border-zinc-300 px-4 py-2 rounded-xl"
              />

            </div>
          </div>

          {/* CARDS */}

          <div className="grid grid-cols-4 gap-5 mb-6">
            <StatsCard title="Registro de Clientes" value={apolicesFiltradas.length} percentage={`${percentualClientes.toFixed(1)}`} positive={percentualClientes >= 0} icon={<Users />} />

            <StatsCard title="Apólices ativas" value={clientesAtivos.length} percentage={`${percentualClientes.toFixed(1)}`} positive={percentualClientes >= 0} icon={<Shield />} />

            <StatsCard title="Apólices pendentes" value={clientesInativos.length} percentage={`${percentualClientes.toFixed(1)}`} positive={percentualClientes >= 0} icon={<FileText />} />

            <StatsCard title="Faturamento" value={valorAtivos.toLocaleString("pt-BR",{style:"currency", currency:"BRL"})} percentage={`${percentualClientes.toFixed(2)}`} positive={percentualClientes >= 0} icon={<CreditCard />} />
          </div>

          {/* GRÁFICOS */}

          <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-5 mb-9">

            {/* VISÃO GERAL */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col min-w-0">

              {/* HEADER */}
              <div className="flex items-center justify-between mb-8">

                <h2 className="text-3xl font-semibold text-zinc-800">
                  Visão geral
                </h2>

              </div>

              {/* CHART */}
              <div className="h-90 w-full">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart data={lineData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barGap={6} barCategoryGap="18%">

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" tickMargin={10} />

                    <YAxis yAxisId="left" />

                    <YAxis yAxisId="right" orientation="right" />

                    <Tooltip formatter={(value, name) => { 
                          if (name === "Valor") {
                            return [
                              Number(value).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                              }),
                              "Valor"
                            ]
                          }

                          return [value, name]
                        }}/>
                    <Legend />

                    <Bar yAxisId="left" dataKey="apolices" fill="#014d4e" radius={[8, 8, 0, 0]} barSize={18} />

                    <Bar yAxisId="right" dataKey="Valor" fill="#ff8a3d" radius={[8, 8, 0, 0]} barSize={18} />

                  </BarChart>

                </ResponsiveContainer>

              </div>
            </div>

            {/* DISTRIBUIÇÃO */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-7 flex flex-col min-w-0">

              {/* HEADER */}
              <div className="mb-9">

                <h2 className="text-2xl font-semibold text-zinc-800">
                  Distribuição
                </h2>

              </div>

              {/* CHART */}
              <div className="h-70 w-full mb-1">

                <ResponsiveContainer width="100%" height="100%">

                  <LineChart data={pieData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" tickMargin={8} />

                    <YAxis />

                    <Tooltip />



                    {tipos.map((tipo, index) => (

                      <Line
                        key={tipo}
                        type="monotone"
                        dataKey={tipo}
                        stroke={[
                          "#014d4e",
                          "#2c8c7b",
                          "#3962e6",
                          "#e63939"
                        ][index]}
                        strokeWidth={3}
                        dot={{ r: 2 }}
                        activeDot={{ r: 5 }}

                        opacity={
                          ativo === null ? 1 : ativo === tipo ? 1 : 0.2
                        }

                        style={{ transition: "all 0.2s ease" }}
                      />

                    ))}

                  </LineChart>

                </ResponsiveContainer>

              </div>

              {/* LEGENDA */}
              <div className="space-y-2 mt-2 p-10">

                {tipos.map((tipo, index) => (

                  <div
                    key={tipo}
                    className="flex items-center justify-between"
                  >

                    <div onClick={() => setAtivo(ativo === tipo ? null : tipo)} className={`flex items-center gap-3 hover: cursor-pointer transition-opacity ${ativo === null ? "opacity-100" : ativo === tipo ? "opacity-100" : "opacity-40"}`}>

                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          background: [
                            "#014d4e",
                            "#2c8c7b",
                            "#3962e6",
                            "#e63939"
                          ][index]
                        }}
                      />

                      <span className="text-sm text-zinc-600">
                        {tipo}
                      </span>

                    </div>

                    <span className="font-semibold text-zinc-800">
                        {(() => {
                          const totalPorTipo = apolicesFiltradas
                            .filter(item => item.plano?.nome === tipo)
                            .reduce((acc, item) => acc + Number(item.valorFinal || 0), 0)

                          const percentual = totalGeral > 0
                            ? (totalPorTipo / totalGeral) * 100
                            : 0

                          return percentual.toFixed(1)
                        })()} %
                      </span>

                  </div>

                ))}

              </div>

            </div>

          </div>
          {/* TABLE */}

          <div className="bg-white rounded-2xl border border-zinc-200 p-6">
            <div className="flex items-center justify-between mb-9">
              <h2 className="text-xl font-semibold">
                Apólices recentes
              </h2>

              <button onClick={() => { setModoExpandido(!modoExpandido); setPaginaAtual(0) }} className="text-[#014d4e] border border-zinc-300 rounded-2xl px-4 py-2 font-semibold hover:cursor-pointer hover:bg-zinc-300/50">
                {modoExpandido ? "Mostrar menos" : "Mostrar mais"}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-zinc-800 border-b">
                    <th className="pb-4">N° Apólice</th>
                    <th className="pb-4">Cliente</th>
                    <th className="pb-4">Tipo</th>
                    <th className="pb-4">Data</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {apolicesPaginadas.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b last:border-none"
                    >
                      <td className="py-5">{item.id}</td>

                      <td>{item.usuario?.nome ?? "Não informado"}</td>

                      <td>{item.plano?.nome ?? "Não informado"} </td>

                      <td>{new Date(item.dataContratacao).toLocaleDateString("pt-BR")}</td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-sm
                          ${item.status
                              ? "bg-emerald-700/80 text-emerald-700"
                              : "bg-red-700/80 text-orange-700"
                            }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {modoExpandido && totalPaginas > 1 && (
                <div className="flex items-center justify-end gap-3 mt-6">
                  <button
                    onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 0))}
                    disabled={paginaAtual === 0}
                    className="px-4 py-2 rounded-lg border border-zinc-300 disabled:opacity-40 hover:cursor-pointer hover:bg-zinc-300/50"
                  >
                    {"<"}
                  </button>

                  <span className="text-sm text-zinc-500">
                    Página {paginaAtual + 1} de {totalPaginas}
                  </span>

                  <button
                    onClick={() =>
                      setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas - 1))
                    }
                    disabled={paginaAtual === totalPaginas - 1}
                    className="px-4 py-2 rounded-lg border border-zinc-300 disabled:opacity-40 hover:cursor-pointer hover:bg-zinc-300/50"
                  >
                    {">"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}