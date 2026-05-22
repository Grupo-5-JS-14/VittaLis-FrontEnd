import type { Mensagem } from "./Tipos";

interface MensagemBalaoProps {
  mensagem: Mensagem;
}

export default function MensagemBalao({ mensagem }: MensagemBalaoProps) {
  const isBot = mensagem.autor === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-fadeIn`}>
      <div
        className={`max-w-[85%] sm:max-w-md p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
          isBot
            ? 'bg-white text-slate-800 rounded-tl-none font-medium'
            : 'bg-[#FF7A38] text-white rounded-tr-none font-semibold'
        }`}
      >
        {mensagem.texto}
      </div>
    </div>
  );
}