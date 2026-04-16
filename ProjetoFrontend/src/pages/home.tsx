import { BookOpen, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import LivroService from "../services/livroService";
import { LivroCard } from "../components/LivroCard";

import "../css/home.css";

function Home() {
  const navigate = useNavigate();

  const [usuarioNome, setUsuarioNome] = useState("");
  const [topAvaliados, setTopAvaliados] = useState<any[]>([]);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login");
      return;
    }

    const usuario = authService.getUser();
    if (usuario) {
      setUsuarioNome(usuario.nome);
    }

    carregarTopAvaliados();
  }, [navigate]);

  const carregarTopAvaliados = async () => {
    try {
      const livros = await LivroService.listar();

      // 🔥 PEGA SÓ >= 4
      const filtrados = livros
        .map((l: any) => {
          if (l.leituras && l.leituras.length > 0) {
            const leitura = l.leituras[0];
            return {
              ...l,
              avaliacao: leitura?.avaliacao || 0
            };
          }
          return { ...l, avaliacao: 0 };
        })
        .filter((l: any) => l.avaliacao >= 4)
        .sort((a: any, b: any) => b.avaliacao - a.avaliacao)
        .slice(0, 10);

      setTopAvaliados(filtrados);
    } catch (error) {
      console.error("Erro ao carregar top avaliados:", error);
      setTopAvaliados([]);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
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

        {/* TOP AVALIADOS */}
        <section className="top-rated-section">
          <div className="section-header">
            <div className="section-title">
              <h2>Mais Bem Avaliados</h2>
            </div>
          </div>

          <div className="books-scroll">
            {topAvaliados.map((livro) => (
              <div key={livro.id_livro} className="book-card-wrapper">

                {/* ⭐ NOTA */}
                <div className="rating-badge">
                  <Star size={14} fill="#fbbf24" color="#fbbf24" />
                  <span>{livro.avaliacao}</span>
                </div>

                {/* 🔥 REAPROVEITANDO CARD */}
                <LivroCard
                  livro={livro}
                  onClick={() => navigate("/biblioteca")}
                />
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default Home;