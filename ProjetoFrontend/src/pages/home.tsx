import {
  BookOpen
} from "lucide-react";

import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar";

import "../css/home.css";

export function Home() {

  const navigate = useNavigate();
  const [usuarioNome, setUsuarioNome] = useState("");

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login");
      return;
    }

    const usuario = authService.getUser();
    if (usuario) {
      setUsuarioNome(usuario.nome);
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/login"); // 🔥 REDIRECIONA CORRETAMENTE
  };

  return (
    <div className="home-container">

      <Sidebar onLogout={handleLogout} active="home" />

      <main className="main-content">

        {/* BANNER */}
        <section className="welcome-banner">
          <div className="banner-content">
            <BookOpen size={48} color="white" />

            <h1>Bem-vindo, {usuarioNome}!</h1>
            <p>Organize sua biblioteca pessoal</p>
          </div>

        </section>

        {/* LIVROS RECENTES */}
        <section className="recent-books-section">
          <h2>Últimos Livros Acessados</h2>

          <div className="empty-state-card">
            <BookOpen size={48} color="#94a3b8" />
            <p>Você ainda não acessou nenhum livro</p>
          </div>
        </section>

      </main>
    </div>
  );
}