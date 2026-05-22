import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent
} from "react"

import type UsuarioLogin from "../models/UsuarioLogin"

import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    ShieldCheck
} from "lucide-react"

import { ClipLoader } from "react-spinners"

function Login() {

    const navigate = useNavigate()

    const {
        usuario,
        handleLogin,
        isLoading
    } = useContext(AuthContext)

    const [mostrarSenha, setMostrarSenha] = useState(false)

    const [usuarioLogin, setUsuarioLogin] =
        useState<UsuarioLogin>({} as UsuarioLogin)

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

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
        <section className="w-full h-screen overflow-hidden bg-background flex flex-col lg:flex-row font-sans antialiased">

            {/* ===================================================== */}
            {/* LADO ESQUERDO                                         */}
            {/* ===================================================== */}

            <div
                className="hidden lg:flex relative w-[42%] h-screen bg-cover bg-center p-8 xl:p-10 flex-col justify-between overflow-hidden"
                style={{ backgroundImage: "url('/bg-verde.png')" }}
            >

                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/30 backdrop-blur-[1px]" />

                <div className="relative z-10 flex flex-col h-full gap-6">

                    {/* TOPO */}
                    <div className="space-y-6">
<div className="w-47.5 h-17.5 flex items-center justify-start">
    <img
        src="/icon-branco4.png"
        alt="Logo"
        className="max-h-full object-contain scale-90"
    />
</div>

                        {/* Badge */}
                        <div className="w-fit flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                            <span className="text-secondary text-xs">🧡</span>

                            <span className="text-text-white text-[10px] font-bold tracking-wider uppercase">
                                Seguro de Vida Descomplicado
                            </span>
                        </div>

                        {/* TEXTO */}
                        <div className="space-y-4 max-w-md">

                            <h1 className="text-text-white text-4xl xl:text-5xl font-bold leading-tight">
                                Mais que um seguro,
                                <br />
                                um compromisso
                                <br />
                                com o que mais
                                <br />
                                importa:
                                <span className="text-secondary">
                                    {" "}a sua vida.
                                </span>
                            </h1>

                            <p className="text-white/80 text-base xl:text-lg leading-relaxed">
                                Proteção financeira para você e tranquilidade para quem mais importa.
                            </p>
                        </div>
                    </div>

                    {/* CARD BENEFÍCIOS */}
                    <div className="w-full max-w-md rounded-card bg-white/10 backdrop-blur-md border border-white/10 p-6 space-y-5">

                        {/* ITEM */}
                        <div className="flex items-start gap-4">

                            <div className="w-14 h-14 shrink-0 rounded-2xl bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.8}
                                    stroke="currentColor"
                                    className="w-7 h-7 text-emerald-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75 11.25 15 15 9.75m6 2.25c0 5.25-3.438 9.75-8.25 11.25C7.938 21.75 4.5 17.25 4.5 12V5.25L12 2.25l7.5 3V12Z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-text-white text-base font-semibold">
                                    Proteção completa
                                </h3>

                                <p className="text-white/75 text-sm mt-1">
                                    Planos pensados para todas as fases da sua vida.
                                </p>
                            </div>
                        </div>

                        {/* ITEM */}
                        <div className="flex items-start gap-4">

                            <div className="w-14 h-14 shrink-0 rounded-2xl bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.8}
                                    stroke="currentColor"
                                    className="w-7 h-7 text-emerald-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-text-white text-base font-semibold">
                                    Suporte 24h
                                </h3>

                                <p className="text-white/75 text-sm mt-1">
                                    Conte com nossa assistência sempre que precisar.
                                </p>
                            </div>
                        </div>

                        {/* ITEM */}
                        <div className="flex items-start gap-4">

                            <div className="w-14 h-14 shrink-0 rounded-2xl bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.8}
                                    stroke="currentColor"
                                    className="w-7 h-7 text-emerald-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 10.5V7.875a4.125 4.125 0 1 0-8.25 0V10.5m-1.5 0h11.25A1.125 1.125 0 0 1 19.125 11.625v7.125A1.125 1.125 0 0 1 18 19.875H6A1.125 1.125 0 0 1 4.875 18.75v-7.125A1.125 1.125 0 0 1 6 10.5Z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-text-white text-base font-semibold">
                                    Seguro e confiável
                                </h3>

                                <p className="text-white/75 text-sm mt-1">
                                    Seus dados protegidos com tecnologia de ponta.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===================================================== */}
            {/* LADO DIREITO                                          */}
            {/* ===================================================== */}

            <div className="flex-1 flex flex-col justify-between p-5 lg:p-8 h-screen overflow-y-auto">

                {/* HEADER */}
                <div className="flex justify-end items-center gap-4 w-full max-w-135 mx-auto lg:mr-0">

                    <p className="text-text-light text-sm">
                        Ainda não tem uma conta?
                    </p>

                    <Link
                        to="/cadastro"
                        className="h-10 px-6 rounded-full border border-border text-primary font-semibold text-sm flex items-center justify-center hover:bg-surface-soft transition-colors"
                    >
                        Cadastrar
                    </Link>
                </div>

                {/* FORM */}
                <div className="w-full max-w-125 mx-auto my-auto py-4">

                    <form
                        onSubmit={login}
                        className="bg-surface rounded-card border border-border p-8 shadow-card space-y-5"
                    >

                        {/* TÍTULO */}
                        <div>

                            <h2 className="text-primary text-3xl font-bold tracking-tight">
                                Bem-vindo de volta!
                            </h2>

                            <p className="text-text-light text-sm mt-1.5">
                                Faça login para acessar sua conta.
                            </p>
                        </div>

                        <div className="space-y-3">

                            {/* EMAIL */}
                            <div>

                                <label
                                    htmlFor="usuario"
                                    className="block mb-2 text-primary font-semibold text-sm"
                                >
                                    E-mail
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light"
                                    />

                                    <input
                                        type="email"
                                        id="usuario"
                                        name="usuario"
                                        placeholder="seu@email.com"
                                        value={usuarioLogin.usuario || ''}
                                        onChange={atualizarEstado}
                                        className="w-full h-12 rounded-xl border border-border bg-surface pl-11 pr-4 text-sm text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                                        required
                                    />
                                </div>
                            </div>

                            {/* SENHA */}
                            <div>

                                <label
                                    htmlFor="senha"
                                    className="block mb-2 text-primary font-semibold text-sm"
                                >
                                    Senha
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light"
                                    />

                                    <input
                                        type={mostrarSenha ? "text" : "password"}
                                        id="senha"
                                        name="senha"
                                        placeholder="Digite sua senha"
                                        value={usuarioLogin.senha || ''}
                                        onChange={atualizarEstado}
                                        className="w-full h-12 rounded-xl border border-border bg-surface pl-11 pr-11 text-sm text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setMostrarSenha(!mostrarSenha)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-text transition-colors"
                                    >
                                        {mostrarSenha ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* OPÇÕES */}
                            <div className="flex justify-between items-center pt-1">

                                <label className="flex items-center gap-2 text-text-light text-xs cursor-pointer select-none">

                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-border text-secondary focus:ring-secondary/20 checked:bg-secondary"
                                    />

                                    Lembrar meu acesso
                                </label>

                                <button
                                    type="button"
                                    className="text-primary font-semibold text-xs hover:underline"
                                >
                                    Esqueci minha senha
                                </button>
                            </div>

                            {/* BOTÃO */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 rounded-button bg-secondary hover:bg-secondary-dark text-text-white text-sm font-bold flex items-center justify-center transition-colors shadow-button disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <ClipLoader color="#ffffff" size={20} />
                                ) : (
                                    "Entrar"
                                )}
                            </button>

                            {/* DIVISOR */}
                            <div className="flex items-center gap-3 py-1">

                                <div className="flex-1 h-px bg-border" />

                                <span className="text-text-light text-xs whitespace-nowrap">
                                    ou entre com
                                </span>

                                <div className="flex-1 h-px bg-border" />
                            </div>

                            {/* GOOGLE */}
                            <button
                                type="button"
                                className="w-full h-12 rounded-xl border border-border bg-surface hover:bg-surface-soft transition-colors text-sm font-semibold text-text flex items-center justify-center gap-2"
                            >

                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.78 2.93c.89-2.67 3.39-4.45 6.83-4.45z"/>
                                    <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.42 3.57l3.74 2.9c2.19-2.02 3.71-5 3.71-8.62z"/>
                                    <path fill="#FBBC05" d="M5.17 14.77c-.23-.69-.37-1.43-.37-2.2s.14-1.51.37-2.2L1.39 7.44C.5 9.21 0 11.16 0 13.2s.5 3.99 1.39 5.76l3.78-2.99z"/>
                                    <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.74-2.9c-1.1.74-2.51 1.18-4.22 1.18-3.44 0-5.94-1.78-6.83-4.45L1.39 16.9C3.37 20.79 7.35 23 12 23z"/>
                                </svg>

                                Google
                            </button>
                        </div>
                    </form>

                    {/* ALERTA */}
                    <div className="mt-3 bg-surface-soft rounded-card p-4 flex items-center gap-4 border border-border">

                        <div className="w-9 h-9 shrink-0 rounded-full bg-surface flex items-center justify-center text-primary shadow-card">
                            <ShieldCheck size={18} />
                        </div>

                        <div>

                            <h3 className="text-primary text-xs font-bold">
                                Sua segurança é nossa prioridade
                            </h3>

                            <p className="text-text-light text-[11px] mt-0.5">
                                Utilizamos tecnologia avançada para proteger seus dados.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-2" />
            </div>
        </section>
    )
}

export default Login