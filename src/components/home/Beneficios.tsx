import { ShieldCheck, Zap, HeartHandshake, Sparkles } from "lucide-react";

const itensBeneficios = [
  {
    icon: <Zap className="h-5 w-5 text-text" />,
    title: "Agilidade",
    description: "Contratação 100% online, sem papelada ou fila de espera.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-text" />,
    title: "Proteção de verdade",
    description: "Cobrindo o que os outros seguros deixam de fora.",
  },
  {
    icon: <HeartHandshake className="h-5 w-5 text-text" />,
    title: "Socorro a um clique",
    description: "Dinheiro na conta rápido quando você mais precisar.",
  },
  {
    icon: <Sparkles className="h-5 w-5 text-text" />,
    title: "Preço justo, sem pegadinhas",
    description:
      "Você sabe exatamente o que está pagando desde o primeiro dia.",
  },
];

export default function Beneficios() {
  return (
    <section className="w-full bg-[#F5F7F6] pb-16 font-['Poppins',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-slate-200/60">
          {itensBeneficios.map((beneficio, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 md:justify-center lg:justify-start group"
            >
              <div className="p-3 bg-[#EAECEB] rounded-full shrink-0 group-hover:bg-text/10 transition-colors duration-200">
                {beneficio.icon}
              </div>

              <div className="flex flex-col">
                <h4 className="text-sm font-bold text-text leading-tight tracking-tight">
                  {beneficio.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug max-w-50">
                  {beneficio.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}