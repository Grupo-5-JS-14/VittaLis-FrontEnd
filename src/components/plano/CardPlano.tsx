import type Planos from "../../models/Plano";

interface CardPlanosProps {
    planos: Planos
}

function CardPlanos({ planos }: CardPlanosProps) {
    return (
        <article>
            <p>{planos.nome}</p>
            <p>{planos.descricao}</p>
            <p>R$ {planos.valor?.toFixed(2)}</p>
        </article>
    )
}

export default CardPlanos;
