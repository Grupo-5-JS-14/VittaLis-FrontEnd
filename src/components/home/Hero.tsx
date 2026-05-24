import { Play, Heart } from 'lucide-react';

export default function Hero() {
  const handleCotacaoRapida = () => {
    console.log("Iniciando cotação rápida...");
  };

  return (
    <section className="w-full bg-[#12312F] text-white pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden relative font-['Poppins',sans-serif]">
      {/* Marca d'água sutil do coração ao fundo */}
      <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
        <Heart className="w-150 h-150" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo - Conteúdo e Textos */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            
            {/* Badge de Seguro Descomplicado */}
            <div className="inline-flex items-center space-x-2 bg-white/10 w-fit px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-6 backdrop-blur-xs">
              <Heart className="h-3.5 w-3.5 fill-current text-orange-400" />
              <span className="text-slate-200">Seguro de vida descomplicado</span>
            </div>

            {/* Título Principal com destaque em Laranja */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Mais que um seguro, um compromisso com o que mais importa: <span className="text-[#FF7A38]">a sua vida.</span>
            </h1>
            
            {/* Descrição */}
            <p className="text-sm sm:text-base text-slate-300 mt-6 max-w-xl leading-relaxed">
              Proteção financeira para você e tranquilidade para quem mais importa.
            </p>

            {/* Botões de Ação */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleCotacaoRapida}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3.5 text-sm font-bold rounded-xl text-white bg-[#FF7A38] hover:bg-[#e2662a] transition-all cursor-pointer"
              >
                Fazer minha cotação
              </button>
              
              <button className="w-full sm:w-auto flex items-center justify-center px-6 py-3.5 text-sm font-bold rounded-xl text-white border border-white/30 bg-transparent hover:bg-white/5 transition-all space-x-2 cursor-pointer">
                <div className="p-1 bg-white/20 rounded-full">
                  <Play className="h-3 w-3 fill-current" />
                </div>
                <span>Como funciona</span>
              </button>
            </div>
          </div>

          {/* Lado Direito - Imagem e Card Flutuante */}
          <div className="lg:col-span-6 flex justify-center relative mt-8 lg:mt-0">
            
            {/* Container da Imagem */}
            <div className="relative w-full max-w-125 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt="Família Sorrindo Vittalis"
                className="object-cover w-full h-87.5 sm:h-105"
              />
            </div>
            
            {/* Card de Status Flutuante Branco */}
            <div className="absolute -bottom-6 right-2 sm:right-6 bg-white text-[#12312F] p-4 rounded-2xl shadow-xl border border-slate-100 flex items-start space-x-3 max-w-65">
              <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600 mt-0.5">
                <div className="w-5 h-5 border-2 border-emerald-600 rounded-full flex items-center justify-center text-[10px] font-bold">✓</div>
              </div>
              <div>
                <p className="text-xs text-slate-400">Sua proteção</p>
                <p className="text-base font-bold text-[#12312F] leading-tight">Ativa</p>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">Você e sua família protegidos hoje e sempre.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}