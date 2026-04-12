import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import "../css/CadastroLivro.css";

export function CadastroLivro() {

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [editora, setEditora] = useState("");
  const [status, setStatus] = useState("Não lido");
  const [avaliacao, setAvaliacao] = useState(0);
  const [capa, setCapa] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo) {
      alert("Título é obrigatório");
      return;
    }

    const novoLivro = {
      id: Date.now(),
      titulo,
      autor,
      genero,
      editora,
      status,
      avaliacao,
      capa
    };

    console.log("Livro salvo:", novoLivro);

    alert("Livro cadastrado com sucesso!");

    // limpar formulário
    setTitulo("");
    setAutor("");
    setGenero("");
    setEditora("");
    setStatus("Não lido");
    setAvaliacao(0);
    setCapa("");
  };

  return (
    <div className="cadastro-container">

      <Sidebar 
        onLogout={() => console.log("logout")} 
        active="CadastroLivro" 
      />

      <main className="main-content">

        <h1>Cadastrar Livro</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form-cadastro">

  {/* CAPA */}
  <div className="input-group">
    <label>URL da Capa</label>
    <input
      type="text"
      value={capa}
      onChange={(e) => setCapa(e.target.value)}
      placeholder="https://imagem..."
    />
  </div>

  {/* PREVIEW */}
  <div className="preview">
    {capa ? (
      <img src={capa} alt="capa" />
    ) : (
      <span>📖</span>
    )}
  </div>

  {/* TÍTULO */}
  <div className="input-group">
    <label>Título *</label>
    <input
      type="text"
      value={titulo}
      onChange={(e) => setTitulo(e.target.value)}
      required
    />
  </div>

  {/* AUTOR */}
  <div className="input-group">
    <label>Autor</label>
    <input
      type="text"
      value={autor}
      onChange={(e) => setAutor(e.target.value)}
    />
  </div>

  {/* GÊNERO */}
  <div className="input-group">
    <label>Gênero</label>
    <input
      type="text"
      value={genero}
      onChange={(e) => setGenero(e.target.value)}
    />
  </div>

  {/* EDITORA */}
  <div className="input-group">
    <label>Editora</label>
    <input
      type="text"
      value={editora}
      onChange={(e) => setEditora(e.target.value)}
    />
  </div>

  {/* STATUS */}
  <div className="input-group">
    <label>Status</label>
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option>Não lido</option>
      <option>Lendo</option>
      <option>Lido</option>
    </select>
  </div>

  {/* AVALIAÇÃO */}
  <div className="input-group">
    <label>Avaliação</label>
    <select
      value={avaliacao}
      onChange={(e) => setAvaliacao(Number(e.target.value))}
    >
      <option value={0}>0</option>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
    </select>
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