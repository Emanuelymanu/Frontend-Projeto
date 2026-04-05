import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Filters } from "../components/filters";
import { LivroCard } from "../components/LivroCard";
import "../css/biblioteca.css";

const livrosMock = [
  {
  id: 1,
  titulo: "Dom Casmurro",
  autor: "Machado de Assis",
  genero: "Ficção",
  editora: "Saraiva",
  status: "Lido",
  avaliacao: 5,
  capa: "https://covers.openlibrary.org/b/id/8225261-L.jpg"
},
  {
  id: 2,
  titulo: "Clean Code",
  autor: "Robert C. Martin",
  genero: "Técnico",
  editora: "Alta Books",
  status: "Lendo",
  avaliacao: 4,
capa: "https://m.media-amazon.com/images/I/41SH-SvWPxL._SX374_BO1,204,203,200_.jpg"},
];

export function Biblioteca() {

  const [statusFilter, setStatusFilter] = useState("todos");
  const [generoFilter, setGeneroFilter] = useState("todos");
  const [editoraFilter, setEditoraFilter] = useState("todos");
  const [avaliacaoFilter, setAvaliacaoFilter] = useState("todos");
  const [sortBy, setSortBy] = useState("titulo");
const [livroSelecionado, setLivroSelecionado] = useState<any>(null);

  const generos = [...new Set(livrosMock.map(l => l.genero))];
  const editoras = [...new Set(livrosMock.map(l => l.editora))];

  let livrosFiltrados = livrosMock.filter((livro) => {
    return (
      (statusFilter === "todos" || livro.status === statusFilter) &&
      (generoFilter === "todos" || livro.genero === generoFilter) &&
      (editoraFilter === "todos" || livro.editora === editoraFilter) &&
      (avaliacaoFilter === "todos" || livro.avaliacao === Number(avaliacaoFilter))
    );
  });

  livrosFiltrados = [...livrosFiltrados].sort((a, b) => {
    if (sortBy === "titulo") {
      return a.titulo.localeCompare(b.titulo);
    } else {
      return Number(b.id) - Number(a.id);
    }
  });

  return (
    <div className="biblioteca-container">

      <Sidebar 
  onLogout={() => console.log("logout")} 
  active="biblioteca" 
/>

      <main className="main-content">
        
        <header className="page-header">
          <h1>Biblioteca</h1>
          <p>{livrosFiltrados.length} livros encontrados</p>
        </header>

        <Filters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          generoFilter={generoFilter}
          setGeneroFilter={setGeneroFilter}
          editoraFilter={editoraFilter}
          setEditoraFilter={setEditoraFilter}
          avaliacaoFilter={avaliacaoFilter}
          setAvaliacaoFilter={setAvaliacaoFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          generos={generos}
          editoras={editoras}
        />

        {livrosFiltrados.length === 0 ? (
          <div className="empty-results-card">
            <p>Nenhum livro encontrado</p>
          </div>
        ) : (
          <div className="books-grid">
            {livrosFiltrados.map((livro) => (
              <LivroCard
                key={livro.id}
                livro={livro}
                onClick={() => setLivroSelecionado(livro)}
              />
            ))}
          </div>
        )}

        {livroSelecionado && (
  <div className="modal-overlay">
    <div className="modal-content">

      <div className="modal-image">
    {livroSelecionado.capa ? (
      <img src={livroSelecionado.capa} />
    ) : (
      <span>📖</span>
    )}
  </div>

      <h2>{livroSelecionado.titulo}</h2>
      <p><strong>Autor:</strong> {livroSelecionado.autor}</p>
      <p><strong>Gênero:</strong> {livroSelecionado.genero}</p>
      <p><strong>Status:</strong> {livroSelecionado.status}</p>
      <p><strong>Avaliação:</strong> {livroSelecionado.avaliacao} </p>

      <button onClick={() => setLivroSelecionado(null)}>
        Fechar
      </button>

    </div>
  </div>
)}

      </main>
    </div>
  );
}