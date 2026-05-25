import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
//import Login from "./pages/Login";
// import ListaApolices from "./components/apolices/ListaApolices";
// import FormApolice from "./components/apolices/FormApolice";
// import DeletarApolice from "./components/apolices/DeletarApolice";
// import Perfil from "./pages/Perfil";
// import FormPlanos from "./components/plano/FormPlano";
// import ListaPlanos from "./components/plano/ListaPlanos";
// import DeletarPlanos from "./components/plano/DeletarPlano";

function RotaVazia() {
	return (
		<>
			{/* Add rotas corretamente */}
		</>
	)
}

function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Navbar />
					<div className="min-h-screen">

						<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/home" element={<Home />} />
								<Route path="/perfil" element={<Perfil />} />
								<Route path="/login" element={<Login />} />
								<Route path="/cadastro" element={<Cadastro />} />

								<Route path="/apolices" element={<RotaVazia />} />
								<Route path="/apolices/:id" element={<RotaVazia />} />
								<Route path="/apolices/:id/opcoes" element={<RotaVazia />} />
								<Route path="/apolices/:id/beneficiarios" element={<RotaVazia />} />
								<Route path="/apolices/:id/documento" element={<RotaVazia />} />
								<Route path="/pagamentos" element={<RotaVazia />} />
								<Route path="/beneficiarios" element={<RotaVazia />} />
								<Route path="/fale-conosco" element={<RotaVazia />} />
								<Route path="/configuracoes" element={<RotaVazia />} />
							{/*	
								 />
								<Route path="/cadastrarapolices" element={<FormApolice />} />
								<Route path="/editarapolices/:id" element={<FormApolice />} />
								<Route path="/deletarapolices/:id" element={<DeletarApolice />} />
								<Route path="/planos" element={<ListaPlanos />} />
								<Route path="/cadastrarplanos" element={<FormPlanos />} />
								<Route path="/editarplanos/:id" element={<FormPlanos />} />
								<Route path="/deletarplanos/:id" element={<DeletarPlanos />} />
								*/}
							</Routes> 
					</div>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</>
	)
}

export default App;
