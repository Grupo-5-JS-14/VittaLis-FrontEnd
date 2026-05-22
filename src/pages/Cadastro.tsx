import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type Usuario from "../models/Usuario"
import { cadastrarUsuario } from "../services/Service"
import { Eye, EyeOff, ImageIcon, Lock as LockIcon, Mail, ShieldCheck, User } from "lucide-react"
import { ClipLoader } from "react-spinners"

function Cadastro() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false)
    const [confirmarSenha, setConfirmarSenha] = useState<string>("")

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        idade: 0,
        dataCadastro: ''
    })

    useEffect(() => {
        if (usuario.id !== 0) {
            retornar()
        }
    }, [usuario])

    function retornar() {
        navigate('/')
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
            setIsLoading(true)
            try {
                await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
                toast.success('Usuário cadastrado com sucesso!')
            } catch (error) {
                toast.error('Erro ao cadastrar usuário!')
            }
        } else {
            toast.error('As senhas não coincidem ou possuem menos de 8 caracteres.')
            setUsuario({ ...usuario, senha: '' })
            setConfirmarSenha('')
        }

        setIsLoading(false)
    }

    return (
      <section className="w-full h-screen overflow-hidden bg-background flex font-sans antialiased">

    {/* ===================================================== */}
    {/* LADO ESQUERDO                                         */}
    {/* ===================================================== */}

    <div
        className="hidden lg:flex relative w-[42%] h-screen bg-cover bg-center p-8 xl:p-10 flex-col justify-between overflow-hidden"
        style={{ backgroundImage: "url('/bg-branco.png')" }}
    >

        {/* Overlay */}
        <div className="absolute inset-0 bg-primary/5 backdrop-blur-[1px]" />

        <div className="relative z-10 flex flex-col h-full gap-6">

            {/* TOPO */}
            <div className="space-y-6 ">

          <div className="w-40 h-17.5 flex items-center justify-start">
    <img
        src="/icon-verde2.png"
        alt="Logo"
        className="max-h-full object-contain ml-2"
    />
</div>
                {/* Badge */}
                <div className="w-fit flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/5 border border-orange-500/5 backdrop-blur-md">

                    <span className="text-secondary text-xs">
                        🧡
                    </span>

                    <span className="text-primary text-[10px] font-bold tracking-wider uppercase">
                        Seguro de Vida Descomplicado
                    </span>
                </div>

                {/* Texto */}
                <div className="space-y-4 max-w-md">

                    <h1 className="text-primary text-4xl xl:text-5xl font-bold leading-tight">
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

                    <p className="text-black/70 text-base xl:text-lg leading-relaxed">
                        Proteção financeira para você e tranquilidade para quem mais importa.
                    </p>
                </div>
            </div>

            {/* CARD BENEFÍCIOS */}
            <div className="w-full max-w-md rounded-card bg-orange-500/5 backdrop-blur-md border border-orange-500/10 p-6 space-y-5">

                {/* ITEM */}
                <div className="flex items-start gap-4">

                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                            className="w-7 h-7 text-orange-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75m6 2.25c0 5.25-3.438 9.75-8.25 11.25C7.938 21.75 4.5 17.25 4.5 12V5.25L12 2.25l7.5 3V12Z"
                            />
                        </svg>
                    </div>

                    <div>

                        <h3 className="text-primary text-base font-semibold">
                            Proteção completa
                        </h3>

                        <p className="text-black/70 text-sm mt-1">
                            Planos pensados para todas as fases da sua vida.
                        </p>
                    </div>
                </div>

                {/* ITEM */}
                <div className="flex items-start gap-4">

                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                            className="w-7 h-7 text-orange-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
                            />
                        </svg>
                    </div>

                    <div>

                        <h3 className="text-primary text-base font-semibold">
                            Suporte 24h
                        </h3>

                        <p className="text-black/70 text-sm mt-1">
                            Conte com nossa assistência sempre que precisar.
                        </p>
                    </div>
                </div>

                {/* ITEM */}
                <div className="flex items-start gap-4">

                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                            className="w-7 h-7 text-orange-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 10.5V7.875a4.125 4.125 0 1 0-8.25 0V10.5m-1.5 0h11.25A1.125 1.125 0 0 1 19.125 11.625v7.125A1.125 1.125 0 0 1 18 19.875H6A1.125 1.125 0 0 1 4.875 18.75v-7.125A1.125 1.125 0 0 1 6 10.5Z"
                            />
                        </svg>
                    </div>

                    <div>

                        <h3 className="text-primary text-base font-semibold">
                            Seguro e confiável
                        </h3>

                        <p className="text-black/70 text-sm mt-1">
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
        <div className="flex justify-end items-center gap-4 w-full max-w-150 mx-auto lg:mr-0">

            <button
                onClick={retornar}
                className="h-10 px-6 rounded-full border border-border text-primary font-semibold text-sm flex items-center justify-center hover:bg-surface-soft transition-colors"
            >
                Voltar
            </button>
        </div>

        {/* FORM */}
        <div className="w-full max-w-140 mx-auto my-auto py-4">

            <form
                onSubmit={cadastrarNovoUsuario}
                className="bg-surface rounded-card border border-border shadow-card p-8 space-y-5"
            >

                {/* Header */}
                <div>

                    <h2 className="text-primary text-3xl font-bold tracking-tight">
                        Criar conta
                    </h2>

                    <p className="text-text-light text-sm mt-1.5">
                        Preencha os dados abaixo para se cadastrar.
                    </p>
                </div>

                <div className="space-y-3">

                    {/* Nome */}
                    <div>

                        <label
                            htmlFor="nome"
                            className="block mb-2 text-primary font-semibold text-sm"
                        >
                            Nome
                        </label>

                        <div className="relative">

                            <User
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light"
                            />

                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Digite seu nome"
                                value={usuario.nome}
                                onChange={atualizarEstado}
                                className="w-full h-12 rounded-xl border border-border bg-surface-soft pl-11 pr-4 text-sm text-text placeholder:text-text-light outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Email */}
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
                                value={usuario.usuario}
                                onChange={atualizarEstado}
                                className="w-full h-12 rounded-xl border border-border bg-surface-soft pl-11 pr-4 text-sm text-text placeholder:text-text-light outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Foto */}
                    <div>

                        <label
                            htmlFor="foto"
                            className="block mb-2 text-primary font-semibold text-sm"
                        >
                            Foto de Perfil
                        </label>

                        <div className="relative">

                            <ImageIcon
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light"
                            />

                            <input
                                type="text"
                                id="foto"
                                name="foto"
                                placeholder="Link da sua foto"
                                value={usuario.foto}
                                onChange={atualizarEstado}
                                className="w-full h-12 rounded-xl border border-border bg-surface-soft pl-11 pr-4 text-sm text-text placeholder:text-text-light outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Senha */}
                    <div>

                        <label
                            htmlFor="senha"
                            className="block mb-2 text-primary font-semibold text-sm"
                        >
                            Senha
                        </label>

                        <div className="relative">

                            <LockIcon
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light"
                            />

                            <input
                                type={mostrarSenha ? "text" : "password"}
                                id="senha"
                                name="senha"
                                placeholder="Digite sua senha"
                                value={usuario.senha}
                                onChange={atualizarEstado}
                                className="w-full h-12 rounded-xl border border-border bg-surface-soft pl-11 pr-11 text-sm text-text placeholder:text-text-light outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                            />

                            <button
                                type="button"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-text transition-colors"
                            >
                                {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirmar Senha */}
                    <div>

                        <label
                            htmlFor="confirmarSenha"
                            className="block mb-2 text-primary font-semibold text-sm"
                        >
                            Confirmar Senha
                        </label>

                        <div className="relative">

                            <LockIcon
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light"
                            />

                            <input
                                type={mostrarConfirmarSenha ? "text" : "password"}
                                id="confirmarSenha"
                                name="confirmarSenha"
                                placeholder="Confirme sua senha"
                                value={confirmarSenha}
                                onChange={handleConfirmarSenha}
                                className="w-full h-12 rounded-xl border border-border bg-surface-soft pl-11 pr-11 text-sm text-text placeholder:text-text-light outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                            />

                            <button
                                type="button"
                                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-text transition-colors"
                            >
                                {mostrarConfirmarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* BOTÃO */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 rounded-button bg-secondary hover:bg-secondary-dark text-text-white text-sm font-bold flex items-center justify-center transition-colors shadow-button disabled:opacity-70 mt-2"
                    >
                        {isLoading
                            ? <ClipLoader color="#fff" size={20} />
                            : "Criar conta"}
                    </button>

                    {/* DIVISOR */}
                    <div className="flex items-center gap-3 py-1">

                        <div className="flex-1 h-px bg-border" />

                        <span className="text-text-light text-xs whitespace-nowrap">
                            ou cadastre-se com
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

export default Cadastro