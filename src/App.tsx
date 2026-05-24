import { BrowserRouter, /*Routes, Route*/ } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
// import { AuthProvider } from "./contexts/AuthContext";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import Cadastro from "./pages/Cadastro";
// import ListaApolices from "./components/apolices/ListaApolices";
// import FormApolice from "./components/apolices/FormApolice";
// import DeletarApolice from "./components/apolices/DeletarApolice";
// import Perfil from "./pages/Perfil";
// import FormPlanos from "./components/plano/FormPlano";
// import ListaPlanos from "./components/plano/ListaPlanos";
// import DeletarPlanos from "./components/plano/DeletarPlano";

function App() {
	return (
		<>
			{/*<AuthProvider>*/}
			<BrowserRouter>
				{/* <Navbar /> */}
				<div className="min-h-screen">

					{/*	<Login />
						<Home />
						<Cadastro />
						<ListaApolices />
						<FormApolice />
						<DeletarApolice />
						<ListaPlanos />
						<FormPlanos />
						<DeletarPlanos />
						<Perfil /> */}



					{/* <Routes>
							<Route path="/" element={<Login />} />
							<Route path="/login" element={<Login />} />
							<Route path="/home" element={<Home />} />
							<Route path="/cadastro" element={<Cadastro />} />
							<Route path="/apolices" element={<ListaApolices />} />
							<Route path="/cadastrarapolices" element={<FormApolice />} />
							<Route path="/editarapolices/:id" element={<FormApolice />} />
							<Route path="/deletarapolices/:id" element={<DeletarApolice />} />
							<Route path="/planos" element={<ListaPlanos />} />
							<Route path="/cadastrarplanos" element={<FormPlanos />} />
							<Route path="/editarplanos/:id" element={<FormPlanos />} />
							<Route path="/deletarplanos/:id" element={<DeletarPlanos />} />
							<Route path="/perfil" element={<Perfil />} />
						</Routes> */}
				</div>
			{/*	<Footer /> */}
			</BrowserRouter>
			{/*</AuthProvider>*/}
		</>
	)
}

export default App;