import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, X } from 'lucide-react';

interface FAQItem {
  pergunta: string;
  resposta: string;
}

export default function Ajuda() {
  const [abertoFAQ, setAbertoFAQ] = useState<number | null>(null);
  const [mostrarPopUp, setMostrarPopUp] = useState<boolean>(false);

  const faqs: FAQItem[] = [
    {
      pergunta: "Como funciona o processo de simulação?",
      resposta: "É simples! Você clica em 'Fazer minha cotação' no menu inicial, preenche seus dados básicos e nossa plataforma calcula instantaneamente as melhores opções de cobertura para o seu perfil."
    },
    {
      pergunta: "Quais são as formas de pagamento aceitas?",
      resposta: "Aceitamos cartões de crédito (com possibilidade de parcelamento sem juros), boleto bancário e PIX com desconto na primeira parcela."
    },
    {
      pergunta: "Existe carência para o uso do seguro?",
      resposta: "A maioria das nossas coberturas por acidentes tem ativação imediata após a confirmação do pagamento. Para casos específicos, os detalhes ficam explícitos na sua apólice de forma clara."
    },
    {
      pergunta: "Como posso acionar o suporte em caso de sinistro?",
      resposta: "Você pode acionar diretamente pela sua área logada na plataforma ou por meio dos nossos canais de atendimento telefônico 24h disponíveis no rodapé da página."
    }
  ];

  const toggleFAQ = (index: number) => {
    setAbertoFAQ(abertoFAQ === index ? null : index);
  };

  return (
    <section className="w-full min-h-screen bg-text text-white pt-24 pb-24 font-['Poppins',sans-serif] relative overflow-hidden">
      
      {/* Detalhes de iluminação de fundo */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FF7A38]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho da Página */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <HelpCircle className="w-4 h-4 text-[#FF7A38]" />
            <span className="text-xs font-medium text-slate-300">Central de Suporte</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Como podemos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A38] to-[#ff9866]">ajudar você hoje?</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base font-light">
            Encontre respostas rápidas para as principais dúvidas sobre nossas coberturas e serviços.
          </p>
        </div>

        {/* Lista de FAQs (Accordion) */}
        <div className="space-y-4 mb-20">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left font-medium hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-sm sm:text-base pr-4 text-slate-200">{faq.pergunta}</span>
                {abertoFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-[#FF7A38] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  abertoFAQ === index ? 'max-h-40 border-t border-white/5' : 'max-h-0'
                }`}
              >
                <p className="p-6 text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                  {faq.resposta}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Seção Final - Botão Falar com Especialista */}
        <div className="text-center p-8 rounded-[32px] bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-md max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Não encontrou o que precisava?</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">
            Nossos consultores estão prontos para oferecer um atendimento personalizado e humanizado para você.
          </p>
          <button
            onClick={() => setMostrarPopUp(true)}
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold rounded-2xl text-white bg-gradient-to-r from-[#FF7A38] to-[#e2662a] hover:opacity-95 transition-all shadow-[0_4px_20px_rgba(255,122,56,0.2)] hover:scale-[1.02] active:scale-100 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            Falar com especialista
          </button>
        </div>

      </div>

      {/* ========================================== */}
      {/* POP-UP / MODAL (Marlos Bot)                */}
      {/* ========================================== */}
      {mostrarPopUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          
          {/* Overlay de fundo escuro escurecendo a tela */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setMostrarPopUp(false)}
          />

          {/* Card do Pop-up */}
          <div className="relative bg-[#0F1424] border border-white/10 rounded-[32px] overflow-hidden max-w-sm w-full shadow-2xl z-10 p-6 flex flex-col items-center text-center space-y-4 animate-scaleUp">
            
            {/* Botão Fechar */}
            <button
              onClick={() => setMostrarPopUp(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Container da Imagem */}
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/5 shadow-inner mt-4">
              <img 
                src="/src/assets/marlosbot.jpg" 
                alt="Marlos Bot Especialista" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback caso o caminho do asset mude temporariamente
                  console.log("Erro ao carregar marlosbot.jpg");
                }}
              />
            </div>

            {/* Texto do Pop-up */}
            <div className="pt-2">
              <h4 className="text-lg font-bold text-white">Marlos Bot</h4>
              <p className="text-xs text-[#FF7A38] font-medium tracking-wide uppercase">Especialista de Plantão</p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                "Bip bop! Estou processando sua solicitação de contato com precisão computacional."
              </p>
            </div>

            {/* Ação de fechamento/ok */}
            <button
              onClick={() => setMostrarPopUp(false)}
              className="w-full py-3 text-xs font-bold rounded-xl text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              Entendido
            </button>

          </div>
        </div>
      )}

    </section>
  );
}