         /* eslint-disable react-hooks/set-state-in-effect */
import {
  IconCalendar as CalendarDays,
  IconChevronDown as ChevronDown,
  IconChevronRight as ChevronRight,
  IconClipboardList as ClipboardList,
  IconCurrencyReal as CircleDollarSign,
  IconDotsVertical as MoreVertical,
  IconFileDownload as FileDown,
  IconFileText as FileText,
  IconFilter as Filter,
  IconHeadphones as Headphones,
  IconHeartHandshake as HeartHandshake,
  IconLogout as LogOut,
  IconSearch as Search,
  IconSettings as Settings,
  IconShield as Shield,
  IconUser as User,
  IconUsers as Users,
  IconWallet as Wallet,
  IconHome as Home
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const menuItems = [
  { label: "Tela Inicial", icon: Home, path: "/home" },
  { label: "Minhas apólices", icon: Shield, path: "/apolices", active: true },
  { label: "Pagamentos", icon: Wallet, path: "/pagamentos" },
  { label: "Beneficiários", icon: Users, path: "/beneficiarios" },
  { label: "Documentos", icon: FileText, path: "/documentos" },
  { label: "Sinistros", icon: HeartHandshake, path: "/sinistros" },
  { label: "Fale conosco", icon: Headphones, path: "/fale-conosco" },
  { label: "Configurações", icon: Settings, path: "/configuracoes" },
];

const summaryCards = [
  {
    label: "Apólices ativas",
    value: "2",
    note: "Total contratado",
    icon: Shield,
    tone: "text-[#005b5b] bg-[#e9f4f2]",
  },
  {
    label: "Apólices em análise",
    value: "0",
    note: "Aguardando aprovação",
    icon: ClipboardList,
    tone: "text-[#005b5b] bg-[#e9f4f2]",
  },
  {
    label: "Apólices vencidas",
    value: "0",
    note: "Nada a vencer",
    icon: CalendarDays,
    tone: "text-[#ff6f2c] bg-[#fff1e9]",
  },
  {
    label: "Valor total de cobertura",
    value: "R$ 300.000,00",
    note: "Em apólices ativas",
    icon: CircleDollarSign,
    tone: "text-[#005b5b] bg-[#e9f4f2]",
    wide: true,
  },
];

const policies = [
  {
    id: "VIT-2024-00012345",
    type: "Seguro de Vida Individual",
    hiredAt: "10/01/2024",
    dueAt: "10/01/2025",
    dueNote: "Faltam 220 dias",
    coverage: "R$ 200.000,00",
    status: "Ativa",
    statusClass: "bg-[#d8f5de] text-[#16863b]",
    expanded: true,
  },
  {
    id: "VIT-2024-00012346",
    type: "Seguro de Vida Familiar",
    hiredAt: "08/01/2024",
    dueAt: "08/01/2025",
    dueNote: "Faltam 218 dias",
    coverage: "R$ 100.000,00",
    status: "Ativa",
    statusClass: "bg-[#d8f5de] text-[#16863b]",
  },
  {
    id: "VIT-2023-00009876",
    type: "Seguro de Acidentes Pessoais",
    hiredAt: "15/03/2023",
    dueAt: "15/03/2024",
    dueNote: "Vencida",
    coverage: "R$ 50.000,00",
    status: "Cancelada",
    statusClass: "bg-[#ffe4c7] text-[#e86b1f]",
    overdue: true,
  },
];



function Perfil() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState(location.pathname);

  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location.pathname]);
  

  function handleMenuClick(path: string) {
    setSelectedPath(path);
    navigate(path);
  }

  function logout() {
      //handleLogout() colocar posteriormente
      toast.success('O Usuário foi desconectado com sucesso!')
      navigate('/')
  }
  
  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#173c3a]">
      <div className="flex min-h-screen">

        {/* Barra lateral - config e estilização */}
        <aside className="hidden min-h-[calc(100vh-74px)] w-64.5 shrink-0 border-r border-[#dde8e5] bg-white lg:flex lg:flex-col lg:justify-between">
          <div className="">
            
            <div className="flex h-30 items-center justify-center bg-[#12312F] px-8 text-white">
              <div className="flex items-center gap-4 ">
                
                <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-[#005b5b]">
                  <User size={36} fill="#005b5b" />
                </div>

                <div>
                  <p className="text-base font-bold">Olá, Juliana!</p>
                  <p className="mt-1 text-xs font-medium text-white/85">
                    Cliente desde 2024
                  </p>
                </div>
              </div>
            </div>

            <nav className="mx-auto mt-5 flex w-full flex-col gap-3 rounded-2xl font-poppins">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    onClick={() => handleMenuClick(item.path)}
                    key={item.label}
                    className={`flex h-14 w-full items-center rounded-lg px-5 text-left text-sm font-bold text-[#173c3a] transition ${
                      selectedPath === item.path
                        ? "bg-[#173c3a] text-[#F5F7F6]"
                        : "hover:bg-[#d9e2e5]"
                    }`}
                  >
                    <span className="flex w-10 shrink-0 justify-center">
                      <Icon size={26} stroke={2} />
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <button className="mx-full mb-8 flex h-11 w-full items-center rounded-lg px-5 text-sm font-bold text-[#005b5b] transition hover:bg-[#d9e2e5]" onClick={logout}>
            <span className="flex w-10 shrink-0 justify-center">
              <LogOut size={24} stroke={2} />
            </span>
            Sair
          </button>
        </aside>
        {/* Barra lateral - config e estilização Fim*/}

        <main className="flex-1 px-8 pt-8 pb-10">
          <section>
            <div className="mb-6">
              <h1 className="text-4xl font-poppins font-semibold text-[#005b5b] md:text-4xl">
                Minhas apólices
              </h1>

              <p className="mt-2 text-sm text-[#647b78]">
                Acompanhe todos os detalhes das suas apólices de seguro.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {summaryCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.label}
                    className="flex min-h-24.5 items-center gap-4 rounded-md border border-[#e1ebe8] bg-white px-5 shadow-[0_12px_30px_rgba(0,91,91,0.07)]"
                  >
                    <div
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${card.tone}`}
                    >
                      <Icon size={25} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#647b78]">
                        {card.label}
                      </p>
                      <p
                        className={`mt-1 font-extrabold text-[#005b5b] ${
                          card.wide ? "text-xl" : "text-3xl"
                        }`}
                      >
                        {card.value}
                      </p>
                      <p className="text-xs font-medium text-[#647b78]">
                        {card.note}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 rounded-md border border-[#dde8e5] bg-white p-4 shadow-[0_12px_30px_rgba(0,91,91,0.05)]">
              <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px_auto]">
                <label className="flex h-11 items-center gap-3 rounded-md border border-[#d9e5e2] px-4 text-sm text-[#647b78]">
                  <Search size={18} className="text-[#12312F]" />
                  <input
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#8ea09c]"
                    placeholder="Buscar por número da apólice ou tipo"
                  />
                </label>

                <button className="flex h-11 items-center justify-between rounded-md border border-[#d9e5e2] px-4 text-left">
                  <span>
                    <span className="block text-xs text-[#647b78]">
                      Tipo de seguro
                    </span>
                    <span className="text-xs font-semibold text-[#173c3a]">
                      Todos
                    </span>
                  </span>
                  <ChevronDown size={16} className="text-[#005b5b]" />
                </button>

                <button className="flex h-11 items-center justify-between rounded-md border border-[#d9e5e2] px-4 text-left">
                  <span>
                    <span className="block text-xs text-[#647b78]">Status</span>
                    <span className="text-xs font-semibold text-[#173c3a]">
                      Todos
                    </span>
                  </span>
                  <ChevronDown size={16} className="text-[#005b5b]" />
                </button>

                <button className="flex h-11 items-center justify-center gap-3 rounded-md border border-[#12312F] px-5 text-sm font-bold text-[#005b5b] transition hover:bg-[#eef7f5]">
                  Mais filtros
                  <Filter size={17} />
                </button>
              </div>
            </div>

            <section className="mt-5 overflow-hidden rounded-md border border-[#dde8e5] bg-white shadow-[0_12px_30px_rgba(0,91,91,0.05)]">
              <div className="hidden grid-cols-[2.2fr_1.25fr_1fr_1fr_1fr_1.1fr] border-b border-[#e7eeee] px-5 py-4 text-xs font-bold text-[#526865] xl:grid">
                <span>Apólice</span>
                <span>Tipo de seguro</span>
                <span>Contratação</span>
                <span>Vencimento</span>
                <span>Cobertura</span>
                <span>Status</span>
              </div>

              <div className="divide-y divide-[#edf2f0]">
                {policies.map((policy) => (
                  <article key={policy.id} className="p-5">
                    <div className="grid gap-4 xl:grid-cols-[2.2fr_1.25fr_1fr_1fr_1fr_1.1fr_130px_28px] xl:items-center">
                      <div className="flex items-center gap-4">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#e9f4f2] text-[#12312F]">
                          <Shield size={23} />
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-[#12312F]">
                            {policy.id}
                          </p>
                          <p className="mt-1 text-xs text-[#647b78]">
                            {policy.type}
                          </p>
                          <span
                            className={`mt-2 inline-flex rounded-full px-3 py-1 text-[11px] font-bold ${policy.statusClass}`}
                          >
                            {policy.status}
                          </span>
                        </div>
                      </div>

                      <p className="hidden text-sm text-[#526865] xl:block">
                        {policy.type}
                      </p>
                      <p className="text-sm text-[#526865]">
                        <span className="mr-2 font-bold text-[#173c3a] xl:hidden">
                          Contratação:
                        </span>
                        {policy.hiredAt}
                      </p>
                      <div className="text-sm">
                        <span className="mr-2 font-bold text-[#173c3a] xl:hidden">
                          Vencimento:
                        </span>
                        <span className="text-[#526865]">{policy.dueAt}</span>
                        <p
                          className={`mt-1 text-xs font-bold ${
                            policy.overdue ? "text-[#d71920]" : "text-[#16863b]"
                          }`}
                        >
                          {policy.dueNote}
                        </p>
                      </div>
                      <p className="text-sm text-[#526865]">
                        <span className="mr-2 font-bold text-[#12312F] xl:hidden">
                          Cobertura:
                        </span>
                        {policy.coverage}
                      </p>
                      <span className="hidden xl:block" />

                      <button className="flex h-9 w-full items-center justify-center gap-2 rounded-md border border-[#12312F] px-3 text-xs font-bold text-[#12312F] transition hover:bg-[#eef7f5] xl:w-auto">
                        Ver detalhes
                        <ChevronRight size={15} />
                      </button>
                      <button
                        aria-label={`Mais opções da apólice ${policy.id}`}
                        className="hidden h-9 w-7 place-items-center rounded-md text-[#12312F] transition hover:bg-[#eef7f5] xl:grid"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </div>

                    {policy.expanded && (
                      <div className="mt-5 grid gap-4 rounded-md border border-[#e4ecea] bg-white px-5 py-4 text-xs text-[#526865] md:grid-cols-2 xl:grid-cols-5">
                        <div>
                          <p className="font-bold text-[#12312F]">Segurado</p>
                          <p className="mt-2">Juliana Martins da Silva</p>
                          <p>CPF: 123.456.789-10</p>
                        </div>
                        <div>
                          <p className="font-bold text-[#173c3a]">
                            Beneficiários
                          </p>
                          <p className="mt-2">3 beneficiários</p>
                          <button className="mt-1 font-bold text-[#12312F]">
                            Ver detalhes
                          </button>
                        </div>
                        <div>
                          <p className="font-bold text-[#12312F]">
                            Forma de pagamento
                          </p>
                          <p className="mt-2">Cartão de crédito</p>
                          <p>Mensal</p>
                        </div>
                        <div>
                          <p className="font-bold text-[#12312F]">
                            Próxima cobrança
                          </p>
                          <p className="mt-2">10/07/2024</p>
                          <p>R$ 49,90</p>
                        </div>
                        <div>
                          <p className="font-bold text-[#12312F]">
                            Documento da apólice
                          </p>
                          <button className="mt-2 flex items-center gap-2 font-bold text-[#12312F]">
                            <FileDown size={15} />
                            Baixar documento
                          </button>
                          <p className="mt-1">PDF • 1,2 MB</p>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <div className="mt-7 flex flex-col gap-4 rounded-md bg-[#eaf5f3] px-6 py-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#d6ebe8] text-[#12312F]">
                  <Headphones size={34} fill="#005b5b" />
                </div>
                <div>
                  <p className="text-lg font-extrabold text-[#005b5b]">
                    Precisa de ajuda com suas apólices?
                  </p>
                  <p className="mt-1 text-sm text-[#647b78]">
                    Nossa equipe está pronta para te ajudar.
                  </p>
                </div>
              </div>

              <button className="h-12 rounded-md bg-[#12312F] px-8 text-sm font-bold text-white transition hover:bg-[#004747]">
                Fale com um especialista
              </button>
            </div>
          </section>
        </main>       

        
      </div>
    </div>
  );
}

export default Perfil;
