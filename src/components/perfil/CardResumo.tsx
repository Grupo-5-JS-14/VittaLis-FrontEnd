import type { ItemCardResumo } from "./tipos";

interface CardResumoProps {
  card: ItemCardResumo;
}

function CardResumo({ card }: CardResumoProps) {
  const Icon = card.icon;

  return (
    <article className="flex min-h-24.5 items-center gap-4 rounded-md border border-[#e1ebe8] bg-white px-5 shadow-[0_12px_30px_rgba(0,91,91,0.07)]">
      <div
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${card.tone}`}
      >
        <Icon size={25} />
      </div>
      <div>
        <p className="text-xs font-medium text-[#647b78]">{card.label}</p>
        <p
          className={`mt-1 font-extrabold text-[#005b5b] ${
            card.wide ? "text-xl" : "text-3xl"
          }`}
        >
          {card.value}
        </p>
        <p className="text-xs font-medium text-[#647b78]">{card.note}</p>
      </div>
    </article>
  );
}

export default CardResumo;
