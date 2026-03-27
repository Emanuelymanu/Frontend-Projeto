import { useState } from 'react';
import { LivroCard } from '../components/LivroCard';
import { 
  Home as HomeIcon, 
  LayoutDashboard, 
  Library, 
  BookOpen, 
  Book,
  BookPlus, 
  User, 
  Newspaper, 
  LogOut
} from 'lucide-react';

import './css/biblioteca.css';

export function Biblioteca() {

  const livros = [
    {
      id: 1,
      titulo: "Harry Potter",
      capa: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
      status: "Lido",
      genero: "Fantasia",
      editora: "Rocco",
      avaliacao: 5
    },
    {
      id: 2,
      titulo: "O Hobbit",
      capa: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
      status: "Lendo",
      genero: "Fantasia",
      editora: "Martins Fontes",
      avaliacao: 4
    }
  ];

  const [livroSelecionado, setLivroSelecionado] = useState<any>(null);

  // FILTROS
  const [statusFilter, setStatusFilter] = useState("todos");
  const [generoFilter, setGeneroFilter] = useState("todos");
  const [editoraFilter, setEditoraFilter] = useState("todos");
  const [avaliacaoFilter, setAvaliacaoFilter] = useState("todos");
  const [sortBy, setSortBy] = useState("titulo");

  // PEGAR LISTAS ÚNICAS
  const generos = [...new Set(livros.map(l => l.genero))];
  const editoras = [...new Set(livros.map(l => l.editora))];

  // FILTRAR
  let livrosFiltrados = livros.filter((livro) => {
    const statusOk = statusFilter === "todos" || livro.status === statusFilter;
    const generoOk = generoFilter === "todos" || livro.genero === generoFilter;
    const editoraOk = editoraFilter === "todos" || livro.editora === editoraFilter;
    const avaliacaoOk =
      avaliacaoFilter === "todos" ||
      livro.avaliacao === Number(avaliacaoFilter);

    return statusOk && generoOk && editoraOk && avaliacaoOk;
  });

  // ORDENAR
  livrosFiltrados = [...livrosFiltrados].sort((a, b) => {
    if (sortBy === "titulo") {
      return a.titulo.localeCompare(b.titulo);
    } else {
      return b.id - a.id;
    }
  });

  return (
    <div className="biblioteca-container">
      
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <BookOpen size={28} color="#1d4ed8" />
          <h2>Biblioteca</h2>
        </div>

        <nav className="sidebar-menu">
          <a href="/home" className="menu-item">
            <HomeIcon size={20} /> Início
          </a>
          <a href="/dashboard" className="menu-item">
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="/biblioteca" className="menu-item active">
            <Library size={20} /> Biblioteca
          </a>
          <a href="#" className="menu-item">
            <Book size={20} /> Leituras
          </a>
          <a href="#" className="menu-item">
            <BookPlus size={20} /> Cadastrar Livro
          </a>
          <a href="#" className="menu-item">
            <User size={20} /> Minha Conta
          </a>
          <a href="#" className="menu-item">
            <Newspaper size={20} /> News
          </a>
        </nav>

        <div className="sidebar-footer">
          <a href="/" className="menu-item logout">
            <LogOut size={20} /> Sair
          </a>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main className="main-content">
        
        <header className="page-header">
          <h1>Biblioteca</h1>
          <p>{livrosFiltrados.length} livros encontrados</p>
        </header>

        {/* FILTROS */}
        <section className="filter-section">
          <div className="filter-card">

            <div className="filters-grid">

              <div className="select-group">
                <label>Status</label>
                <select onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="todos">Todos</option>
                  <option value="Lido">Lido</option>
                  <option value="Lendo">Lendo</option>
                </select>
              </div>

              <div className="select-group">
                <label>Gênero</label>
                <select onChange={(e) => setGeneroFilter(e.target.value)}>
                  <option value="todos">Todos</option>
                  {generos.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="select-group">
                <label>Editora</label>
                <select onChange={(e) => setEditoraFilter(e.target.value)}>
                  <option value="todos">Todas</option>
                  {editoras.map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </select>
              </div>

              <div className="select-group">
                <label>Avaliação</label>
                <select onChange={(e) => setAvaliacaoFilter(e.target.value)}>
                  <option value="todos">Todas</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div className="select-group">
                <label>Ordenar</label>
                <button onClick={() =>
                  setSortBy(sortBy === "titulo" ? "id" : "titulo")
                }>
                  {sortBy === "titulo" ? "Título" : "Mais novos"}
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* GRID DE LIVROS */}
        <section className="results-section">
          <div className="livros-grid">
            {livrosFiltrados.map((livro) => (
              <LivroCard
                key={livro.id}
                livro={livro}
                onClick={() => setLivroSelecionado(livro)}
              />
            ))}
          </div>
        </section>

      </main>

      {/* MODAL */}
      {livroSelecionado && (
  <div className="modal-overlay" onClick={() => setLivroSelecionado(null)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      
      <h2>{livroSelecionado.titulo}</h2>
      
      <img src={livroSelecionado.capa} alt="" />
      
      <p>Status: {livroSelecionado.status}</p>
      <p>Gênero: {livroSelecionado.genero}</p>
      <p>Editora: {livroSelecionado.editora}</p>
      <p>Avaliação: {livroSelecionado.avaliacao}</p>

      <button onClick={() => setLivroSelecionado(null)}>
        Fechar
      </button>

    </div>
  </div>
)}
    </div>
  );
}