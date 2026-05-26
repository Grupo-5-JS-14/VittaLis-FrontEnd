import {
  Heart,
  Eye,
  Lock,
  DeviceMobile,
  ShieldCheck,
  Lightning,
  Users,
  CurrencyDollar,
  Smiley,
  Clock,
  LinkedinLogo,
} from "@phosphor-icons/react";

const heroImg =
  "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80";

interface AboutProps {
  isDarkMode: boolean;
}

interface ValorItem {
  icon: React.ReactNode;
  titulo: string;
  descricao: string;
}

interface MembroItem {
  nome: string;
  cargo: string;
  foto: string;
  linkedin: string;
}

const VALORES: ValorItem[] = [
  {
    icon: <Heart size={40} />,
    titulo: "Humanidade",
    descricao:
      "Colocamos pessoas no centro de tudo. Cada decisão é tomada pensando no impacto real na vida dos nossos clientes.",
  },
  {
    icon: <Eye size={40} />,
    titulo: "Transparência",
    descricao:
      "Contratos claros, sem letras miúdas. Você sabe exatamente o que está contratando.",
  },
  {
    icon: <Lock size={40} />,
    titulo: "Segurança",
    descricao: "Tecnologia de ponta para proteger seus dados e seu patrimônio.",
  },
  {
    icon: <Lightning size={40} />,
    titulo: "Agilidade",
    descricao: "Contratação em minutos e resolução rápida de sinistros.",
  },
  {
    icon: <Users size={40} />,
    titulo: "Cuidado com o time",
    descricao:
      "Nossos colaboradores recebem o mesmo cuidado dedicado aos clientes.",
  },
  {
    icon: <ShieldCheck size={40} />,
    titulo: "Confiabilidade",
    descricao: "15 anos de mercado e mais de 500 mil famílias protegidas.",
  },
];

const TIME: MembroItem[] = [
  {
    nome: "Lohanna Benjamim",
    cargo: "Front-end Developer",
    foto: "https://avatars.githubusercontent.com/u/188930169?v=4",
    linkedin: "https://www.linkedin.com/in/lohannab/",
  },
  {
    nome: "André Lucas",
    cargo: "Front-end Developer",
    foto: "https://avatars.githubusercontent.com/u/197832797?v=4",
    linkedin: "https://www.linkedin.com/in/andre-lucas-dias-lima/",
  },
  {
    nome: "Andressa Andrade",
    cargo: "Front-end Developer",
    foto: "https://avatars.githubusercontent.com/u/128521737?v=4",
    linkedin: "https://www.linkedin.com/in/andressa-andrade-dev/",
  },
  {
    nome: "Bruna Zuppini",
    cargo: "Front-end Developer",
    foto: "https://avatars.githubusercontent.com/u/48595147?s=400&u=37fda6b65b1ad54ff3d7d98f6f7662f12df7d2cc&v=4",
    linkedin: "https://www.linkedin.com/in/brunazuppini",
  },
  {
    nome: "Gabriel Coutinho",
    cargo: "Front-end Developer",
    foto: "https://avatars.githubusercontent.com/u/156151153?v=4",
    linkedin: "https://www.linkedin.com/in/gabriel-coutinho-de-souza/",
  },
  {
    nome: "Kay Ira",
    cargo: "Front-end Developer",
    foto: "https://avatars.githubusercontent.com/u/260806102?v=4",
    linkedin: "https://www.linkedin.com/in/kayane-do-val-lima/",
  },
  {
    nome: "Douglas Santos",
    cargo: "Front-end Developer",
    foto: "https://avatars.githubusercontent.com/u/99764080?v=4",
    linkedin: "https://www.linkedin.com/in/douglas-santos-ds/",
  },
];

const DIFERENCIAIS = [
  {
    icon: <DeviceMobile size={36} />,
    titulo: "100% digital",
    descricao: "Contrate e gerencie tudo pelo app, sem burocracia.",
  },
  {
    icon: <ShieldCheck size={36} />,
    titulo: "Regulamentada",
    descricao: "Operamos com total segurança jurídica.",
  },
  {
    icon: <Clock size={36} />,
    titulo: "Sinistro rápido",
    descricao: "Pagamento ágil e processo digital.",
  },
  {
    icon: <CurrencyDollar size={36} />,
    titulo: "Preço acessível",
    descricao: "Planos a partir de R$24,90/mês.",
  },
  {
    icon: <Smiley size={36} />,
    titulo: "Sem letras miúdas",
    descricao: "Você entende tudo antes de contratar.",
  },
  {
    icon: <Users size={36} />,
    titulo: "500k+ famílias",
    descricao: "Milhares de brasileiros confiam na Vittalis.",
  },
];

interface CardValorProps {
  icon: React.ReactNode;
  titulo: string;
  descricao: string;
  isDarkMode: boolean;
}

function CardValor({ icon, titulo, descricao, isDarkMode }: CardValorProps) {
  return (
    <div
      className={`w-full h-full rounded-4xl border p-6 sm:p-8 md:p-10 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col items-center justify-start text-center ${
        isDarkMode
          ? "bg-[#0f3d35] border-white/10"
          : "bg-white border-zinc-200"
      }`}
    >
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center ${
          isDarkMode
            ? "bg-white/10 text-white"
            : "bg-[#EEF7F1] text-[#1a4a45]"
        }`}
      >
        {icon}
      </div>

      <h3
        className={`text-xl font-black mt-8 ${
          isDarkMode ? "text-white" : "text-[#1a4a45]"
        }`}
      >
        {titulo}
      </h3>

      <div className="w-14 h-1 bg-[#f97316] rounded-full mt-4" />

      <p
        className={`mt-6 leading-relaxed text-sm sm:text-base ${
          isDarkMode ? "text-zinc-300" : "text-zinc-600"
        }`}
      >
        {descricao}
      </p>
    </div>
  );
}

function About({ isDarkMode }: AboutProps) {
  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden scroll-smooth transition-colors duration-500 ${
        isDarkMode
          ? "bg-[#1a4a45] text-white"
          : "bg-zinc-50 text-[#1a4a45]"
      }`}
    >
      {/* HERO */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Família protegida"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[#1a4a45]/80" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center px-4">
          <span className="inline-flex items-center gap-2 bg-[#f97316]/20 border border-[#f97316]/40 rounded-full px-4 py-1 text-xs text-[#fdba74] font-semibold tracking-wider mb-6">
            ♥ SEGURO DE VIDA DESCOMPLICADO
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight flex flex-wrap justify-center gap-3">
            <span>SOBRE A</span>
            <span className="text-[#f97316]">VITTALIS</span>
          </h1>

          <h2 className="text-lg sm:text-2xl font-bold text-[#a8c5c1] mt-6 max-w-3xl">
            MAIS QUE UM SEGURO, UM COMPROMISSO COM A VIDA.
          </h2>

          <p className="max-w-2xl text-sm sm:text-lg mt-6 leading-relaxed text-[#c8dcd8]">
            A Vittalis nasceu para tornar a proteção financeira acessível,
            transparente e humana para todas as famílias brasileiras.
          </p>
        </div>
      </section>

      {/* HISTÓRIA */}
      <section className="w-full px-4 sm:px-6 py-24 md:py-32 flex justify-center">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center justify-items-center">
          <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8 flex-wrap">
              <span
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl text-white ${
                  isDarkMode ? "bg-[#f97316]" : "bg-[#1a4a45]"
                }`}
              >
                1
              </span>

              <h2
                className={`text-3xl sm:text-5xl font-black ${
                  isDarkMode ? "text-white" : "text-[#f97316]"
                }`}
              >
                NOSSA{" "}
                <span
                  className={
                    isDarkMode ? "text-[#f97316]" : "text-[#1a4a45]"
                  }
                >
                  HISTÓRIA
                </span>
              </h2>
            </div>

            <div
              className={`max-w-xl space-y-6 text-sm sm:text-lg leading-relaxed ${
                isDarkMode ? "text-[#c8dcd8]" : "text-zinc-700"
              }`}
            >
              <p>
                A Vittalis foi fundada em 2010 com uma crença simples: toda
                família merece proteção de qualidade.
              </p>

              <p>
                Evoluímos para uma insurtech moderna, unindo tecnologia e
                atendimento humanizado.
              </p>

              <p>Hoje somos a escolha de mais de 500 mil famílias.</p>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <img
              src={heroImg}
              alt="Família protegida"
              className="rounded-[40px] w-full max-w-xl h-75 sm:h-112.5 lg:h-137.5 object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section
        className={`w-full px-4 sm:px-6 py-24 md:py-32 flex justify-center transition-colors duration-500 ${
          isDarkMode ? "bg-[#0f3d35]" : "bg-zinc-100"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl text-white ${
                  isDarkMode ? "bg-[#f97316]" : "bg-[#1a4a45]"
                }`}
              >
                2
              </span>

              <h2
                className={`text-3xl sm:text-5xl font-black text-center ${
                  isDarkMode ? "text-white" : "text-[#1a4a45]"
                }`}
              >
                NOSSOS <span className="text-[#f97316]">VALORES</span>
              </h2>
            </div>

            <p
              className={`mt-6 text-sm sm:text-base max-w-2xl text-center ${
                isDarkMode ? "text-zinc-300" : "text-zinc-600"
              }`}
            >
              Os princípios que guiam cada decisão da Vittalis.
            </p>
          </div>

          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 place-items-center">
            {VALORES.map((valor, index) => (
              <div className="w-full max-w-90" key={index}>
                <CardValor
                  icon={valor.icon}
                  titulo={valor.titulo}
                  descricao={valor.descricao}
                  isDarkMode={isDarkMode}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIME */}
      <section
        className={`w-full px-4 sm:px-6 py-24 md:py-32 flex justify-center transition-colors duration-500 ${
          isDarkMode ? "bg-[#145046]" : "bg-white"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl text-white ${
                  isDarkMode ? "bg-[#f97316]" : "bg-[#1a4a45]"
                }`}
              >
                3
              </span>

              <h2
                className={`text-4xl sm:text-5xl font-black ${
                  isDarkMode ? "text-white" : "text-[#1a4a45]"
                }`}
              >
                NOSSO <span className="text-[#f97316]">TIME</span>
              </h2>
            </div>

            <p
              className={`mt-6 text-sm sm:text-lg max-w-2xl ${
                isDarkMode ? "text-[#c8dcd8]" : "text-zinc-600"
              }`}
            >
              O time que faz a Vittalis acontecer todos os dias.
            </p>
          </div>

          <div className="w-full flex flex-wrap justify-center gap-6">
            {TIME.map((membro, index) => (
              <div
                key={index}
                className={`rounded-3xl border p-8 w-full max-w-85 flex flex-col items-center shadow-md hover:-translate-y-2 transition-all duration-300 ${
                  isDarkMode
                    ? "bg-[#0f3d35] border-white/10"
                    : "bg-white border-zinc-200"
                }`}
              >
                <img
                  src={membro.foto}
                  alt={membro.nome}
                  className="w-28 h-28 rounded-full object-cover shadow-lg"
                />

                <h3
                  className={`mt-5 text-2xl font-bold text-center ${
                    isDarkMode ? "text-white" : "text-[#1a4a45]"
                  }`}
                >
                  {membro.nome}
                </h3>

                <span
                  className={`font-semibold text-center text-sm mt-1 ${
                    isDarkMode ? "text-zinc-300" : "text-zinc-500"
                  }`}
                >
                  {membro.cargo}
                </span>

                <div className="flex gap-4 mt-5">
                  <a
                    href={membro.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all ${
                      isDarkMode
                        ? "bg-white/10 hover:bg-[#1a4a45] hover:text-white"
                        : "bg-zinc-100 hover:bg-[#1a4a45] hover:text-white"
                    }`}
                    aria-label={`LinkedIn de ${membro.nome}`}
                  >
                    <LinkedinLogo size={22} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="w-full bg-[#1a4a45] px-4 sm:px-6 py-24 md:py-32 flex justify-center">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
            <span className="text-xs font-bold text-[#fdba74] tracking-widest uppercase">
              Por que escolher a Vittalis
            </span>

            <h2 className="text-4xl sm:text-5xl font-black text-white mt-4 max-w-4xl">
              TECNOLOGIA E CUIDADO{" "}
              <span className="text-[#f97316]">EM CADA DETALHE</span>
            </h2>

            <p className="mt-6 text-sm sm:text-lg text-[#a8c5c1] max-w-2xl">
              Combinamos inovação com atendimento humanizado para sua total
              tranquilidade.
            </p>
          </div>

          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {DIFERENCIAIS.map((dif, index) => (
              <div
                key={index}
                className="w-full max-w-90 bg-white/7 border border-white/12 rounded-3xl p-8 md:p-10 hover:-translate-y-3 transition-all duration-500 hover:bg-white/10"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#f97316]/20 border border-[#f97316]/30 flex items-center justify-center text-[#fdba74] mb-6">
                  {dif.icon}
                </div>

                <h3 className="text-lg font-bold text-white mb-4">
                  {dif.titulo}
                </h3>

                <p className="text-sm sm:text-base text-[#a8c5c1] leading-relaxed">
                  {dif.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;