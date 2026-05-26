import { useState } from "react";
import LivroService from "../services/livroService";
import { useNavigate } from "react-router-dom";
import LivroServiceUpload from "../services/livroServiceUpload";
import { Sidebar } from "../components/sidebar";
import "../css/CadastroLivro.css";
import { showErrorAlert, showSuccessAlert, showWarningToast } from '../utils/alertUtils';


export function CadastroLivro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [tipoObra, setTipoObra] = useState("");
  const [nomeSerie, setNomeSerie] = useState("");
  const [anoPublicacao, setAnoPublicacao] = useState("");
  const [numPaginas, setNumPaginas] = useState("");
  const [genero, setGenero] = useState("");
  const [editora, setEditora] = useState("");
  const [capaFile, setCapaFile] = useState<File | null>(null);
  const [capaPreview, setCapaPreview] = useState("");

  // Google Books
  const [buscaLivro, setBuscaLivro] = useState("");
  const [resultadosGoogle, setResultadosGoogle] = useState<any[]>([]);
  const [buscando, setBuscando] = useState(false);

  const handleBuscarGoogleBooks = async () => {
    if (!buscaLivro.trim()) return;
    setBuscando(true);
    try {
      const livros = await LivroService.buscarGoogleBooks(buscaLivro);
      setResultadosGoogle(livros);
    } catch (e) {
      showErrorAlert("Erro ao buscar livros no Google Books");
    } finally {
      setBuscando(false);
    }
  };

  const preencherCamposLivro = (livro: any) => {
    const volumeInfo = livro.volumeInfo || livro;
    setTitulo(volumeInfo.title || livro.titulo || "");
    setAutor((volumeInfo.authors ? volumeInfo.authors.join(", ") : livro.autor || ""));
    setAnoPublicacao(volumeInfo.publishedDate || livro.ano_publicacao || "");
    setEditora(volumeInfo.publisher || livro.editora || "");
    setGenero((volumeInfo.categories && volumeInfo.categories[0]) || livro.genero || "");
    setNumPaginas(volumeInfo.pageCount || livro.num_paginas || "");
    if (volumeInfo.imageLinks?.thumbnail || livro.capa) {
      setCapaPreview(volumeInfo.imageLinks?.thumbnail || livro.capa);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo) {
      showWarningToast("Título é obrigatório");
      return;
    }
    if (!autor) {
      showWarningToast("Título é obrigatório");
      return;
    }
    if (!numPaginas) {
      showWarningToast("Título é obrigatório");
      return;
    }
    if (!capaFile) {
      showWarningToast("Título é obrigatório");
      return;
    }
    setLoading(true);
    try {
      await LivroServiceUpload.cadastrarComCapa({
        titulo,
        subtitulo,
        autor,
        tipo_obra: tipoObra as any || 'unico',
        nome_serie: nomeSerie,
        ano_publicacao: anoPublicacao,
        num_paginas: numPaginas,
        genero,
        editora,
      }, capaFile);

      showSuccessAlert("Livro cadastrado com sucesso!");

      setTitulo("");
      setSubtitulo("");
      setAutor("");
      setTipoObra("");
      setNomeSerie("");
      setAnoPublicacao("");
      setNumPaginas("");
      setGenero("");
      setEditora("");
      setCapaPreview("");
      setCapaFile(null);
      navigate("/Biblioteca");
    } catch (err: any) {
      showErrorAlert("Erro ao cadastrar livro");
    }
  };
  const handleCapaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCapaFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCapaPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCapaFile(null);
      setCapaPreview("");
    }
  };

  return (
    <div className="cadastro-container">
      <Sidebar onLogout={handleLogout} active="CadastroLivro" />
      <main className="main-content">
        <h1>Cadastrar Livro</h1>
        <div className="form-wrapper">
          {/* Busca Google Books */}
          <div className="input-group">
            <label>Buscar Livro no Google Books</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                value={buscaLivro}
                onChange={e => setBuscaLivro(e.target.value)}
                placeholder="Digite título, autor, etc."
                disabled={buscando}
              />
              <button type="button" onClick={handleBuscarGoogleBooks} disabled={buscando || !buscaLivro.trim()}>
                {buscando ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </div>
          {resultadosGoogle.length > 0 && (
            <div className="resultados-google-books" style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 16 }}>
              {resultadosGoogle.map((livro, idx) => {
                const volumeInfo = livro.volumeInfo || livro;
                const capa = volumeInfo.imageLinks?.thumbnail || livro.capa;
                const titulo = volumeInfo.title || livro.titulo || "Sem título";
                const autor = (volumeInfo.authors ? volumeInfo.authors.join(", ") : livro.autor || "");
                return (
                  <div key={idx} style={{ border: '1px solid #ccc', padding: 8, marginBottom: 4, cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => preencherCamposLivro(livro)}>
                    {capa ? (
                      <img src={capa} alt="capa" style={{ width: 40, height: 60, objectFit: 'cover', marginRight: 8 }} />
                    ) : (
                      <span style={{ width: 40, height: 60, display: 'inline-block', background: '#eee', marginRight: 8 }} />
                    )}
                    <div>
                      <div><b>{titulo}</b></div>
                      <div style={{ fontSize: 12 }}>{autor}</div>
                    </div>
                  </div>
                );
              })}
              <div style={{ fontSize: 12, color: '#888' }}>(Clique em um livro para preencher o formulário)</div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="form-cadastro">
            <div className="input-group">
              <label>Capa</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCapaChange}
                required
                disabled={loading}
              />
            </div>
            <div className="preview">
              {capaPreview ? (
                <img src={capaPreview} alt="capa" />
              ) : (
                <span>📖</span>
              )}
            </div>

            <div className="input-group">
              <label>Título *</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Subtítulo</label>
              <input
                type="text"
                value={subtitulo}
                onChange={(e) => setSubtitulo(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Autor</label>
              <input
                type="text"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Tipo de Obra</label>
              <select
                value={tipoObra}
                onChange={e => setTipoObra(e.target.value)}
                required
                disabled={loading}
              >
                <option value="">Selecione...</option>
                <option value="unico">Único</option>
                <option value="trilogia">Trilogia</option>
                <option value="serie">Série</option>
                <option value="colecao">Coleção</option>
              </select>
            </div>

            <div className="input-group">
              <label>Nome da Série</label>
              <input
                type="text"
                value={nomeSerie}
                onChange={(e) => setNomeSerie(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Ano de Publicação</label>
              <input
                type="number"
                value={anoPublicacao}
                onChange={(e) => setAnoPublicacao(e.target.value)}
                min={0}
              />
            </div>

            <div className="input-group">
              <label>Número de Páginas</label>
              <input
                type="number"
                value={numPaginas}
                onChange={(e) => setNumPaginas(e.target.value)}
                min={0}
              />
            </div>

            <div className="input-group">
              <label>Gênero</label>
              <input
                type="text"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Editora</label>
              <input
                type="text"
                value={editora}
                onChange={(e) => setEditora(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-salvar">
              Salvar Livro
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}