// frontend/src/pages/Leitura.tsx
import { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { LivroCard } from "../components/LivroCard";
import { leituraService } from "../services/leituraService";
import { anotacaoService } from "../services/anotacaoService";
import type { Anotacao } from "../types/anotacao";
import type { Leitura, StatusLeitura } from "../types/leitura";
import "../css/leitura.css";

export default function LeiturasPage() {
  const [leituras, setLeituras] = useState<Leitura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [livroSelecionado, setLivroSelecionado] = useState<Leitura | null>(null);
  const [statusNovo, setStatusNovo] = useState<StatusLeitura | "">("");
  const [avaliacao, setAvaliacao] = useState(0);
  const [resenha, setResenha] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  // Estados para anotações
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([]);
  const [paginaSelecionada, setPaginaSelecionada] = useState<number>(1);
  const [novaAnotacao, setNovaAnotacao] = useState({ titulo: "", conteudo: "" });
  const [editandoAnotacao, setEditandoAnotacao] = useState<Anotacao | null>(null);
  const [mostrarFormAnotacao, setMostrarFormAnotacao] = useState(false);
  const [carregandoAnotacoes, setCarregandoAnotacoes] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<"progresso" | "anotacoes">("progresso");

  // Carregar leituras em andamento
  useEffect(() => {
    carregarLeituras();
  }, []);

  const carregarLeituras = async () => {
    setLoading(true);
    setError("");
    try {
      const leiturasEmAndamento = await leituraService.listarLeiturasEmAndamento();
      setLeituras(leiturasEmAndamento);
    } catch (err: any) {
      console.error("Erro ao carregar leituras:", err);
      setError(err.erro || "Erro ao carregar leituras");
    } finally {
      setLoading(false);
    }
  };

  const handleAbrirModal = async (leitura: Leitura) => {
    setLivroSelecionado(leitura);
    setPaginaAtual(leitura.pagina_atual || 0);
    setTotalPaginas(leitura.livro?.num_paginas || 0);
    setPaginaSelecionada(leitura.pagina_atual || 1);
    setStatusNovo("");
    setAvaliacao(0);
    setResenha("");
    setAbaAtiva("progresso");
    await carregarAnotacoes(leitura.id_leitura, leitura.pagina_atual || 1);
  };

  const carregarAnotacoes = async (id_leitura: number, pagina: number) => {
    setCarregandoAnotacoes(true);
    try {
      const response = await anotacaoService.buscarPorPagina(id_leitura, pagina);
      setAnotacoes(response.anotacoes);
    } catch (err) {
      console.error("Erro ao carregar anotações:", err);
      setAnotacoes([]);
    } finally {
      setCarregandoAnotacoes(false);
    }
  };

  const handlePaginaChange = async (novaPagina: number) => {
    if (novaPagina < 1 || novaPagina > totalPaginas) return;
    setPaginaSelecionada(novaPagina);
    if (livroSelecionado) {
      await carregarAnotacoes(livroSelecionado.id_leitura, novaPagina);
    }
  };

  const handleCriarAnotacao = async () => {
    if (!livroSelecionado) return;
    if (!novaAnotacao.conteudo.trim()) {
      alert("O conteúdo da anotação é obrigatório");
      return;
    }

    try {
      await anotacaoService.criarAnotacao({
        id_leitura: livroSelecionado.id_leitura,
        pagina: paginaSelecionada,
        titulo: novaAnotacao.titulo || undefined,
        conteudo: novaAnotacao.conteudo
      });

      await carregarAnotacoes(livroSelecionado.id_leitura, paginaSelecionada);
      setNovaAnotacao({ titulo: "", conteudo: "" });
      setMostrarFormAnotacao(false);
      alert("Anotação criada com sucesso!");
    } catch (err: any) {
      alert(err.erro || "Erro ao criar anotação");
    }
  };

  const handleAtualizarAnotacao = async () => {
    if (!editandoAnotacao) return;

    try {
      await anotacaoService.atualizarAnotacao(editandoAnotacao.id_anotacao, {
        titulo: editandoAnotacao.titulo,
        conteudo: editandoAnotacao.conteudo
      });

      if (livroSelecionado) {
        await carregarAnotacoes(livroSelecionado.id_leitura, paginaSelecionada);
      }

      setEditandoAnotacao(null);
      alert("Anotação atualizada com sucesso!");
    } catch (err: any) {
      alert(err.erro || "Erro ao atualizar anotação");
    }
  };

  const handleDeletarAnotacao = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta anotação?")) return;

    try {
      await anotacaoService.deletarAnotacao(id);

      if (livroSelecionado) {
        await carregarAnotacoes(livroSelecionado.id_leitura, paginaSelecionada);
      }

      alert("Anotação excluída com sucesso!");
    } catch (err: any) {
      alert(err.erro || "Erro ao excluir anotação");
    }
  };

  const handleAtualizarProgresso = async () => {
    if (!livroSelecionado) return;

    try {
      await leituraService.atualizarProgresso(livroSelecionado.id_leitura, {
        pagina_atual: paginaAtual,
        status: statusNovo as StatusLeitura || livroSelecionado.status
      });

      await carregarLeituras();
      setLivroSelecionado(null);
      alert("Progresso atualizado com sucesso!");
    } catch (err: any) {
      alert(err.erro || "Erro ao atualizar progresso");
    }
  };

  const handleMarcarComoLido = async () => {
    if (!livroSelecionado) return;

    try {
      await leituraService.marcarComoLido(
        livroSelecionado.id_leitura,
        avaliacao,
        resenha
      );

      await carregarLeituras();
      setLivroSelecionado(null);
      setStatusNovo("");
      alert("Livro marcado como lido com sucesso!");
    } catch (err: any) {
      alert(err.erro || "Erro ao marcar como lido");
    }
  };

  const handleAbandonar = async () => {
    if (!livroSelecionado) return;

    try {
      await leituraService.atualizarProgresso(livroSelecionado.id_leitura, {
        pagina_atual: paginaAtual,
        status: 'abandonado'
      });

      await carregarLeituras();
      setLivroSelecionado(null);
      alert("Leitura abandonada!");
    } catch (err: any) {
      alert(err.erro || "Erro ao abandonar leitura");
    }
  };

  if (loading) {
    return (
      <div className="biblioteca-container">
        <Sidebar onLogout={() => console.log("logout")} active="leitura" />
        <main className="main-content">
          <div style={{ textAlign: "center", padding: "50px" }}>
            Carregando suas leituras...
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="biblioteca-container">
        <Sidebar onLogout={() => console.log("logout")} active="leitura" />
        <main className="main-content">
          <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
            ❌ {error}
            <button onClick={carregarLeituras} style={{ marginLeft: "10px" }}>
              Tentar novamente
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="biblioteca-container">
      <Sidebar onLogout={() => console.log("logout")} active="leitura" />

      <main className="main-content">
        <header className="page-header">
          <h1>Minhas Leituras</h1>
          <p>{leituras.length} livro(s) em leitura</p>
        </header>

        <div className="books-grid">
          {leituras.length === 0 ? (
            <p>Nenhum livro em leitura. Comece uma nova leitura na biblioteca!</p>
          ) : (
            leituras.map((leitura) => (
              <LivroCard
                key={leitura.id_leitura}
                livro={{
                  id_livro: leitura.livro?.id_livro || leitura.id_livro,
                  titulo: leitura.livro?.titulo || "",
                  autor: leitura.livro?.autor || "",
                  tipo_obra: "unico",
                  num_paginas: leitura.livro?.num_paginas || 0,
                  genero: leitura.livro?.genero || "",
                  avaliacao: leitura.avaliacao || 0,
                  capa: leitura.livro?.capa || ""
                }}
                onClick={() => handleAbrirModal(leitura)}
              />
            ))
          )}
        </div>

        {/* MODAL DE LEITURA COM ABAS */}
        {livroSelecionado && (
          <div className="modal-overlay" onClick={() => setLivroSelecionado(null)}>
            <div className="modal-content-large" onClick={(e) => e.stopPropagation()}>

              {/* CABEÇALHO */}
              <div className="modal-header">
                <h2>{livroSelecionado.livro?.titulo}</h2>
                <p><strong>Autor:</strong> {livroSelecionado.livro?.autor}</p>
              </div>

              {/* ABAS */}
              <div className="tabs">
                <button
                  className={abaAtiva === "progresso" ? "tab-active" : "tab"}
                  onClick={() => setAbaAtiva("progresso")}
                >
                  📊 Progresso
                </button>
                <button
                  className={abaAtiva === "anotacoes" ? "tab-active" : "tab"}
                  onClick={() => setAbaAtiva("anotacoes")}
                >
                  📝 Anotações ({anotacoes.length})
                </button>
              </div>

              {/* CONTEÚDO - PROGRESSO */}
              {abaAtiva === "progresso" && (
                <div className="tab-content">
                  <div className="progress-info">
                    <p><strong>Progresso:</strong> {paginaAtual} / {totalPaginas} páginas</p>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${(paginaAtual / totalPaginas) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Página atual:</label>
                    <input
                      type="number"
                      value={paginaAtual}
                      onChange={(e) => setPaginaAtual(Number(e.target.value))}
                      min={0}
                      max={totalPaginas}
                    />
                  </div>

                  {!statusNovo && (
                    <>
                      <p>O que deseja fazer?</p>
                      <div className="button-group">
                        <button onClick={() => setStatusNovo("lido")}>
                          Marcar como Lido
                        </button>
                        <button onClick={() => setStatusNovo("abandonado")}>
                          Abandonar
                        </button>
                        <button onClick={handleAtualizarProgresso}>
                          Atualizar Progresso
                        </button>
                      </div>
                    </>
                  )}

                  {statusNovo === "lido" && (
                    <>
                      <p>Avaliação (0-5):</p>
                      <div className="avaliacao-buttons">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            className={avaliacao === n ? "active" : ""}
                            onClick={() => setAvaliacao(n)}
                          >
                            {n} ⭐
                          </button>
                        ))}
                      </div>

                      <div className="input-group">
                        <label>Resenha (opcional):</label>
                        <textarea
                          value={resenha}
                          onChange={(e) => setResenha(e.target.value)}
                          rows={3}
                          placeholder="Escreva sua resenha aqui..."
                        />
                      </div>

                      <button onClick={handleMarcarComoLido}>Confirmar</button>
                    </>
                  )}

                  {statusNovo === "abandonado" && (
                    <button onClick={handleAbandonar}>Confirmar Abandono</button>
                  )}
                </div>
              )}

              {/* CONTEÚDO - ANOTAÇÕES */}
              {abaAtiva === "anotacoes" && (
                <div className="tab-content">
                  <div className="pagina-navegacao">
                    <button
                      onClick={() => handlePaginaChange(paginaSelecionada - 1)}
                      disabled={paginaSelecionada <= 1}
                    >
                      ◀ Página {paginaSelecionada - 1}
                    </button>
                    <span>Página {paginaSelecionada}</span>
                    <button
                      onClick={() => handlePaginaChange(paginaSelecionada + 1)}
                      disabled={paginaSelecionada >= totalPaginas}
                    >
                      Página {paginaSelecionada + 1} ▶
                    </button>
                  </div>

                  <div className="anotacoes-lista">
                    {carregandoAnotacoes ? (
                      <p>Carregando anotações...</p>
                    ) : anotacoes.length === 0 ? (
                      <p className="sem-anotacoes">Nenhuma anotação nesta página.</p>
                    ) : (
                      anotacoes.map((anotacao) => (
                        <div key={anotacao.id_anotacao} className="anotacao-item">
                          {editandoAnotacao?.id_anotacao === anotacao.id_anotacao ? (
                            <div className="anotacao-edicao">
                              <input
                                type="text"
                                placeholder="Título"
                                value={editandoAnotacao.titulo || ""}
                                onChange={(e) => setEditandoAnotacao({
                                  ...editandoAnotacao,
                                  titulo: e.target.value
                                })}
                              />
                              <textarea
                                placeholder="Conteúdo"
                                value={editandoAnotacao.conteudo}
                                onChange={(e) => setEditandoAnotacao({
                                  ...editandoAnotacao,
                                  conteudo: e.target.value
                                })}
                                rows={4}
                              />
                              <div className="anotacao-botoes">
                                <button onClick={handleAtualizarAnotacao}>Salvar</button>
                                <button onClick={() => setEditandoAnotacao(null)}>Cancelar</button>
                              </div>
                            </div>
                          ) : (
                            <>
                              {anotacao.titulo && <h4>{anotacao.titulo}</h4>}
                              <p>{anotacao.conteudo}</p>
                              <div className="anotacao-botoes">
                                <button onClick={() => setEditandoAnotacao(anotacao)}>✏️ Editar</button>
                                <button onClick={() => handleDeletarAnotacao(anotacao.id_anotacao)}>🗑️ Excluir</button>
                              </div>
                            </>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {!mostrarFormAnotacao ? (
                    <button
                      className="btn-nova-anotacao"
                      onClick={() => setMostrarFormAnotacao(true)}
                    >
                      + Nova Anotação na Página {paginaSelecionada}
                    </button>
                  ) : (
                    <div className="nova-anotacao-form">
                      <h4>Nova Anotação</h4>
                      <input
                        type="text"
                        placeholder="Título (opcional)"
                        value={novaAnotacao.titulo}
                        onChange={(e) => setNovaAnotacao({ ...novaAnotacao, titulo: e.target.value })}
                      />
                      <textarea
                        placeholder="Escreva sua anotação aqui..."
                        value={novaAnotacao.conteudo}
                        onChange={(e) => setNovaAnotacao({ ...novaAnotacao, conteudo: e.target.value })}
                        rows={5}
                      />
                      <div className="anotacao-botoes">
                        <button onClick={handleCriarAnotacao}>Salvar</button>
                        <button onClick={() => {
                          setMostrarFormAnotacao(false);
                          setNovaAnotacao({ titulo: "", conteudo: "" });
                        }}>Cancelar</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="modal-footer">
                <button onClick={() => setLivroSelecionado(null)}>Fechar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}