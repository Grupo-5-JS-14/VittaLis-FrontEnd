import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Hook correto para o Vite / React Router

const messages = [
  "Preparando seu espaço seguro...",
  "Carregando seus dados de saúde...",
  "Quase lá...",
];

const HEART_PATH = "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z";
const PATH_LENGTH = 51.5;

export default function LoadingVittaLis() {
  const location = useLocation(); // Captura o objeto de localização do React Router
  const pathname = location.pathname; // Pega a rota atual (ex: "/perfil" ou "/admin")
  
  const [msgIndex, setMsgIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Define em quais rotas o loading é permitido
  const allowedRoutes = ["/perfil", "/admin"];

  useEffect(() => {
    if (!allowedRoutes.includes(pathname)) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % messages.length);
        setVisible(true);
      }, 350);
    }, 2800);
    
    return () => clearInterval(interval);
  }, [pathname]);

  // Se a rota atual não for /perfil ou /admin, não renderiza nada
  if (!allowedRoutes.includes(pathname)) {
    return null;
  }

  return (
    <main
      className="fixed inset-0 z-50 bg-[#F4F7F6] flex items-center justify-center px-6 antialiased"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Glows ambientes */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-1/3 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#12312F]/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#FF7A38]/[0.05] blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10">

        {/* ── Coração SVG animado puro ── */}
        <div className="relative flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[140px] w-[140px]"
            style={{ filter: "drop-shadow(0 0 20px rgba(255,122,56,0.25))" }}
          >
            <defs>
              <linearGradient id="heartGrad" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#12312F" />
                <stop offset="100%" stopColor="#FF7A38" />
              </linearGradient>
            </defs>

            {/* Trilha fantasma do coração */}
            <path
              d={HEART_PATH}
              stroke="#12312F"
              strokeOpacity="0.06"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* A Cobrinha Calibrada */}
            <path
              d={HEART_PATH}
              stroke="url(#heartGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="18 40"
              style={{
                animation: "smoothSnake 1.6s linear infinite",
              }}
            />
          </svg>
        </div>

        {/* ── Identidade da Marca ── */}
        <div className="flex flex-col items-center gap-3 select-none">
          <h1 className="text-[20px] font-black tracking-[0.2em] text-[#12312F] uppercase">
            Vitta<span className="text-[#FF7A38]">Lis</span>
          </h1>

          <p
            className="text-[13px] font-medium tracking-wide text-[#4A6160]"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 350ms ease",
            }}
          >
            {messages[msgIndex]}
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');

        @keyframes smoothSnake {
          0% {
            stroke-dashoffset: ${PATH_LENGTH + 18};
          }
          100% {
            stroke-dashoffset: 18;
          }
        }
      `}</style>
    </main>
  );
}