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

const USUARIO_STORAGE_KEY = 'usuario'

const usuarioInicial: UsuarioLogin = {
  id: 0,
  nome: '',
  usuario: '',
  senha: '',
  foto: '',
  token: '',
}

function carregarUsuarioSalvo() {
  const usuarioSalvo = localStorage.getItem(USUARIO_STORAGE_KEY)

  if (!usuarioSalvo) {
    return usuarioInicial
  }

  try {
    return {
      ...usuarioInicial,
      ...JSON.parse(usuarioSalvo)
    }
  } catch {
    localStorage.removeItem(USUARIO_STORAGE_KEY)
    return usuarioInicial
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>(carregarUsuarioSalvo)
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true)

    try {
      await login(`/usuarios/logar`, usuarioLogin, (dadosUsuario: UsuarioLogin) => {
        const usuarioAutenticado = {
          ...usuarioInicial,
          ...dadosUsuario
        }

        setUsuario(usuarioAutenticado)
        localStorage.setItem(
          USUARIO_STORAGE_KEY,
          JSON.stringify(usuarioAutenticado)
        )
      })

      toast.success('Login realizado com sucesso!')
    } catch {
      toast.error('Usuário ou senha inválidos!')
    } finally {
      setIsLoading(false)
    }
  }

  function handleLogout() {
    setUsuario(usuarioInicial)
    localStorage.removeItem(USUARIO_STORAGE_KEY)

    toast.success('Logout realizado!')
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
