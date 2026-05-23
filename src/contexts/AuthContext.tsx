import {createContext, useState, type ReactNode} from "react"
import { toast } from "sonner"
import { login } from "../services/Service"
import type UsuarioLogin from "../models/UsuarioLogin"

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext =
    createContext<AuthContextProps>(
        {} as AuthContextProps
    )

export function AuthProvider({
    children
}: AuthProviderProps) {

    const [usuario, setUsuario] =
        useState<UsuarioLogin>({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })

    const [isLoading, setIsLoading] =
        useState(false)

    async function handleLogin(
        usuarioLogin: UsuarioLogin
    ) {

        setIsLoading(true)

        try {

            await login(
                `/usuarios/logar`,
                usuarioLogin,
                setUsuario
            )

            toast.success(
                "Login realizado com sucesso!"
            )

        } catch (error) {

            toast.error(
                "Usuário ou senha inválidos!"
            )

        }

        setIsLoading(false)
    }

    function handleLogout() {

        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })

        toast.success(
            "Logout realizado!"
        )
    }

    return (

        <AuthContext.Provider
            value={{
                usuario,
                handleLogout,
                handleLogin,
                isLoading
            }}
        >

            {children}

        </AuthContext.Provider>
    )
}