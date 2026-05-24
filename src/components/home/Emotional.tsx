import { Heart, ShieldCheck, Sparkles } from "lucide-react";

export default function Emotional() {
  const newLocal =
    "bg-[#12312F] text-white py-20 relative overflow-hidden font-['Poppins',_sans-serif]";
  return (
    <section className={newLocal}>
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FF7A38_1px,transparent_1px)] bg-size-[16px_16px]"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-white/10 text-orange-400 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-8 backdrop-blur-xs">
          <Heart className="h-3.5 w-3.5 fill-current text-[#FF7A38]" />
          <span className="text-slate-200">
            A gente cuida do que você estima
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-4xl mx-auto">
          Viver sem medo do amanhã é a melhor escolha que você pode fazer{" "}
          <span className="text-[#FF7A38]">hoje.</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed">
          Nós cuidamos da burocracia para você focar apenas em colecionar
          memórias.
        </p>

        <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Sem letras miúdas</span>
          </div>
          <div className="w-1 h-1 bg-slate-600 rounded-full hidden sm:block"></div>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span>Proteção ativa no mesmo dia</span>
          </div>
        </div>
      </div>
    </section>
  );
}
