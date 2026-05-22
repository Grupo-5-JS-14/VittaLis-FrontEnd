import type Plano from "./Plano"
import type Usuario from "./Usuario"

export default interface Apolice {
    id: number
    dataContratacao: string
    status: string
    valorFinal: number
    usuario?: Usuario
    plano?: Plano
}