import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import { LivroCard } from "../components/LivroCard";
import "../css/leitura.css";

// MOCK
const livrosMock = [
  {
    id_livro: 1,
    titulo: "Dom Casmurro",
    subtitulo: "",
    autor: "Machado de Assis",
    tipo_obra: "unico",
    nome_serie: "",
    ano_publicacao: 1899,
    num_paginas: 256,
    editora: "Editora X",
    genero: "Ficção",
    capa: "https://covers.openlibrary.org/b/id/8225261-L.jpg",
    status_leitura: "Lendo",
    avaliacao: 0,
    created_at: "",
    updated_at: "",
    usuarioId: 1
  },
  {
    id_livro: 2,
    titulo: "Clean Code",
    subtitulo: "",
    autor: "Robert C. Martin",
    tipo_obra: "unico",
    nome_serie: "",
    ano_publicacao: 2008,
    num_paginas: 464,
    editora: "Prentice Hall",
    genero: "Técnico",
    capa: "https://covers.openlibrary.org/b/id/9641984-L.jpg",
    status_leitura: "Lendo",
    avaliacao: 0,
    created_at: "",
    updated_at: "",
    usuarioId: 1
  }
];

export function Leitura() {

  const [livroSelecionado, setLivroSelecionado] = useState<any>(null);
  const [statusNovo, setStatusNovo] = useState("");
  const [avaliacao, setAvaliacao] = useState(0);

  const livrosLendo = livrosMock.filter(l => l.status_leitura === "Lendo");

  return (
    <div className="biblioteca-container">

      <Sidebar
        onLogout={() => console.log("logout")}
        active="leitura"
      />

      <main className="main-content">

        <header className="page-header">
          <h1>Minhas Leituras</h1>
          <p>{livrosLendo.length} livros em leitura</p>
        </header>

        {/* LISTA */}
        <div className="books-grid">
          {livrosLendo.map((livro) => (
            <LivroCard
              key={livro.id}
              livro={livro}
              onClick={() => setLivroSelecionado(livro)}
            />
          ))}
        </div>

        {/* MODAL */}
        {livroSelecionado && (
          <div className="modal-overlay">
            <div className="modal-content">

              <h2>{livroSelecionado.titulo}</h2>

              {/* STATUS */}
              {!statusNovo && (
                <>
                  <p>Escolha o status:</p>

                  <button onClick={() => setStatusNovo("Lido")}>
                    Marcar como Lido
                  </button>

                  <button onClick={() => setStatusNovo("Abandonado")}>
                    Abandonar
                  </button>
                </>
              )}

              {/* AVALIAÇÃO */}
              {statusNovo === "Lido" && (
                <>
                  <p>Avaliação:</p>

                  <div>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => setAvaliacao(n)}>
                        ⭐
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* BOTÕES */}
              {statusNovo && (
                <button onClick={() => {
                  console.log("Atualizar:", {
                    ...livroSelecionado,
                    status: statusNovo,
                    avaliacao: avaliacao
                  });

                  setLivroSelecionado(null);
                  setStatusNovo("");
                  setAvaliacao(0);
                }}>
                  Confirmar
                </button>
              )}

              <button onClick={() => {
                setLivroSelecionado(null);
                setStatusNovo("");
                setAvaliacao(0);
              }}>
                Fechar
              </button>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}