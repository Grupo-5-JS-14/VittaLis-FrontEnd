import type Apolice from "../../models/Apolice";

interface CardApoliceProps {
    apolice: Apolice
}

function CardApolice({ apolice }: CardApoliceProps) {
    return (
        <article>
            <p>Apólice #{apolice.id}</p>
            <p>Status: {apolice.status ? "Ativa" : "Cancelada"}</p>
            <p>Valor final: R$ {apolice.valorFinal?.toFixed(2)}</p>
        </article>
    )
}

export default CardApolice;
