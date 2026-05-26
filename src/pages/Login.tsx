import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import type UsuarioLogin from "../models/UsuarioLogin"
import { Eye, EyeOff } from "lucide-react"
import { ClipLoader } from "react-spinners"

function Login() {
    const navigate = useNavigate()

    // ─── SEUS DADOS INTEGROS AQUI ───
    const {
        usuario,
        handleLogin,
        isLoading
    } = useContext(AuthContext)

    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin)

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario, navigate]) // navigate adicionado aqui para seguir boas práticas de hooks

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    return (
        // h-screen + overflow-hidden mata qualquer barra de scroll na tela principal
        <section className="w-full h-screen bg-background flex font-sans antialiased overflow-hidden">

            {/* ─── LADO ESQUERDO: Estilo Minimalista Porto (Tipografia + Frase Nova) ─── */}
            <div className="hidden lg:flex w-[50%] h-full bg-surface flex-col justify-between p-16 xl:p-24 border-r border-border/50">
                
                {/* Logo Discreta no Topo */}
                <div className="h-10">
                    <img
                        src="/icon-verde.png"
                        alt="Logo VittaLis"
                        className="max-h-full object-contain"
                    />
                </div>

                {/* Frase Nova Escolhida por Você */}
                <div className="max-w-xl space-y-3">
                    <h1 className="text-primary text-5xl xl:text-6xl font-black tracking-tight leading-[1.1]">
                        Sua vida em <br />
                        <span className="relative inline-block">
                            equilíbrio.
                        </span>
                    </h1>
                    <p className="text-text-light text-lg font-medium pl-0.5">
                        A gente cuida do resto.
                    </p>
                </div>

                {/* Rodapé institucional discreto */}
                <div className="text-text-light/40 text-xs font-medium">
                    © {new Date().getFullYear()} VittaLis. Viva com tranquilidade.
                </div>
            </div>

            {/* ─── LADO DIREITO: Formulário Clean e Focado ─── */}
            <div className="flex-1 h-full flex flex-col justify-between p-8 md:p-12 lg:p-16 bg-background">

                {/* Link superior de alternância rápido */}
                <div className="flex justify-end items-center gap-3 w-full max-w-md mx-auto lg:mr-0 shrink-0">
                    <span className="text-text-light text-sm">Não tem conta?</span>
                    <Link
                        to="/cadastro"
                        className="text-secondary hover:text-secondary-dark font-bold text-sm transition-colors"
                    >
                        Cadastre-se
                    </Link>
                </div>

                {/* Bloco Central do Formulário */}
                <div className="w-full max-w-md mx-auto my-auto shrink-0">
                    <form onSubmit={login} className="space-y-8">

                        {/* Boas-vindas simples e humana */}
                        <div className="space-y-2">
                            <h2 className="text-primary text-3xl font-bold tracking-tight">
                                Olá! Que bom ver você por aqui.
                            </h2>
                            <p className="text-text-light text-sm">
                                Insira seus dados abaixo para acessar seu espaço seguro.
                            </p>
                        </div>

                        {/* Inputs com as variáveis do seu tema de design */}
                        <div className="space-y-5">
                            
                            {/* Campo E-mail */}
                            <div className="space-y-1">
                                <label htmlFor="usuario" className="block text-primary font-semibold text-xs">
                                    E-mail 
                                </label>
                                <input
                                    type="email"
                                    id="usuario"
                                    name="usuario"
                                    placeholder="nome@email.com"
                                    value={usuarioLogin.usuario || ''}
                                    onChange={atualizarEstado}
                                    className="w-full h-12 rounded-xl border border-border bg-surface px-4 text-sm text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                                    required
                                />
                            </div>

                            {/* Campo Senha */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="senha" className="block text-primary font-semibold text-xs">
                                        Sua senha
                                    </label>
                                    <button
                                        type="button"
                                        className="text-text-light hover:text-primary text-xs transition-colors"
                                    >
                                        Esqueceu?
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        type={mostrarSenha ? "text" : "password"}
                                        id="senha"
                                        name="senha"
                                        placeholder="Digite sua senha"
                                        value={usuarioLogin.senha || ''}
                                        onChange={atualizarEstado}
                                        className="w-full h-12 rounded-xl border border-border bg-surface pl-4 pr-12 text-sm text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setMostrarSenha(!mostrarSenha)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-primary transition-colors focus:outline-none"
                                    >
                                        {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Ações e Botão Principal */}
                        <div className="space-y-4 pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 rounded-button bg-secondary hover:bg-secondary-dark text-text-white text-sm font-bold tracking-wide flex items-center justify-center transition-all duration-200 shadow-button disabled:opacity-70 disabled:pointer-events-none active:scale-[0.99]"
                            >
                                {isLoading ? (
                                    <ClipLoader color="#ffffff" size={20} />
                                ) : (
                                    "Acessar minha conta"
                                )}
                            </button>

                            {/* Divisor neutro para login social */}
                            <div className="flex items-center gap-3 py-2">
                                <div className="flex-1 h-px bg-border" />
                                <span className="text-text-light text-xs">ou continue com</span>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            {/* Botão Google integrado */}
                            <button
                                type="button"
                                className="w-full h-12 rounded-xl border border-border bg-surface hover:bg-surface-soft transition-colors text-sm font-semibold text-text flex items-center justify-center gap-2.5"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.78 2.93c.89-2.67 3.39-4.45 6.83-4.45z" />
                                    <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.42 3.57l3.74 2.9c2.19-2.02 3.71-5 3.71-8.62z" />
                                    <path fill="#FBBC05" d="M5.17 14.77c-.23-.69-.37-1.43-.37-2.2s.14-1.51.37-2.2L1.39 7.44C.5 9.21 0 11.16 0 13.2s.5 3.99 1.39 5.76l3.78-2.99z" />
                                    <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.74-2.9c-1.1.74-2.51 1.18-4.22 1.18-3.44 0-5.94-1.78-6.83-4.45L1.39 16.9C3.37 20.79 7.35 23 12 23z" />
                                </svg>
                                Google
                            </button>
                        </div>

                    </form>
                </div>

                {/* Footer mobile para manter espaçamento simétrico do flex */}
                <div className="h-4 shrink-0 lg:hidden text-center text-text-light/40 text-xs">
                    © {new Date().getFullYear()} VittaLis.
                </div>
            </div>

        </section>
    )
}

export default Login