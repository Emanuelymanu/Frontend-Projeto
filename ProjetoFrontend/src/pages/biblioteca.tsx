import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import { Filters } from "../components/filters";
import { LivroCard } from "../components/LivroCard";
import "../css/biblioteca.css";
import LivroService from "../services/livroService";
import type { Livro } from "../types/livro";


export function Biblioteca() {
  const navigate = useNavigate();

  const [livros, setLivros] = useState<Livro[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string>("");
  const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);


  const [livrosFiltrados, setLivrosFiltrados] = useState<Livro[]>([]);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [generoFilter, setGeneroFilter] = useState("todos");
  const [editoraFilter, setEditoraFilter] = useState("todos");
  const [avaliacaoFilter, setAvaliacaoFilter] = useState("todos");
  const [sortBy, setSortBy] = useState("titulo");


  useEffect(() => {
    carregarLivros();
  }, []);

  const carregarLivros = async (): Promise<void> => {
    try {
      const data = await LivroService.listar();

      // Função para mapear status do backend para o frontend
      const mapStatus = (status: string | undefined): "Lido" | "Lendo" | "Quero Ler" | "Não lido" | undefined => {
        switch (status) {
          case "lido": return "Lido";
          case "lendo": return "Lendo";
          case "quero_ler": return "Quero Ler";
          case "nao_lido": return "Não lido";
          default: return undefined;
        }
      };

      data.forEach((i) => {
        if (i.leituras && Array.isArray(i.leituras) && i.leituras.length > 0) {
          const primeiraLeitura = i.leituras[0];
          i.status_leitura = mapStatus(primeiraLeitura?.status);
          i.avaliacao = primeiraLeitura?.avaliacao;
        } else {
          i.status_leitura = undefined;
          i.avaliacao = undefined;
        }
      });

      setLivros(data);
      setLivrosFiltrados(data);
    } catch (err) {

    }
  }

  const excluirLivro = async (id: number): Promise<void> => {
    if (!confirm("Tem certeza que deseja excluir este livro?")) return;

    try {
      await LivroService.deletar(id);
      await carregarLivros();
      setLivroSelecionado(null);
    } catch (err) {
      console.error("Erro ao excluir:", err);
      const apiError = err as { message?: string };
      alert(apiError.message || "Erro ao excluir livro");
    }
  };

  const editarLivro = (livro: any) => {
    setLivroSelecionado(null);
    navigate("/EditarLivro", { state: { livro } });
  };

  const genero: string[] = [...new Set(livros.map((l: Livro) => l.genero).filter((g): g is string => !!g))];
  const editora: string[] = [...new Set(livros.map((l: Livro) => l.editora).filter((e): e is string => !!e))];

  return (
    <div className="biblioteca-container">

      <Sidebar onLogout={() => console.log("logout")} active="biblioteca" />

      <main className="main-content">

        <h1>Biblioteca</h1>


        <Filters
          livros={livros}
          generos={genero}
          editoras={editora}
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


        <div className="livros-grid">
          {livrosFiltrados.length === 0 ? (
            <p>Nenhum livro encontrado.</p>
          ) : (

            livrosFiltrados.map((livro: Livro) => (
              <LivroCard
                key={livro.id_livro}
                livro={livro}
                onClick={() => setLivroSelecionado(livro)}
              />
            ))
          )}
        </div>

      </main>


      {livroSelecionado && (
        <div className="modal-overlay" onClick={() => setLivroSelecionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{livroSelecionado.titulo}</h2>

            {livroSelecionado.capa && (
              <img
                src={livroSelecionado.capa}
                alt={livroSelecionado.titulo}
                style={{ maxWidth: "200px", margin: "10px 0" }}
              />
            )}

            <p><strong>Autor:</strong> {livroSelecionado.autor}</p>
            <p><strong>Gênero:</strong> {livroSelecionado.genero}</p>
            <p><strong>Editora:</strong> {livroSelecionado.editora}</p>
            <p><strong>Status:</strong> {livroSelecionado.status_leitura ?? "-"}</p>
            <p><strong>Avaliação:</strong> {"⭐".repeat(Number(livroSelecionado.avaliacao) || 0)}</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button onClick={() => editarLivro(livroSelecionado)}>
                Editar
              </button>
              <button onClick={() => excluirLivro(livroSelecionado.id_livro)}>
                Excluir
              </button>
              <button onClick={() => setLivroSelecionado(null)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}