import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import "../css/CadastroLivro.css";
import LivroService from "../services/livroService";
import LivroServiceUpload from "../services/livroServiceUpload";

import { useNavigate, useLocation } from "react-router-dom";
import type { Livro } from "../types/livro";

export function EditarLivro() {
    const location = useLocation();
    const navigate = useNavigate();
    const livro = location.state?.livro as Livro;

    const [loading, setLoading] = useState(false);
    const [titulo, setTitulo] = useState(livro?.titulo || "");
    const [subtitulo, setSubtitulo] = useState(livro?.subtitulo || "");
    const [autor, setAutor] = useState(livro?.autor || "");
    const [tipoObra, setTipoObra] = useState<"unico" | "trilogia" | "serie" | "colecao" | "">((livro?.tipo_obra as any) || "");
    const [nomeSerie, setNomeSerie] = useState(livro?.nome_serie || "");
    const [anoPublicacao, setAnoPublicacao] = useState(livro?.ano_publicacao ? String(livro.ano_publicacao) : "");
    const [numPaginas, setNumPaginas] = useState(livro?.num_paginas ? String(livro.num_paginas) : "");
    const [genero, setGenero] = useState(livro?.genero || "");
    const [editora, setEditora] = useState(livro?.editora || "");
    const [capaFile, setCapaFile] = useState<File | null>(null);
    const [capaPreview, setCapaPreview] = useState(livro?.capa || "");
    // Novos campos: status e avaliação
    // status do livro: string (valor do select)
    const [status, setStatus] = useState("");
    const [avaliacao, setAvaliacao] = useState("0");

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
            setCapaPreview(livro?.capa || "");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!titulo) {
            alert("Título é obrigatório");
            return;
        }
        if (!autor) {
            alert("Autor é obrigatório");
            return;
        }
        if (!numPaginas) {
            alert("Número de páginas é obrigatório");
            return;
        }
        setLoading(true);
        try {
            // Mapeamento do valor do select para o tipo correto
            let statusMapped: "Lido" | "Lendo" | "Quero Ler" | "Abandonado" | undefined = undefined;
            switch (status) {
                case "lido":
                    statusMapped = "Lido";
                    console.log('statusMapped', statusMapped)
                    break;
                case "lendo":
                    statusMapped = "Lendo";
                    break;
                case "quero_ler":
                    statusMapped = "Quero Ler";
                    break;
                case "abandonado":
                    statusMapped = "Abandonado";
                    break;
                default:
                    statusMapped = undefined;
            }
            const dadosLivro = {
                titulo,
                subtitulo,
                autor,
                tipo_obra: tipoObra as any || 'unico',
                nome_serie: nomeSerie,
                ano_publicacao: anoPublicacao,
                num_paginas: numPaginas,
                genero,
                editora,
                status_leitura: statusMapped,
                avaliacao: Number(avaliacao),
            };
            if (capaFile) {
                await LivroServiceUpload.editarComCapa(livro.id_livro, dadosLivro, capaFile);
            } else {
                console.log('salvando alteração', dadosLivro)
                await LivroService.editarSemCapa(livro.id_livro, dadosLivro);
            }
            alert("Livro atualizado com sucesso!");
            navigate("/biblioteca");
        } catch (err: any) {
            alert(err?.message || "Erro ao atualizar livro");
        } finally {
            setLoading(false);
        }
    };

    if (!livro) {
        return <div>Carregando...</div>;
    }

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
                                onChange={handleCapaChange}
                                disabled={loading}
                            />
                        </div>
                        {/* PREVIEW */}
                        <div className="preview">
                            {capaPreview ? (
                                <img src={capaPreview} alt="capa" />
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
                        {/* SUBTÍTULO */}
                        <div className="input-group">
                            <label>Subtítulo</label>
                            <input
                                type="text"
                                value={subtitulo}
                                onChange={(e) => setSubtitulo(e.target.value)}
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
                        {/* TIPO OBRA */}
                        <div className="input-group">
                            <label>Tipo de Obra</label>
                            <select
                                value={tipoObra}
                                onChange={e => setTipoObra(e.target.value as "unico" | "trilogia" | "serie" | "colecao" | "")}
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
                        {/* NOME SÉRIE */}
                        <div className="input-group">
                            <label>Nome da Série</label>
                            <input
                                type="text"
                                value={nomeSerie}
                                onChange={(e) => setNomeSerie(e.target.value)}
                            />
                        </div>
                        {/* ANO PUBLICAÇÃO */}
                        <div className="input-group">
                            <label>Ano de Publicação</label>
                            <input
                                type="number"
                                value={anoPublicacao}
                                onChange={(e) => setAnoPublicacao(e.target.value)}
                                min={0}
                            />
                        </div>
                        {/* NÚMERO DE PÁGINAS */}
                        <div className="input-group">
                            <label>Número de Páginas</label>
                            <input
                                type="number"
                                value={numPaginas}
                                onChange={(e) => setNumPaginas(e.target.value)}
                                min={0}
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
                                disabled={loading}
                            >
                                <option value="">Selecione...</option>
                                <option value="quero_ler">Quero ler</option>
                                <option value="lendo">Lendo</option>
                                <option value="lido">Lido</option>
                                <option value="abandonado">Abandonado</option>
                            </select>
                        </div>
                        {/* AVALIAÇÃO */}
                        <div className="input-group">
                            <label>Avaliação</label>
                            <select
                                value={avaliacao}
                                onChange={e => setAvaliacao(e.target.value)}
                                disabled={loading}
                            >
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <button type="submit" className="btn-salvar" disabled={loading}>
                            {loading ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
