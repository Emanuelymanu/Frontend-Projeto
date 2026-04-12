import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Filters } from "../components/filters";
import { LivroCard } from "../components/LivroCard";
import "../css/biblioteca.css";

export function Biblioteca() {

  const [livros, setLivros] = useState([
    {
      id: 1,
      titulo: "Harry Potter",
      autor: "J.K Rowling",
      genero: "Fantasia",
      editora: "Rocco",
      avaliacao: 5,
      capa: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
      status: "Lido"
    },
    {
      id: 2,
      titulo: "O Hobbit",
      autor: "Tolkien",
      genero: "Fantasia",
      editora: "HarperCollins",
      avaliacao: 4,
      capa: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
      status: "Lendo"
    }
  ]);

  const [livroSelecionado, setLivroSelecionado] = useState<any>(null);

  // 🔥 FILTROS (AGORA CORRETOS)
  const [livrosFiltrados, setLivrosFiltrados] = useState(livros);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [generoFilter, setGeneroFilter] = useState("todos");
  const [editoraFilter, setEditoraFilter] = useState("todos");
  const [avaliacaoFilter, setAvaliacaoFilter] = useState("todos");
  const [sortBy, setSortBy] = useState("titulo");

  // 🔥 LISTAS DINÂMICAS
  const generos = [...new Set(livros.map((l) => l.genero))];
  const editoras = [...new Set(livros.map((l) => l.editora))];

  // 🔥 EXCLUIR
  const excluirLivro = (id: number) => {
    const novaLista = livros.filter((l) => l.id !== id);
    setLivros(novaLista);
    setLivrosFiltrados(novaLista);
    setLivroSelecionado(null);
  };

  // 🔥 EDITAR
  const editarLivro = (id: number) => {
    const novoTitulo = prompt("Novo título:");

    if (!novoTitulo) return;

    const novaLista = livros.map((l) =>
      l.id === id ? { ...l, titulo: novoTitulo } : l
    );

    setLivros(novaLista);
    setLivrosFiltrados(novaLista);
    setLivroSelecionado(null);
  };

  return (
    <div className="biblioteca-container">

      <Sidebar onLogout={() => console.log("logout")} active="biblioteca" />

      <main className="main-content">

        <h1>Biblioteca</h1>

        {/* 🔥 FILTRO CORRETO */}
        <Filters
          livros={livros}
          generos={generos}
          editoras={editoras}
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
          setLivrosFiltrados={setLivrosFiltrados}
        />

        {/* 🔥 LISTA */}
        <div className="livros-grid">
          {livrosFiltrados.map((livro) => (
            <LivroCard
              key={livro.id}
              livro={livro}
              onClick={() => setLivroSelecionado(livro)}
            />
          ))}
        </div>

      </main>

      {/* 🔥 MODAL */}
      {livroSelecionado && (
        <div className="modal-overlay">
          <div className="modal-content">

            <h2>{livroSelecionado.titulo}</h2>

            <img src={livroSelecionado.capa} />

            <p><strong>Autor:</strong> {livroSelecionado.autor}</p>
            <p><strong>Gênero:</strong> {livroSelecionado.genero}</p>
            <p><strong>Editora:</strong> {livroSelecionado.editora}</p>
            <p><strong>Status:</strong> {livroSelecionado.status}</p>
            <p><strong>Avaliação:</strong> {livroSelecionado.avaliacao}</p>

            <button onClick={() => editarLivro(livroSelecionado.id)}>
              Editar
            </button>

            <button onClick={() => excluirLivro(livroSelecionado.id)}>
              Excluir
            </button>

            <button onClick={() => setLivroSelecionado(null)}>
              Fechar
            </button>

          </div>
        </div>
      )}

    </div>
  );
}