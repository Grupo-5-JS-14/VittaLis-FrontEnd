import {
  IconHeadphones as Headphones,
  IconHome as Home,
  IconLogout as LogOut,
  IconSettings as Settings,
  IconShield as Shield,
  IconUser as User,
  IconUsers as Users,
  IconWallet as Wallet
} from '@tabler/icons-react'

import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

const menuItems = [
  { label: 'Tela Inicial', icon: Home, path: '/home' },
  { label: 'Minhas apólices', icon: Shield, path: '/apolices' },
  { label: 'Pagamentos', icon: Wallet, path: '/pagamentos' },
  { label: 'Beneficiários', icon: Users, path: '/beneficiarios' },
  { label: 'Fale conosco', icon: Headphones, path: '/fale-conosco' },
  { label: 'Configurações', icon: Settings, path: '/configuracoes' }
]

function BarraLateral() {
  const navigate = useNavigate()

  const { usuario, handleLogout } = useContext(AuthContext)

  const location = useLocation()

  function handleMenuClick(path: string) {
    navigate(path)
  }

  function Logout() {
    handleLogout()
    navigate('/login')
  }

  return (
    <aside className="hidden min-h-[calc(100vh-74px)] w-64 shrink-0 border-r border-[#dde8e5] bg-white font-poppins lg:flex lg:flex-col lg:justify-between">
      <div>
        <div className="flex h-30 items-center justify-center bg-text px-8 text-white">
          <div className="flex items-center gap-4">
            {usuario.foto ? (
  <img
    src={usuario.foto}
    alt={usuario.nome || "Usuário"}
    className="h-16 w-16 rounded-full object-cover border-2 border-white"
  />
) : (
  <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-[#005b5b]">
    <User size={36} fill="#005b5b" />
  </div>
)}

            <div>
              <p className="text-base font-bold">Olá, {usuario.nome}!</p>
              <p className="mt-1 text-xs font-medium text-white/85">
                É um prazer tê-lo conosco novamente!
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-5 flex w-full flex-col gap-3 rounded-2xl">
          {menuItems.map(item => {
            const Icon = item.icon
            const isSelected = location.pathname === item.path

            return (
              <button
                type="button"
                onClick={() => handleMenuClick(item.path)}
                key={item.label}
                className={`flex h-14 w-full items-center rounded-lg px-5 text-left text-sm font-bold transition ${
                  isSelected
                    ? 'bg-[#173c3a] text-[#F5F7F6]'
                    : 'text-[#173c3a] hover:bg-[#d9e2e5]'
                }`}
              >
                <span className="flex w-10 shrink-0 justify-center">
                  <Icon size={26} stroke={2} />
                </span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <button
        type="button"
        className="mb-8 flex h-11 w-full items-center rounded-lg px-5 text-sm font-bold text-[#005b5b] transition hover:bg-[#d9e2e5]"
        onClick={Logout}
      >
        <span className="flex w-10 shrink-0 justify-center">
          <LogOut size={24} stroke={2} />
        </span>
        Sair
      </button>
    </aside>
  )
}

export default BarraLateral
