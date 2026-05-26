import CardResumo from "./CardResumo";
import type { ItemCardResumo } from "./tipos";

interface CardsResumoProps {
  cards: ItemCardResumo[];
}

function CardsResumo({ cards }: CardsResumoProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <CardResumo key={card.label} card={card} />
      ))}
    </div>
  );
}

export default CardsResumo;
