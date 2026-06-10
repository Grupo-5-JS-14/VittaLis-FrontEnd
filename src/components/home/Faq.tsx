import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  pergunta: string;
  resposta: string;
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      pergunta: "Como funciona a contratação? Tem muita papelada?",
      resposta:
        "Esqueça a burocracia das seguradoras antigas. Aqui o processo é 100% digital. Você escolhe suas coberturas pelo celular, faz a simulação e ativa sua proteção em menos de 5 minutos, sem precisar preencher formulários infinitos.",
    },
    {
      pergunta: "O preço do seguro aumenta todo ano de forma abusiva?",
      resposta:
        "Não. Nossos planos são baseados na transparência total. Os reajustes seguem estritamente os índices oficiais calculados para a sua faixa etária, garantindo previsibilidade para o seu bolso sem surpresas no fim do mês.",
    },
    {
      pergunta: "Consigo mudar minhas coberturas ou cancelar depois?",
      resposta:
        "Com certeza! A vida muda e os seus planos também. Você tem total liberdade para aumentar, reduzir suas coberturas ou cancelar sua assinatura quando quiser, sem qualquer tipo de multa, carência ou fidelidade presa.",
    },
    {
      pergunta: "O que acontece em caso de imprevistos? Como acionar?",
      resposta:
        "O acionamento é direto, humanizado e rápido. Nossa equipe de especialistas fica disponível 24 horas por dia via WhatsApp para cuidar de todo o processo para você ou para os seus beneficiários, sem filas de espera.",
    },
    {
      pergunta: "Quem eu posso colocar como beneficiário no meu plano?",
      resposta:
        "Você tem total liberdade para escolher quem quiser como beneficiário, sejam familiares dependentes, parceiros ou pessoas sem vínculo consanguíneo direto. Você define quem recebe o suporte financeiro.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#F5F7F6] py-20 font-['Poppins',sans-serif]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl tracking-tight text-#12312F">
            Dúvidas frequentes
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base">
            Tudo o que você precisa saber sobre a Vittalis, direto ao ponto e sem pegadinhas.
          </p>
        </div>

        {/* Lista de Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden transition-all duration-200 border border-slate-100 shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
                >
                  <span className={`text-base font-bold transition-colors duration-150 ${
                    isOpen ? "text-[#FF7A38]" : "text-[#12312F] group-hover:text-[#FF7A38]"
                  }`}>
                    {faq.pergunta}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? "transform rotate-180 text-[#FF7A38]" : "text-slate-400"
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-75 border-t border-slate-50" : "max-h-0"
                  }`}
                >
                  <div className="p-6 text-sm sm:text-base text-slate-600 leading-relaxed bg-white">
                    {faq.resposta}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}