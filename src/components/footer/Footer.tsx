import { Link } from "react-router-dom";
import { 
  WhatsappLogo, 
  LinkedinLogo,
  ShieldCheck,
  CheckCircle,
  Clock,
  GithubLogoIcon
} from "@phosphor-icons/react";
import Grupo05 from "../extras/Grupo05";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    /* pb-32 no mobile para dar o perfeito respiro da sua barra inferior fixa */
    <footer className="w-full bg-[#12312F] text-white pt-16 pb-32 lg:pb-12 px-6 md:px-12 border-t border-white/5 font-['Poppins',sans-serif]">
      <div className="max-w-7xl mx-auto">
        
        {/* ================= SEÇÃO 1: LINKS E NAVEGAÇÃO ORGANIZADA ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* Lado Esquerdo: Identidade do Projeto & Devs */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-wider text-[#FF7A38] uppercase">Vittalis</span>
              
            </div>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Simplificando o acesso à proteção através da tecnologia. Um projeto de simulação digital desenvolvido como caso prático no Bootcamp JavaScript Full Stack da Generation Brasil.
            </p>
            <div className="mt-2 w-full max-w-xs">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Equipe de Devs</p>
              <Grupo05 variante="compacto" />
            </div>
          </div>

          {/* Coluna: VITTALIS */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col gap-3 items-start">
            <h3 className="text-sm font-black text-[#FF7A38] uppercase tracking-wider">
              Vittalis
            </h3>
            <div className="flex flex-col gap-2.5 text-sm text-white/70 font-medium">
              <Link to="/sobre" className="hover:text-[#FF7A38] transition-colors">Quem somos</Link>
              <Link to="/planos" className="hover:text-[#FF7A38] transition-colors">Nossos Planos</Link>
              <Link to="/projetos" className="hover:text-[#FF7A38] transition-colors">Projetos Vitta</Link>
            </div>
          </div>

          {/* Coluna: SERVIÇOS */}
          <div className="lg:col-span-2 flex flex-col gap-3 items-start">
            <h3 className="text-sm font-black text-[#FF7A38] uppercase tracking-wider">
              Serviços
            </h3>
            <div className="flex flex-col gap-2.5 text-sm text-white/70 font-medium">
              <Link to="/perfil" className="hover:text-[#FF7A38] transition-colors">Minha conta</Link>
              <Link to="/sinistro" className="hover:text-[#FF7A38] transition-colors">Acionar Sinistro</Link>
              <Link to="/ajuda" className="hover:text-[#FF7A38] transition-colors">Central de Ajuda</Link>
            </div>
          </div>

          {/* Coluna: CONTATO SIMULADO */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
              <Clock size={16} className="text-[#FF7A38]" />
              Suporte Simulado
            </h3>
            <div className="text-xs text-white/70 space-y-1">
              <p>Segunda a Sexta — <span className="font-semibold text-white">9h às 18h</span></p>
              <p>E-mail: <span className="text-[#FF7A38]">contato@vittalisprojeto.com</span></p>
            </div>
            
            {/* Botão direcionando para a Generation de forma limpa */}
            <a 
              href="/sobre" 
              target="_blank" 
              rel="noreferrer"
              className="mt-2 flex items-center justify-center gap-2 bg-[#FF7A38] hover:bg-[#e2662a] text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md"
            >
              <WhatsappLogo size={18} weight="fill" />
              Fale Conosco
            </a>

            {/* Redes Sociais sem tags fantasmas */}
            <div className="mt-2 flex items-center gap-4 text-white/40">
              <a href="https://github.com/Grupo-5-JS-14" target="_blank" rel="noreferrer" className="hover:text-[#FF7A38] transition-colors"><GithubLogoIcon size={20} /></a>
              <a href="https://linktr.ee/grupo_05turmajavascript_14" target="_blank" rel="noreferrer" className="hover:text-[#FF7A38] transition-colors"><LinkedinLogo size={20} /></a>
            </div>
          </div>

        </div>

        {/* ================= SEÇÃO 2: SELOS DE CREDIBILIDADE ================= */}
        <div className="border-t border-white/10 py-6 flex flex-wrap items-center justify-center lg:justify-between gap-6 text-xs text-white/50">
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-1.5 border border-white/20 px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider text-[10px]">
              <ShieldCheck size={16} />
              Ambiente Educacional
            </div>
            <div className="flex items-center gap-1.5 border border-white/20 px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider text-[10px]">
              <CheckCircle size={16} />
              Fins de Demonstração
            </div>
            <div className="flex items-center gap-1 border border-white/20 px-3 py-1.5 rounded-lg font-medium text-[10px]">
              Parceria <span className="font-black bg-white text-[#12312F] px-1 ml-0.5 rounded-xs">Generation Brasil</span>
            </div>
          </div>

          <div className="flex gap-4 font-medium text-[11px]">
            <span className="cursor-default text-white/40">Termos Ilustrativos</span>
            <span>•</span>
            <span className="cursor-default text-white/40">Conformidade LGPD</span>
          </div>
        </div>

        {/* ================= SEÇÃO 3: COPYRIGHT SIMPLIFICADO ================= */}
        <div className="border-t border-white/5 pt-6 text-center lg:text-left text-[10px] text-white/30 leading-relaxed">
          © {currentYear} Vittalis Seguros. Este software é um protótipo estritamente acadêmico desenvolvido para fins de avaliação didática no Bootcamp Generation Brasil. Nenhuma transação financeira ou comercialização real de apólices ocorre nesta plataforma.
        </div>

      </div>
    </footer>
  );
}