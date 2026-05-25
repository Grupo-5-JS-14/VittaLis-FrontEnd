import { ArrowRight } from '@phosphor-icons/react';
import type Plano from '../../models/Plano';

interface CardPlanoChatProps {
  plano: Plano;
  tipoCobranca: 'mensal' | 'anual';
  idade: number;
  onContratar: (planoId: number, valorFinal: number) => void;
}

export default function CardPlanoChat({ plano, tipoCobranca, idade, onContratar }: CardPlanoChatProps) {
  // 1. Aplica desconto de 10% no valor base vindo do banco caso escolha Anual
  const valorBaseComDesconto = tipoCobranca === 'anual' ? plano.valor * 0.9 : plano.valor;
  
  // 2. Aplica a taxa de risco baseada na idade inserida pelo usuário (Regra Vittalis)
  const valorFinalMensal = valorBaseComDesconto + (idade * 0.3);

  return (
    <div className="bg-white text-slate-800 p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col gap-4">
      <div className="absolute top-0 right-0 bg-[#12312F] text-white text-[9px] uppercase tracking-widest font-black px-4 py-1.5 rounded-bl-xl">
        Recomendado
      </div>
      
      <div>
        <h4 className="font-black text-lg text-[#12312F]">{plano.nome}</h4>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{plano.descricao}</p>
      </div>

      <div className="bg-[#12312F]/5 p-4 rounded-2xl border border-slate-100">
        <div className="flex items-baseline gap-1">
          <span className="text-xs font-semibold text-slate-500">R$</span>
          <span className="text-3xl font-black text-[#12312F] tracking-tight">
            {valorFinalMensal.toFixed(2)}
          </span>
          <span className="text-xs font-medium text-slate-500"> / mês</span>
        </div>
        {tipoCobranca === 'anual' && (
          <p className="text-[10px] text-emerald-600 font-bold mt-1.5 flex items-center gap-0.5">
            ✓ Economia garantida através do contrato anual
          </p>
        )}
      </div>

      <button
        onClick={() => onContratar(plano.id, valorFinalMensal)}
        className="w-full bg-[#FF7A38] hover:bg-[#e2662a] text-white font-black text-xs py-3.5 px-4 rounded-xl transition-all shadow-md uppercase tracking-wider mt-2 flex items-center justify-center gap-1.5"
      >
        Contratar Proteção Seguro <ArrowRight size={14} weight="bold" />
      </button>
    </div>
  );
}