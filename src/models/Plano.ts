import type Apolice from "./Apolice"
import type Usuario from "./Usuario"

export default interface Plano {
    id: number
    nome: string
    descricao: string
    valor: number
    usuario?: Usuario | null
    apolice?: Apolice | null
}