import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import "../css/CadastroLivro.css";
import LivroService from "../services/livroService";
import LivroServiceUpload from "../services/livroServiceUpload";

import { useNavigate, useLocation } from "react-router-dom";

export function EditarLivro() {
    const navigate = useNavigate();
    const location = useLocation();
    // Aceita tanto id quanto id_livro e status em ambos formatos
    const livro: any = location.state?.livro;

    const [titulo, setTitulo] = useState(livro?.titulo || "");
    const [autor, setAutor] = useState(livro?.autor || "");
    const [genero, setGenero] = useState(livro?.genero || "");
    const [editora, setEditora] = useState(livro?.editora || "");
    // Normaliza status para o formato do select
    const statusOptions = [
        { value: "lido", label: "Lido" },
        { value: "lendo", label: "Lendo" },
        { value: "nao lido", label: "Não lido" },
        { value: "abandonado", label: "Abandonado" },
        { value: "quero ler", label: "Quero Ler" }
    ];
    const [status, setStatus] = useState<string>(livro?.status || "nao lido");
    const [avaliacao, setAvaliacao] = useState(livro?.avaliacao || 0);
    const [capa, setCapa] = useState(livro?.capa || "");
    const [capaFile, setCapaFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!titulo) {
            alert("Título é obrigatório");
            return;
        }
        try {
            const id = livro.id_livro || livro.id;
            // Converte status para formato do backend se necessário
            // Converte status para formato do LivroInput
            let statusBackend: "Lido" | "Lendo" | "Quero Ler" | "Abandonado" | undefined = undefined;
            switch (status) {
                case "lido": statusBackend = "Lido"; break;
                case "lendo": statusBackend = "Lendo"; break;
                case "quero ler": statusBackend = "Quero Ler"; break;
                case "abandonado": statusBackend = "Abandonado"; break;
                case "nao lido": statusBackend = undefined; break;
                case "Lido": statusBackend = "Lido"; break;
                case "Lendo": statusBackend = "Lendo"; break;
                case "Quero Ler": statusBackend = "Quero Ler"; break;
                case "Abandonado": statusBackend = "Abandonado"; break;
            }
            if (capaFile) {
                await LivroServiceUpload.editarComCapa(id, {
                    titulo,
                    autor,
                    genero,
                    editora,
                    status: statusBackend,
                    avaliacao
                }, capaFile);
            } else {
                await LivroService.editar(id, {
                    titulo,
                    autor,
                    genero,
                    editora,
                    status: statusBackend,
                    avaliacao,
                    capa
                });
            }
            alert("Livro atualizado com sucesso!");
            navigate("/biblioteca");
        } catch (err: any) {
            alert(err?.message || "Erro ao atualizar livro");
        }
    };

    return (
        <div className="cadastro-container">
            <Sidebar onLogout={() => console.log("logout")} active="EditarLivro" />
            <main className="main-content">
                <h1>Editar Livro</h1>
                <div className="form-wrapper">
                    <form onSubmit={handleSubmit} className="form-cadastro">
                        {/* CAPA */}
                        <div className="input-group">
                            <label>Capa</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => {
                                    const file = e.target.files?.[0];
                                    setCapaFile(file || null);
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = ev => setCapa(ev.target?.result as string);
                                        reader.readAsDataURL(file);
                                    } else {
                                        setCapa(livro?.capa || "");
                                    }
                                }}
                            />
                        </div>
                        {/* PREVIEW */}
                        <div className="preview">
                            {capa ? <img src={capa} alt="capa" /> : <span>📖</span>}
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
                                onChange={e => setStatus(e.target.value)}
                            >
                                {statusOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
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
                            Salvar Alterações
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
