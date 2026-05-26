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
  // Google Books
  const [buscaGoogle, setBuscaGoogle] = useState("");
  const [livrosGoogle, setLivrosGoogle] = useState<any[]>([]);
  const [buscandoGoogle, setBuscandoGoogle] = useState(false);

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
      const livros = await LivroService.listarTopAvaliados(10);
      setTopAvaliados(livros);
    } catch (error) {
      console.error("Erro ao carregar top avaliados:", error);
      setTopAvaliados([]);
    }
  };

  const buscarLivrosGoogle = async () => {
    if (!buscaGoogle.trim()) return;
    setBuscandoGoogle(true);
    try {
      const livros = await LivroService.buscarGoogleBooks(buscaGoogle);
      setLivrosGoogle(livros);
    } catch (e) {
      setLivrosGoogle([]);
    } finally {
      setBuscandoGoogle(false);
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
        <section className="welcome-banner">
          <div className="banner-content">
            <BookOpen size={48} color="white" />
            <h1>Bem-vindo, {usuarioNome}!</h1>
            <p>Organize sua biblioteca pessoal</p>
          </div>
        </section>

        <section className="top-rated-section">
          <div className="section-header">
            <div className="section-title">
              <h2>Mais Bem Avaliados</h2>
            </div>
          </div>
          <div className="books-scroll">
            {topAvaliados.map((livro) => (
              <div key={livro.id_livro} className="book-card-wrapper">
                <div className="rating-badge">
                  <Star size={14} fill="#fbbf24" color="#fbbf24" />
                  <span>{livro.avaliacao}</span>
                </div>
                <LivroCard
                  livro={livro}
                  onClick={() => navigate("/biblioteca")}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Google Books Section */}
        <section className="google-books-section" style={{ marginTop: 32 }}>
          <div className="section-header">
            <div className="section-title">
              <h2>Buscar Livros no Google Books</h2>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <input
              type="text"
              value={buscaGoogle}
              onChange={e => setBuscaGoogle(e.target.value)}
              placeholder="Digite título, autor, etc."
              disabled={buscandoGoogle}
              style={{ flex: 1 }}
            />
            <button type="button" onClick={buscarLivrosGoogle} disabled={buscandoGoogle || !buscaGoogle.trim()}>
              {buscandoGoogle ? "Buscando..." : "Buscar"}
            </button>
          </div>
          <div className="books-scroll">
            {livrosGoogle.map((livro, idx) => (
              <div key={idx} className="book-card-wrapper">
                <LivroCard
                  livro={{
                    ...livro,
                    // Normalização para Google Books API
                    titulo: (livro.volumeInfo?.title) || livro.titulo || livro.title || "Sem título",
                    autor: (livro.volumeInfo?.authors ? livro.volumeInfo.authors.join(", ") : livro.autor || livro.authors?.join(", ") || ""),
                    capa: (livro.volumeInfo?.imageLinks?.thumbnail) || livro.capa || (livro.imageLinks ? livro.imageLinks.thumbnail : undefined),
                  }}
                  onClick={() => { }}
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