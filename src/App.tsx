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
}

export default App;