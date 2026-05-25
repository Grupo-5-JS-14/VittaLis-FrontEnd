import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import ListaPlanos from "./components/plano/ListaPlanos";
import AdminDashboard from "./pages/Admin";
import SimuladorChat from "./components/chat/SimuladorChat";
import Perfil from "./pages/Perfil";

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
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ROTAS COM NAVBAR E FOOTER */}
          <Route element={<LayoutComHeaderFooter />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/planos" element={<ListaPlanos />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>

          {/* ROTAS SEM NAVBAR E FOOTER */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/simulacao" element={<SimuladorChat />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;