import { Bell, User, Shield, FileText, CreditCard, Users, HeartPulse, Settings, LogOut, Menu, TrendingUp, TrendingDown, } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Tooltip, CartesianGrid, XAxis, YAxis, BarChart, Bar, Legend, } from "recharts";

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
  {
    id: 5,
    cliente: "Kay",
    tipo: "Acidentes",
    valor: 7000,
    status: "Ativa",
    data: "01/02/2026",
    vencimento: "01-03-2026"
  },
  {
    id: 6,
    cliente: "Douglas",
    tipo: "Familiar",
    valor: 5000,
    status: "Cancelada",
    data: "01/02/2026",
    vencimento: "01-03-2026"
  }
];

const totalGeral = apolices.reduce(
  (acc, item) => acc + item.valor,
  0
);

const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

const lineData = meses.map((mes, index) => ({
  month: mes,
  apolices: apolices.filter(item => Number(item.data.split("/")[1]) - 1 === index).length,
  novas: apolices
    .filter(item => Number(item.data.split("/")[1]) - 1 === index)
    .reduce((acc, item) => acc + item.valor, 0)
}));

const tipos = [...new Set(apolices.map(item => item.tipo))];

const pieData = meses.map((mes, index) => {
  const apoliceMes = apolices.filter(item => Number(item.data.split("/")[1]) - 1 === index);

  const data = {
    month: mes
  };

  tipos.forEach(tipo => {

    data[tipo] = apoliceMes.filter(item => item.tipo === tipo).reduce((acc, item) => acc + item.valor, 0);
  })

  return data;

});

const clientesAtivos = apolices.filter(
  item => item.status === "Ativa"
);

const clientesInativos = apolices.filter(
  item => item.status !== "Ativa"
);

const valorInativos = clientesInativos.reduce((acc, item) => acc + item.valor, 0)

const valorAtivos = totalGeral - valorInativos


const data = new Date();

const dataDiara = data.toLocaleDateString("pt-BR");

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
  return (
    <div className="min-h-screen bg-[#f5f7f7] flex">
      {/* SIDEBAR */}

      <aside className="w-[270px] bg-gradient-to-b from-[#014d4e] to-[#012d2e] text-white flex flex-col justify-between p-5">
        <div>
          <div className="mb-10">
            <h1 className="text-3xl font-bold">VITTALIS</h1>
            <p className="text-zinc-300 text-sm">Seguro de Vida</p>
          </div>

          <nav className="space-y-2">
            {[
              "Dashboard",
              "Clientes",
              "Apólices",
            ].map((item) => (
              <button
                key={item}
                className={`w-full flex items-center gap-5 px-4 py-3 rounded-xl transition-all hover: cursor-pointer
                ${item === "Dashboard"
                    ? "bg-white/10"
                    : "hover:bg-white/5"
                  }`}
              >
                <div className="w-5 h-5">
                  <Shield size={18} />
                </div>

                {item}
              </button>
            ))}
          </nav>
        </div>

        <div>

          <button className="flex items-center gap-2 text-zinc-300 hover:text-white">
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* CONTENT */}

      <main className="flex-1">
        {/* TOPBAR */}

        <header className="h-20 bg-white border-b border-zinc-200 px-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Menu />

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
              <button className="border border-zinc-300 px-5 py-3 rounded-xl bg-white">
                01/05/2024 - 31/05/2024
              </button>

              <button className="bg-[#014d4e] text-white px-5 py-3 rounded-xl hover:opacity-90 transition">
                Exportar relatório
              </button>
            </div>
          </div>

          {/* CARDS */}

          <div className="grid grid-cols-4 gap-5 mb-6">
            <StatsCard title="Clientes ativos" value={apolices.length} percentage="8,2%" positive icon={<Users />} />

            <StatsCard title="Apólices ativas" value={clientesAtivos.length} percentage="7,5%" positive icon={<Shield />} />

            <StatsCard title="Propostas pendentes" value={clientesInativos.length} percentage="5,1%" positive icon={<FileText />} />

            <StatsCard title="Faturamento" value={valorAtivos} percentage="12,3%" positive icon={<CreditCard />} />
          </div>

          {/* GRÁFICOS */}

          <div className="grid grid-cols-1 xl:grid-cols-[1.7fr_1fr] gap-5 mb-9">

            {/* VISÃO GERAL */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col min-w-0">

              {/* HEADER */}
              <div className="flex items-center justify-between mb-8">

                <h2 className="text-3xl font-semibold text-zinc-800">
                  Visão geral
                </h2>

                <button className="border border-zinc-300 px-4 py-2 rounded-lg text-sm hover:bg-zinc-50 transition">
                  Últimos 6 meses
                </button>

              </div>

              {/* CHART */}
              <div className="h-[360px] w-full">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart
                    data={lineData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -10,
                      bottom: 0
                    }}
                    barGap={6}
                    barCategoryGap="18%"
                  >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="month"
                      tickMargin={10}
                    />

                    <YAxis yAxisId="left" />

                    <YAxis
                      yAxisId="right"
                      orientation="right"
                    />

                    <Tooltip />
                    <Legend />

                    <Bar
                      yAxisId="left"
                      dataKey="apolices"
                      fill="#014d4e"
                      radius={[8, 8, 0, 0]}
                      barSize={18}
                    />

                    <Bar
                      yAxisId="right"
                      dataKey="novas"
                      fill="#ff8a3d"
                      radius={[8, 8, 0, 0]}
                      barSize={18}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>
            </div>

            {/* DISTRIBUIÇÃO */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col min-w-0">

              {/* HEADER */}
              <div className="mb-6">

                <h2 className="text-2xl font-semibold text-zinc-800">
                  Distribuição
                </h2>

              </div>

              {/* CHART */}
              <div className="h-[280px] w-full mb-8">

                <ResponsiveContainer width="100%" height="100%">

                  <LineChart
                    data={pieData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: -20,
                      bottom: 0
                    }}
                  >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="month"
                      tickMargin={8}
                    />

                    <YAxis />

                    <Tooltip />
                    <Legend />

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
                      />

                    ))}

                  </LineChart>

                </ResponsiveContainer>

              </div>

              {/* LEGENDA */}
              <div className="space-y-5 mt-auto">

                {tipos.map((tipo, index) => (

                  <div
                    key={tipo}
                    className="flex items-center justify-between"
                  >

                    <div className="flex items-center gap-3">

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

                      {(
                        (
                          apolices
                            .filter(item => item.tipo === tipo)
                            .reduce((acc, item) => acc + item.valor, 0)
                          / totalGeral
                        ) * 100
                      ).toFixed(1)} %

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

              <button className="text-[#014d4e] font-semibold hover:cursor-pointer">
                Ver todas(nao é botao)
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
                    <th className="pb-4">Vencimento</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {apolices.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b last:border-none"
                    >
                      <td className="py-5">{item.id}</td>

                      <td>{item.cliente}</td>

                      <td>{item.tipo}</td>

                      <td>{item.data}</td>

                      <td>{item.vencimento}</td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-sm
                          ${item.status === "Ativa"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-orange-700"
                            }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}