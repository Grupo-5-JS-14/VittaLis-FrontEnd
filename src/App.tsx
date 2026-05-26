import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import LoadingVittaLis from "./components/loading/Loading";

import { AuthProvider } from "./contexts/AuthContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import ListaPlanos from "./components/plano/ListaPlanos";
import AdminDashboard from "./pages/Admin";
import SimuladorChat from "./components/chat/SimuladorChat";
import Perfil from "./pages/Perfil";
import About from "./pages/About";
import ScrollToTop from "./components/scrolltop";

import ProjetosVitta from "./pages/ProjetosVitta";
import Ajuda from "./pages/Ajuda";
import Sinistro from "./pages/Sinistro";

function LayoutComHeaderFooter() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tempo = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(tempo);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        {loading ? (
          <LoadingVittaLis />
        ) : (
          <Routes>
            {/* ROTAS COM NAVBAR E FOOTER */}
            <Route element={<LayoutComHeaderFooter />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/planos" element={<ListaPlanos />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/ajuda" element={<Ajuda />} />
              <Route path="/sinistro" element={<Sinistro />} />
            </Route>

            {/* ROTAS SEM NAVBAR E FOOTER */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/simulacao" element={<SimuladorChat />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/projetos" element={<ProjetosVitta />} />
          </Routes>
        )}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;