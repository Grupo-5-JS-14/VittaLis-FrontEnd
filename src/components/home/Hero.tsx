import { Play, Heart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Hero() {
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleCotacaoRapida = () => {
    console.log('Iniciando cotação rápida...');
    navigate('/simulacao');
  };

  return (
    <>
      <section className="w-full bg-text text-white pt-24 pb-24 lg:pt-32 lg:pb-36 overflow-hidden relative font-['Poppins',sans-serif]">
        
        {/* Luzes difusas de fundo */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF7A38]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Marca d'água coração */}
        <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center pointer-events-none">
          <Heart className="w-150 h-150 stroke-1" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* LADO ESQUERDO */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-8">
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-linear-to-br from-white via-white to-slate-400">
                Mais que um seguro, um compromisso com o que{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF7A38] to-[#ff9866]">
                  realmente importa.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed font-light">
                Cuidamos do seu amanhã para que você possa viver o hoje intensamente.
                Proteção simplificada, suporte humano e total segurança para a sua jornada.
              </p>

              {/* BOTÕES */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                
                {/* Cotação */}
                <button
                  onClick={handleCotacaoRapida}
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-4 text-sm font-bold rounded-2xl text-white bg-linear-to-r from-[#FF7A38] to-[#e2662a] hover:opacity-95 transition-all shadow-[0_4px_20px_rgba(255,122,56,0.3)] hover:shadow-[0_6px_24px_rgba(255,122,56,0.5)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Fazer minha cotação
                </button>

                {/* Vídeo popup */}
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-4 text-sm font-bold rounded-2xl text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-md space-x-3 group cursor-pointer"
                >
                  <div className="p-1.5 bg-white/10 rounded-xl group-hover:scale-110 transition-transform">
                    <Play className="h-3.5 w-3.5 fill-current text-slate-200" />
                  </div>

                  <span className="text-slate-200">
                    Seguro Descomplicado
                  </span>
                </button>
              </div>
            </div>

            {/* LADO DIREITO */}
            <div className="lg:col-span-6 flex justify-center relative mt-8 lg:mt-0">
              
              <div className="relative w-full max-w-135 aspect-4/5 sm:aspect-4/4.5 rounded-[40px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.5)] border border-white/5 bg-slate-900 group">
                
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                >
                  <source src="/hero.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-linear-to-t from-[#0B0F19]/60 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-slate-950/10 z-10 mix-blend-multiply" />
              </div>

              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-linear-to-br from-[#FF7A38]/20 to-transparent rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* POPUP DO VÍDEO */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          
          <div className="relative w-full max-w-5xl rounded-[32px] overflow-hidden bg-black border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.6)]">

            {/* Fechar */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Vídeo */}
            <video
              autoPlay
              controls
              controlsList="nodownload"
              className="w-full max-h-[85vh] bg-black"
            >
              <source src="/Vitallis.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </>
  );
}