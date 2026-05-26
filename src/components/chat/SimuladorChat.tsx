import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, PaperPlaneRight, ArrowClockwise, Percent, List, X, House, Info, Handshake } from '@phosphor-icons/react';
import MensagemBalao from './MensagemBalao';
import CardPlanoChat from './CardPlanoChat';
import type Plano from '../../models/Plano';
import type { Mensagem, DadosSimulacao } from './Tipos';

// 1. MANUTENÇÃO DA FIDELIDADE E ADIÇÃO DOS OUTROS 2 PLANOS
const MOCK_PLANOS: Plano[] = [
  { id: 1, nome: "Vitta Essencial", descricao: "A proteção básica ideal. Garante coberturas indispensáveis por doenças graves e acidentes pessoais com o menor custo do mercado.", valor: 14.90, usuario: null, apolice: null },
  { id: 2, nome: "Vitta Vida Individual", descricao: "O amparo perfeito para sua autonomia. Garante sua tranquilidade financeira em vida caso enfrente imprevistos de saúde, internações ou precise pausar o trabalho.", valor: 24.90, usuario: null, apolice: null },
  { id: 3, nome: "Vitta Proteção Familiar", descricao: "O abraço seguro para quem você mais ama. Uma estrutura completa desenhada para amparar o futuro dos seus filhos e parceiro(a), mantendo o padrão de vida.", valor: 49.90, usuario: null, apolice: null },
  { id: 4, nome: "Vitta Corporate PME", descricao: "Segurança estratégica para o seu negócio. Proteja seus sócios, colaboradores ou garanta a continuidade da sua empresa contra imprevistos corporativos.", valor: 99.90, usuario: null, apolice: null }
];

// Extensão da tipagem local para incluir e-mail e persistir a seleção do plano provisoriamente
interface DadosSimulacaoVittalis extends DadosSimulacao {
  email?: string;
  planoTemporarioId?: number;
  valorTemporarioFinal?: number;
}

export default function SimuladorChat() {
  const navigate = useNavigate();
  const campoMensagensFimRef = useRef<HTMLDivElement>(null);

  // Estados do fluxo do Chat
  const [passo, setPasso] = useState<number>(1);
  const [historico, setHistorico] = useState<Mensagem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [tipoCobranca, setTipoCobranca] = useState<'mensal' | 'anual'>('mensal');
  const [dadosSimulacao, setDadosSimulacao] = useState<DadosSimulacaoVittalis>({ nome: '', idade: 0, perfil: '', email: '' });
  
  // Estado do Menu Hambúrguer Minimalista
  const [menuAberto, setMenuAberto] = useState<boolean>(false);

  // Rolagem automática para a última mensagem
  const rolarParaBaixo = () => {
    campoMensagensFimRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mensagem inicial de acolhimento humana (Estilo Mycon)
  useEffect(() => {
    setHistorico([
      { 
        id: 1, 
        autor: 'bot', 
        texto: "Olá! Seja muito bem-vindo à Vittalis. Pensar no amanhã é um gesto de carinho hoje. Em menos de dois minutos, vamos desenhar juntos uma proteção que traga conforto para o seu coração e segurança para quem você ama. Vamos começar?" 
      }
    ]);
  }, []);

  useEffect(() => {
    rolarParaBaixo();
  }, [historico, passo]);

  const botFalar = (texto: string | React.ReactNode) => {
    setTimeout(() => {
      setHistorico(prev => [...prev, { id: Date.now(), autor: 'bot', texto }]);
    }, 600);
  };

  const lidarComEnvioTexto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const respostaUsuario = inputValue.trim();
    setHistorico(prev => [...prev, { id: Date.now(), autor: 'usuario', texto: respostaUsuario }]);
    setInputValue('');

    if (passo === 3) {
      const idadeNum = parseInt(respostaUsuario);
      if (isNaN(idadeNum)) {
        botFalar("Por favor, me diga sua idade apenas em números.");
        return;
      }
      if (idadeNum < 18) {
        setDadosSimulacao(prev => ({ ...prev, idade: idadeNum }));
        setPasso(99);
        botFalar(
          <div className="text-amber-500 font-medium">
            Ficamos muito felizes com o seu cuidado com o futuro! Contudo, por diretrizes e regulamentações do mercado de seguros, a contratação de apólices como titular é exclusiva para maiores de 18 anos.
          </div>
        );
        return;
      }
      setDadosSimulacao(prev => ({ ...prev, idade: idadeNum }));
      setPasso(4);
      botFalar("Para que eu possa entender melhor suas necessidades, qual dessas opções descreve melhor o seu momento?");
    }

    // PASSO 6: Captura do e-mail assim que ele digita após escolher o plano
    if (passo === 6) {
      if (!respostaUsuario.includes('@') || !respostaUsuario.includes('.')) {
        botFalar("Por favor, digite um e-mail válido (exemplo@email.com) para que possamos prosseguir.");
        return;
      }

      // Redireciona com todas as informações coletadas, incluindo o e-mail
      navigate('/cadastro', { 
        state: { 
          nomePrePreenchido: dadosSimulacao.nome,
          idadePrePreenchida: dadosSimulacao.idade,
          emailPrePreenchido: respostaUsuario,
          planoSelecionadoId: dadosSimulacao.planoTemporarioId,
          valorFinalCalculado: dadosSimulacao.valorTemporarioFinal
        } 
      });
    }
  };

  const lidarComCliqueBotao = (opcaoTexto: string, acao: () => void) => {
    setHistorico(prev => [...prev, { id: Date.now(), autor: 'usuario', texto: opcaoTexto }]);
    acao();
  };

  // Alterado para interceptar a contratação, pedir o e-mail no chat e avançar para o Passo 6
  const handleContratar = (planoId: number, valorFinal: number) => {
    const planoSelecionado = MOCK_PLANOS.find(p => p.id === planoId);
    
    setDadosSimulacao(prev => ({
      ...prev,
      planoTemporarioId: planoId,
      valorTemporarioFinal: valorFinal
    }));

    setPasso(6);
    botFalar(`Excelente escolha com o ${planoSelecionado?.nome}! Para finalizarmos e gerarmos a sua proposta com segurança, digite o seu melhor e-mail abaixo:`);
  };

  return (
    <div className="min-h-screen bg-[#0F2221] text-white flex flex-col font-['Poppins',sans-serif] relative overflow-x-hidden antialiased">
      
      {/* 1. OVERLAY ESCURO PARA O MENU */}
      {menuAberto && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity animate-fadeIn" onClick={() => setMenuAberto(false)} />
      )}

      {/* 2. MENU LATERAL DIREITO INTEGRADO (DRAWER) */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-[#0F2221] border-l border-white/5 p-6 z-50 flex flex-col gap-6 shadow-2xl transition-transform duration-300 ease-in-out ${
        menuAberto ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <span className="font-bold text-xs tracking-widest uppercase text-white/40">Opções</span>
          <button onClick={() => setMenuAberto(false)} className="p-1 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors">
            <X size={20} weight="bold" />
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium hover:bg-white/5 text-white/80 hover:text-white transition-all"><House size={18} className="text-[#FF7A38]" /> Voltar para Home</Link>
          <Link to="/sobre" className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium hover:bg-white/5 text-white/80 hover:text-white transition-all"><Info size={18} className="text-[#FF7A38]" /> Sobre a Vittalis</Link>
          <Link to="/planos" className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium hover:bg-white/5 text-white/80 hover:text-white transition-all"><Handshake size={18} className="text-[#FF7A38]" /> Nossos Planos</Link>
        </nav>
      </div>

      {/* 3. CABEÇALHO INTEGRADO */}
      <div className="bg-[#0F2221] px-6 py-5 flex items-center justify-between sticky top-0 z-30 max-w-3xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-white">vittalis<span className="text-[#FF7A38]">.</span></span>
        </div>
        
        <button 
          onClick={() => setMenuAberto(true)}
          className="p-2 hover:bg-white/5 rounded-xl text-white/80 hover:text-[#FF7A38] transition-all"
        >
          <List size={22} weight="bold" />
        </button>
      </div>

      {/* 4. ÁREA DE MENSAGENS DO CHAT */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-6 py-4 flex flex-col gap-5 overflow-y-auto pb-36">
        {historico.map((msg) => (
          <MensagemBalao key={msg.id} mensagem={msg} />
        ))}

        {/* Passo 1: Botão Inicial de Engajamento */}
        {passo === 1 && (
          <div className="flex justify-start mt-2">
            <button
              onClick={() => {
                setPasso(2);
                setHistorico(prev => [...prev, { id: Date.now(), autor: 'usuario', texto: "Quero fazer minha simulação" }]);
                botFalar("Ótimo! Para começarmos a desenhar a sua proposta, por qual nome você prefere que eu te chame?");
              }}
              className="bg-[#FF7A38] hover:bg-[#e2662a] text-white font-bold px-6 py-3.5 rounded-2xl transition-all shadow-lg flex items-center gap-2 text-xs tracking-wide hover:scale-[1.01]"
            >
              Iniciar Simulação <ArrowRight size={14} weight="bold" />
            </button>
          </div>
        )}

        {/* Passo 2: Input Nome */}
        {passo === 2 && (
          <div className="flex justify-end mt-2 animate-fadeIn w-full">
            <div className="bg-[#12312F] p-3 rounded-2xl border border-white/5 flex w-full max-w-md gap-2 shadow-xl focus-within:border-[#FF7A38] transition-colors">
              <input
                type="text"
                placeholder="Digite seu nome completo ou apelido..."
                className="bg-transparent flex-1 outline-none text-sm text-white px-2 placeholder:text-white/20"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && inputValue.trim() && lidarComCliqueBotao(inputValue, () => {
                  setDadosSimulacao(prev => ({ ...prev, nome: inputValue }));
                  setPasso(3);
                  setInputValue('');
                  botFalar(`Que prazer te conhecer, ${inputValue}! Sabendo o seu nome, agora me conta: qual a sua idade atual?`);
                })}
              />
              <button 
                onClick={() => {
                  if(!inputValue.trim()) return;
                  setDadosSimulacao(prev => ({ ...prev, nome: inputValue }));
                  lidarComCliqueBotao(inputValue, () => { setPasso(3); setInputValue(''); botFalar(`Que prazer te conhecer, ${inputValue}! Me conta agora: qual a sua idade atual?`); });
                }}
                className="text-[#FF7A38] p-2 hover:bg-white/5 rounded-xl transition-colors"
              >
                <PaperPlaneRight size={18} weight="fill" />
              </button>
            </div>
          </div>
        )}

        {/* Passo 3: Input Idade */}
        {passo === 3 && (
          <div className="flex justify-end mt-2 animate-fadeIn w-full">
            <form onSubmit={lidarComEnvioTexto} className="bg-[#12312F] p-3 rounded-2xl border border-white/5 flex w-full max-w-md gap-2 shadow-xl focus-within:border-[#FF7A38] transition-colors">
              <input type="number" placeholder="Digite sua idade (Ex: 29)..." className="bg-transparent flex-1 outline-none text-sm text-white px-2 placeholder:text-white/20" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
              <button type="submit" className="text-[#FF7A38] p-2 hover:bg-white/5 rounded-xl transition-colors"><PaperPlaneRight size={18} weight="fill" /></button>
            </form>
          </div>
        )}

        {/* Passo 4: Escolha de Perfil (Expandido mantendo a fidelidade das classes e grid original) */}
        {passo === 4 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 max-w-lg w-full animate-fadeIn">
            <button 
              onClick={() => lidarComCliqueBotao("Gostaria de uma Proteção Essencial", () => { 
                setDadosSimulacao(prev => ({ ...prev, perfil: 'Essencial' })); 
                setPasso(5); 
                botFalar(`Excelente. Montei a proposta do plano Essencial ideal para o seu perfil:`); 
              })} 
              className="bg-[#12312F] hover:border-[#FF7A38] border border-white/5 p-5 rounded-2xl text-left transition-all flex flex-col gap-1 shadow-md hover:-translate-y-0.5"
            >
              <span className="text-sm font-bold text-[#FF7A38]">Proteção Essencial</span>
              <p className="text-[11px] text-white/50 leading-relaxed">Cuidado básico, enxuto e ideal para iniciar sua segurança.</p>
            </button>

            <button 
              onClick={() => lidarComCliqueBotao("Gostaria de uma Proteção Individual", () => { 
                setDadosSimulacao(prev => ({ ...prev, perfil: 'Individual' })); 
                setPasso(5); 
                botFalar(`Pensando no seu bem-estar individual, montei o plano ideal. Você pode alternar entre as abas Mensal e Anual para ver as condições com desconto:`); 
              })} 
              className="bg-[#12312F] hover:border-[#FF7A38] border border-white/5 p-5 rounded-2xl text-left transition-all flex flex-col gap-1 shadow-md hover:-translate-y-0.5"
            >
              <span className="text-sm font-bold text-[#FF7A38]">Proteção Individual</span>
              <p className="text-[11px] text-white/50 leading-relaxed">Foco em segurança para profissionais autônomos, diárias hospitalares e doenças graves.</p>
            </button>

            <button 
              onClick={() => lidarComCliqueBotao("Estou buscando Proteção Familiar", () => { 
                setDadosSimulacao(prev => ({ ...prev, perfil: 'Familia' })); 
                setPasso(5); 
                botFalar(`Pensando em quem você mais ama, separei essa proposta familiar. Veja os valores mensais e anuais abaixo:`); 
              })} 
              className="bg-[#12312F] hover:border-[#FF7A38] border border-white/5 p-5 rounded-2xl text-left transition-all flex flex-col gap-1 shadow-md hover:-translate-y-0.5"
            >
              <span className="text-sm font-bold text-[#FF7A38]">Proteção Familiar</span>
              <p className="text-[11px] text-white/50 leading-relaxed">Garante o amparo financeiro de filhos, cônjuge ou dependentes queridos caso você falte.</p>
            </button>

            <button 
              onClick={() => lidarComCliqueBotao("Gostaria de uma Proteção Empresarial", () => { 
                setDadosSimulacao(prev => ({ ...prev, perfil: 'Empresarial' })); 
                setPasso(5); 
                botFalar(`Proteção e segurança corporativa para o seu negócio e funcionários. Veja a proposta PME:`); 
              })} 
              className="bg-[#12312F] hover:border-[#FF7A38] border border-white/5 p-5 rounded-2xl text-left transition-all flex flex-col gap-1 shadow-md hover:-translate-y-0.5"
            >
              <span className="text-sm font-bold text-[#FF7A38]">Proteção Empresarial</span>
              <p className="text-[11px] text-white/50 leading-relaxed">Ideal para sócios e pequenas/médias empresas que precisam de estabilidade corporativa.</p>
            </button>
          </div>
        )}

        {/* Passo 5: Cards Finais com Filtro por Perfil */}
        {passo === 5 && (
          <div className="w-full flex flex-col gap-6 mt-2 items-start animate-fadeIn">
            <div className="bg-[#12312F] p-1.5 rounded-xl border border-white/5 flex items-center gap-2 shadow-inner">
              <button onClick={() => setTipoCobranca('mensal')} className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all ${tipoCobranca === 'mensal' ? 'bg-[#FF7A38] text-white' : 'text-white/40'}`}>Mensal</button>
              <button onClick={() => setTipoCobranca('anual')} className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1 ${tipoCobranca === 'anual' ? 'bg-emerald-600 text-white' : 'text-white/40'}`}>Anual <span className="bg-white/10 text-[9px] px-1 rounded flex items-center text-emerald-400"><Percent size={9} /> 10% OFF</span></button>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
              {MOCK_PLANOS.filter(p => {
                if (dadosSimulacao.perfil === 'Essencial') return p.id === 1;
                if (dadosSimulacao.perfil === 'Individual') return p.id === 2;
                if (dadosSimulacao.perfil === 'Familia') return p.id === 3;
                if (dadosSimulacao.perfil === 'Empresarial') return p.id === 4;
                return false;
              }).map((plano) => (
                <CardPlanoChat key={plano.id} plano={plano} tipoCobranca={tipoCobranca} idade={dadosSimulacao.idade} onContratar={handleContratar} />
              ))}
            </div>

            <button onClick={() => { setPasso(1); setDadosSimulacao({ nome: '', idade: 0, perfil: '' }); setHistorico([{ id: Date.now(), autor: 'bot', texto: "Vamos reiniciar a simulação para desenhar outro perfil?" }]); }} className="text-xs text-white/40 hover:text-white flex items-center gap-1 transition-colors pl-2">
              <ArrowClockwise size={12} /> Refazer Simulação
            </button>
          </div>
        )}

        {/* PASSO 6: Entrada de Email Ativada Instantaneamente Após a Escolha do Card */}
        {passo === 6 && (
          <div className="flex justify-end mt-2 animate-fadeIn w-full">
            <form onSubmit={lidarComEnvioTexto} className="bg-[#12312F] p-3 rounded-2xl border border-white/5 flex w-full max-w-md gap-2 shadow-xl focus-within:border-[#FF7A38] transition-colors">
              <input type="email" placeholder="Digite seu melhor e-mail para concluir..." className="bg-transparent flex-1 outline-none text-sm text-white px-2 placeholder:text-white/20" value={inputValue} onChange={(e) => setInputValue(e.target.value)} required />
              <button type="submit" className="text-[#FF7A38] p-2 hover:bg-white/5 rounded-xl transition-colors"><PaperPlaneRight size={18} weight="fill" /></button>
            </form>
          </div>
        )}

        {/* Passo 99: Bloqueio Humanizado */}
        {passo === 99 && (
          <div className="flex justify-start mt-2 animate-fadeIn w-full max-w-xs">
            <button onClick={() => { setPasso(1); setDadosSimulacao({ nome: '', idade: 0, perfil: '' }); setHistorico([{ id: Date.now(), autor: 'bot', texto: "Vamos recomeçar a nossa simulação?" }]); }} className="w-full bg-white/5 border border-white/5 hover:bg-white/10 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow"><ArrowClockwise size={16} /> Corrigir Idade / Reiniciar</button>
          </div>
        )}

        <div ref={campoMensagensFimRef} />
      </div>
    </div>
  );
}