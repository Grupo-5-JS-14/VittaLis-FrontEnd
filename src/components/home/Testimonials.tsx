import { Star } from 'lucide-react';

export default function TestimonialsBento() {
  const pequenosDepoimentos = [
    {
      name: "Noelia Nogueira",
      location: "São Paulo, SP",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80",
      text: "Fiz a simulação e contratei tudo direto pelo celular. O atendimento humanizado pelo WhatsApp me deu toda a segurança que eu precisava."
    },
    {
      name: "Afonso Oliveira",
      location: "Belo Horizonte, MG",
      avatar: "https://images.unsplash.com/photo-1759701546655-d90ec831aa52?q=80",
      text: "O preço é bizarramente justo pelo nível de tranquilidade que entrega. Sem letras miúdas ou taxas escondidas."
    },
    {
      name: "Marcos Silva",
      location: "Curitiba, PR",
      avatar: "https://images.unsplash.com/photo-1733348137551-dde596fd3cf5?q=80",
      text: "Finalmente uma empresa de seguros moderna que fala a nossa língua e não tenta complicar o que deveria ser simples."
    }
  ];

  return (
    <section className="py-20 bg-[#F5F7F6] font-['Poppins',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bloco Principal do Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* CARD 1 - verde escuro */}
          <div className="lg:col-span-4 bg-[#12312F] text-white p-8 rounded-3xl flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex space-x-1 text-[#FF7A38] mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-lg sm:text-xl font-medium leading-relaxed">
                "Não consigo expressar o alívio que é saber que quem eu amo está protegido. Foi o melhor investimento que fiz pela minha paz de espírito."
              </p>
            </div>
            
            <div className="mt-8 flex items-center space-x-3">
              <img 
                src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?q=80" 
                alt="Jessica" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <p className="text-sm font-bold">Jessica Souza</p>
                <p className="text-xs text-slate-300">Rio de Janeiro, RJ</p>
              </div>
            </div>
          </div>

          {/* 2. Card Imagem 1 */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden relative min-h-80 shadow-xs">
            <img 
              src="https://images.unsplash.com/photo-1510154221590-ff63e90a136f?q=80" 
              alt="Cliente Vittalis" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* 3. Card Imagem 2 */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden min-h-60 shadow-xs hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1756982477704-bf7b4faf7772?q=80" 
              alt="Cliente Vittalis" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* 4. Coluna de Métricas/Números */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-6 py-4 px-2">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-[#12312F]">10K+</p>
              <p className="text-xs font-semibold text-[#FF7A38] uppercase tracking-wider mt-1">Vidas Protegidas</p>
            </div>
            <div className="h-px bg-slate-200/60 w-16"></div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-[#12312F]">98%</p>
              <p className="text-xs font-semibold text-[#FF7A38] uppercase tracking-wider mt-1">De Aprovação Real</p>
            </div>
          </div>

          {/* 5. Fileira de Cards */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pequenosDepoimentos.map((rev, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-3xl border border-slate-100/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  "{rev.text}"
                </p>
                
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-50">
                  <img 
                    src={rev.avatar} 
                    alt={rev.name} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#12312F] truncate">{rev.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{rev.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}