import { Briefcase, CheckCircle, Heart, ShieldCheck, Users, } from "lucide-react";

import type Plano from "../../models/Plano";
import ModalPlano from "./ModalPlano";

interface CardPlanoProps {
  plano: Plano;
  buscarPlanos: () => void;
  isAdmin: boolean;
  token: string;
  tipoCobranca: "mensal" | "anual";
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
