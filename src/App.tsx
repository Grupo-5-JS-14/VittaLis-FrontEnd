import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import SimuladorChat from "./components/chat/SimuladorChat";

function Layout() {
  const location = useLocation();

  // verifica se está na rota de simulação
  const isSimulacao = location.pathname === "/simulacao";

  return (
    <>
      {/* Só mostra se NÃO estiver na simulação */}
      {!isSimulacao && <Navbar />}

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/simulacao" element={<SimuladorChat />} />
        </Routes>
      </div>

      {/* Só mostra se NÃO estiver na simulação */}
      {!isSimulacao && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Toaster } from "sonner"

import { AuthProvider } from "./contexts/AuthContext"

import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"

function App() {

	return (

		<AuthProvider>

			<BrowserRouter>

				<div className="min-h-screen bg-background">

					<Routes>

						<Route
							path="/"
							element={<Login />}
						/>

						<Route
							path="/login"
							element={<Login />}
						/>

						<Route
							path="/cadastro"
							element={<Cadastro />}
						/>

					</Routes>

				</div>

				<Toaster
					position="top-right"
					richColors
					closeButton
					toastOptions={{
						style: {
							background: '#FFFFFF',
							border: '1px solid #DCE7E3',
							color: '#12312F',
							borderRadius: '16px',
							padding: '16px',
						},
					}}
				/>

			</BrowserRouter>

		</AuthProvider>
	)
}

export default App