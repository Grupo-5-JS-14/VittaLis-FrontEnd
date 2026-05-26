import { createContext, useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { login } from '../services/Service'
import type UsuarioLogin from '../models/UsuarioLogin'

interface AuthContextProps {
  usuario: UsuarioLogin
  handleLogout(): void
  handleLogin(usuario: UsuarioLogin): Promise<void>
  isLoading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

export function AuthProvider({ children }: AuthProviderProps) {
  const usuarioSalvo = localStorage.getItem('usuario')

  const [usuario, setUsuario] = useState<UsuarioLogin>(
    usuarioSalvo
      ? JSON.parse(usuarioSalvo)
      : {
          id: 0,
          nome: '',
          usuario: '',
          senha: '',
          foto: '',
          token: '',
          acesso: '',
          role: '',
        }
  )

  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(usuarioLogin: UsuarioLogin) {
  try {
    await login(`/usuarios/logar`, usuarioLogin, (resposta: UsuarioLogin) => {
      const usuarioLogado = {
        ...resposta,
        token: resposta.token || resposta.acesso || "",
      };

      setUsuario(usuarioLogado);
      localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
    });

    toast.success("Usuário logado com sucesso");
  } catch (error) {
    toast.error("Dados do usuário inconsistentes");
  }
}

  function handleLogout() {
    setUsuario({
      id: 0,
      nome: '',
      usuario: '',
      senha: '',
      foto: '',
      token: '',
      acesso: '',
      role: '',
    })

    localStorage.removeItem('usuario')

    toast.success('Logout realizado!')
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        handleLogout,
        handleLogin,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}