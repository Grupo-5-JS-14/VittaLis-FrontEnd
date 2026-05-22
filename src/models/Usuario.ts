import type Apolice from "./Apolice"
import type Plano from "./Plano"

export default interface Usuario {
    id: number
    nome: string
    usuario: string
    senha: string
    foto: string
    idade: number
    dataCadastro: string
    apolice?: Apolice | null
    plano?: Plano | null
}