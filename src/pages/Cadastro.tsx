import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "sonner"
import { cadastrarUsuario } from "../services/Service"
import { Eye, EyeOff } from "lucide-react"
import { ClipLoader } from "react-spinners"
import type UsuarioCadastro from "../models/UsuarioCadastro"
import { useLocation } from 'react-router-dom';

function Cadastro() {
    const navigate = useNavigate()
    const location = useLocation();

    // 1. AJUSTADO: Incluído o campo 'emailPrePreenchido' vindo do estado da rota
    const dadosSimulacao = location.state as {
        nomePrePreenchido?: string;
        idadePrePreenchida?: number;
        emailPrePreenchido?: string; // Adicionado aqui
        planoSelecionadoId?: number;
        valorFinalCalculado?: number;
    };

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false)
    const [confirmarSenha, setConfirmarSenha] = useState<string>("")

    // 2. AJUSTADO: O campo 'usuario' agora inicia com o e-mail preenchido no chat
    const [usuario, setUsuario] = useState<UsuarioCadastro>({
        nome: dadosSimulacao?.nomePrePreenchido || '',
        usuario: dadosSimulacao?.emailPrePreenchido || '', // Ajustado aqui
        senha: '',
        foto: '',
        idade: dadosSimulacao?.idadePrePreenchida || 0
    })

    function retornar() {
        navigate('/')
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target

        setUsuario({
            ...usuario,
            [name]: name === "idade" ? Number(value) : value
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (confirmarSenha !== usuario.senha || usuario.senha.length < 8) {
            toast.error('As senhas não coincidem ou possuem menos de 8 caracteres.')
            return
        }

        if ((usuario.idade ?? 0) < 18) {
            toast.error('Só é permitido cadastro para maiores de 18 anos.')
            return
        }

        setIsLoading(true)

        try {
            const payload = {
                nome: usuario.nome.trim(),
                usuario: usuario.usuario.trim(),
                senha: usuario.senha,
                foto: usuario.foto?.trim() || null,
                idade: Number(usuario.idade)
            }

            await cadastrarUsuario(`/usuarios/cadastrar`, payload, setUsuario)

            toast.success('Usuário cadastrado com sucesso!')
            navigate('/')

        } catch (error: any) {
            console.log("ERRO BACKEND:", error.response?.data)
            toast.error('Erro ao cadastrar usuário!')
        }

        setIsLoading(false)
    }

    return (
        <section className="w-full min-h-screen bg-background flex font-sans antialiased">

            {/* ===================================================== */}
            {/* LADO ESQUERDO (Metade da Tela com Vídeo de Fundo)     */}
            {/* ===================================================== */}
            <div className="hidden lg:flex relative w-1/2 min-h-screen p-12 flex-col justify-between overflow-hidden text-white">

                {/* Tag de vídeo */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src="/happyness.mp4" type="video/mp4" />
                </video>

                {/* Overlay escuro adaptado para manter contraste */}
                <div className="absolute inset-0 bg-slate-900/40 z-10 mix-blend-multiply" />

                {/* Logo */}
                <div className="relative z-20 w-32">
                    <img src="/icon-verde.png" alt="Logo" className="max-h-12 object-contain brightness-0 invert" />
                </div>

                {/* Textos institucionais com cores claras para o fundo escuro do vídeo */}
                <div className="relative z-20 space-y-6 max-w-md drop-shadow-md">
                    <h1 className="text-4xl font-bold tracking-tight text-text-white leading-tight">
                        Mais que um seguro, um compromisso com a sua vida.
                    </h1>
                    <p className="text-text-white/80 text-sm leading-relaxed max-w-sm">
                        Proteção simplificada, suporte especializado e total segurança para o que realmente importa para você.
                    </p>
                </div>

                <div className="relative z-20 text-[11px] text-text-white/60 font-medium tracking-wide uppercase drop-shadow-sm">
                    Seguro de Vida Descomplicado!
                </div>
            </div>

            {/* ===================================================== */}
            {/* LADO DIREITO (Formulário com as Cores de Login)       */}
            {/* ===================================================== */}
            <div className="flex-1 lg:w-1/2 flex flex-col justify-between p-8 lg:p-12 h-screen overflow-y-auto bg-background">

                {/* Barra Superior */}
                <div className="flex justify-between items-center w-full max-w-md mx-auto lg:mr-0">
                    <span className="text-xs text-text-light">
                        Já tem conta?{" "}
                        <Link to="/login" className="text-secondary hover:text-secondary-dark font-bold hover:underline">
                            Entrar
                        </Link>
                    </span>
                    <button
                        onClick={retornar}
                        className="text-xs font-semibold text-text-light hover:text-primary transition-colors"
                    >
                        Voltar
                    </button>
                </div>

                {/* Formulário */}
                <div className="w-full max-w-md mx-auto my-auto py-8 space-y-8">

                    {/* Boas-vindas */}
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-primary">
                            Comece sua jornada
                        </h2>
                        <p className="text-text-light text-xs mt-1">
                            Seja bem-vindo! Crie seu perfil abaixo.
                        </p>
                    </div>

                    <form onSubmit={cadastrarNovoUsuario} className="space-y-4">

                        {/* Nome */}
                        <div className="space-y-1">
                            <label htmlFor="nome" className="block text-text-light text-xs font-medium">Nome completo</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={usuario.nome}
                                onChange={atualizarEstado}
                                className="w-full h-10 border-b border-border focus:border-primary text-sm outline-none transition-colors bg-transparent placeholder:text-text-light/40 text-text"
                                placeholder="Como quer ser chamado?"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <label htmlFor="usuario" className="block text-text-light text-xs font-medium">E-mail</label>
                            <input
                                type="email"
                                id="usuario"
                                name="usuario"
                                value={usuario.usuario}
                                onChange={atualizarEstado}
                                className="w-full h-10 border-b border-border focus:border-primary text-sm outline-none transition-colors bg-transparent placeholder:text-text-light/40 text-text"
                                placeholder="seu@email.com"
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-6">
                            {/* Foto */}
                            <div className="col-span-3 space-y-1">
                                <label htmlFor="foto" className="block text-text-light text-xs font-medium">Foto de Perfil (URL)</label>
                                <input
                                    type="text"
                                    id="foto"
                                    name="foto"
                                    value={usuario.foto}
                                    onChange={atualizarEstado}
                                    className="w-full h-10 border-b border-border focus:border-primary text-sm outline-none transition-colors bg-transparent placeholder:text-text-light/40 text-text"
                                    placeholder="Link da sua imagem"
                                />
                            </div>

                            {/* Idade */}
                            <div className="space-y-1">
                                <label className="block text-text-light text-xs font-medium">Idade</label>
                                <input
                                    type="number"
                                    name="idade"
                                    value={usuario.idade === 0 ? '' : usuario.idade}
                                    onChange={atualizarEstado}
                                    className="w-full h-10 border-b border-border focus:border-primary text-sm outline-none transition-colors bg-transparent placeholder:text-text-light/40 text-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="00"
                                />
                            </div>
                        </div>

                        {/* Senha */}
                        <div className="space-y-1">
                            <label htmlFor="senha" className="block text-text-light text-xs font-medium">Senha</label>
                            <div className="relative">
                                <input
                                    type={mostrarSenha ? "text" : "password"}
                                    id="senha"
                                    name="senha"
                                    value={usuario.senha}
                                    onChange={atualizarEstado}
                                    className="w-full h-10 border-b border-border focus:border-primary text-sm outline-none transition-colors bg-transparent placeholder:text-text-light/40 text-text pr-8"
                                    placeholder="Mínimo 8 caracteres"
                                />
                                <button
                                    type="button"
                                    onClick={() => setMostrarSenha(!mostrarSenha)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-text-light hover:text-primary transition-colors"
                                >
                                    {mostrarSenha ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirmar Senha */}
                        <div className="space-y-1">
                            <label htmlFor="confirmarSenha" className="block text-text-light text-xs font-medium">Confirmar senha</label>
                            <div className="relative">
                                <input
                                    type={mostrarConfirmarSenha ? "text" : "password"}
                                    id="confirmarSenha"
                                    name="confirmarSenha"
                                    value={confirmarSenha}
                                    onChange={handleConfirmarSenha}
                                    className="w-full h-10 border-b border-border focus:border-primary text-sm outline-none transition-colors bg-transparent placeholder:text-text-light/40 text-text pr-8"
                                    placeholder="Digite novamente"
                                />
                                <button
                                    type="button"
                                    onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-text-light hover:text-primary transition-colors"
                                >
                                    {mostrarConfirmarSenha ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>

                        {/* Ações */}
                        <div className="pt-4 space-y-3">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 bg-secondary hover:bg-secondary-dark text-text-white text-xs font-bold rounded-lg flex items-center justify-center transition-all disabled:opacity-50 active:scale-[0.99]"
                            >
                                {isLoading ? <ClipLoader color="#fff" size={16} /> : "Criar minha conta"}
                            </button>

                            <button
                                type="button"
                                className="w-full h-11 border border-border hover:bg-surface-soft text-text text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all bg-surface"
                            >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                                    <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.78 2.93c.89-2.67 3.39-4.45 6.83-4.45z" />
                                    <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.42 3.57l3.74 2.9c2.19-2.02 3.71-5 3.71-8.62z" />
                                    <path fill="#FBBC05" d="M5.17 14.77c-.23-.69-.37-1.43-.37-2.2s.14-1.51.37-2.2L1.39 7.44C.5 9.21 0 11.16 0 13.2s.5 3.99 1.39 5.76l3.78-2.99z" />
                                    <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.74-2.9c-1.1.74-2.51 1.18-4.22 1.18-3.44 0-5.94-1.78-6.83-4.45L1.39 16.9C3.37 20.79 7.35 23 12 23z" />
                                </svg>
                                Entrar com o Google
                            </button>
                        </div>
                    </form>
                </div>

                {/* Rodapé Invisível/Espaçador */}
                <div className="h-4" />
            </div>
        </section>
    )
}

export default Cadastro