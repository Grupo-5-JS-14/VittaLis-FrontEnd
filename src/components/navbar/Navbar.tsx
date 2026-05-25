import { useState } from "react";
import { Menu, X, User, Lock } from "lucide-react";
import { Link } from "react-router-dom"; // Garantindo a importação do Link

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = false;
  const isAdmin = false;

  const linksMenu = [
    { label: "Início", href: "/home" },
    { label: "Planos", href: "/planos" },
    { label: "Ajuda", href: "/ajuda" },
  ];

  return (
    <>
      <nav className="hidden lg:block w-full bg-white border-b border-slate-100 sticky top-0 z-50 font-['Poppins',sans-serif]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Vittalis - Atualizado para Link */}
            <Link
              to="/home"
              className="flex items-center space-x-3 shrink-0 group cursor-pointer"
            >
              <div className="relative w-9 h-9 flex items-center justify-center transition-transform group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#12312F"
                  strokeWidth="2.5"
                  className="w-full h-full"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center scale-[0.4] translate-y-px">
                  <svg viewBox="0 0 24 24" fill="#FF7A38">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col select-none">
                <span className="text-xl font-black text-text tracking-wider leading-none uppercase group-hover:text-[#FF7A38] transition-colors">
                  Vittalis
                </span>
                <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">
                  Seguro de Vida
                </span>
              </div>
            </Link>

            {/* Links Desktop - Atualizados para Link */}
            <div className="flex items-center space-x-8">
              {linksMenu.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.href}
                  className="text-sm font-semibold text-text/90 hover:text-[#FF7A38] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {isLoggedIn && isAdmin && (
                <Link
                  to="/admin"
                  className="text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Painel ADM
                </Link>
              )}
            </div>

            {/* Botões Desktop */}
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2.5 text-sm font-bold rounded-xl text-text border-2 border-text text-center"
                  >
                    Entrar
                  </Link>
                  <Link to="/simulacao">
                    <button className="px-6 py-3 text-sm font-bold rounded-xl text-white bg-[#FF7A38] cursor-pointer">
                      Cotação rápida
                    </button>
                  </Link>
                </>
              ) : (
                <Link
                  to="/perfil"
                  className="px-6 py-3 text-sm font-bold rounded-xl text-white bg-text text-center"
                >
                  Meu Perfil
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile - Menu de links expansível */}
      <div
        className={`lg:hidden fixed left-0 right-0 bg-white border-t border-slate-100 shadow-2xl z-40 transition-all duration-300 ease-in-out font-['Poppins',sans-serif] ${
          isOpen
            ? "bottom-20 opacity-100"
            : "bottom-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 space-y-1">
          {linksMenu.map((link, idx) => (
            <Link
              key={idx}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-bold text-text hover:text-[#FF7A38] py-3 border-b border-slate-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Admin condicional Mobile - Atualizado para Link */}
          {isLoggedIn && isAdmin && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 text-base font-bold text-red-600 bg-red-50/60 px-3 py-3 rounded-xl transition-colors mt-3"
            >
              <Lock className="h-4 w-4" />
              <span>Painel ADM</span>
            </Link>
          )}
        </div>
      </div>

      {/* Barra Inferior Fixa (Mobile Bottom Navigation) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 z-50 px-6 flex items-center justify-between font-['Poppins',sans-serif]">
        
        {/* Símbolo da Vittalis - Atualizado para Link */}
        <Link
          to="/home"
          className="flex items-center justify-center p-2"
          aria-label="Ir para Home"
        >
          <div className="relative w-8 h-8">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#12312F"
              strokeWidth="2.5"
              className="w-full h-full"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center scale-[0.4] translate-y-px">
              <svg viewBox="0 0 24 24" fill="#FF7A38">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Ícone do Usuário - Atualizado para Link */}
        <Link
          to={isLoggedIn ? "/perfil" : "/login"}
          className="p-2 text-text hover:text-[#FF7A38] transition-colors"
          aria-label={isLoggedIn ? "Ver perfil" : "Ir para o login"}
        >
          <User className="h-6 w-6" />
        </Link>

        {/* Botão Hambúrguer */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-text hover:text-[#FF7A38] focus:outline-none p-2 transition-colors cursor-pointer"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
}