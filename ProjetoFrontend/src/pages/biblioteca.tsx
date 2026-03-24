import { useState } from 'react';
import { 
  Home as HomeIcon, 
  LayoutDashboard, 
  Library, 
  BookOpen, 
  Book,
  BookPlus, 
  User, 
  Newspaper, 
  LogOut,
  Search // Importamos a lupa para a barra de pesquisa
} from 'lucide-react';

import './css/biblioteca.css';

export function Biblioteca() {
  
  // Estado para simular quantos livros foram encontrados
  const [quantidadeLivros, setQuantidadeLivros] = useState(0);

  return (
    <div className="biblioteca-container">
      
      {/* MENU LATERAL (SIDEBAR) */}
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
          {/* O item Biblioteca agora é o ativo! */}
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

      {/* CONTEÚDO PRINCIPAL */}
      <main className="main-content">
        
        <header className="page-header">
          <h1>Biblioteca</h1>
          <p>{quantidadeLivros} livros encontrados</p>
        </header>

        {/* ÁREA DE FILTROS */}
        <section className="filter-section">
          <div className="filter-card">
            
            {/* Campo de Busca */}
            <div className="search-group">
              <label>Buscar por título ou autor</label>
              <div className="input-wrapper">
                <Search size={18} color="#94a3b8" className="search-icon" />
                <input type="text" placeholder="Digite para buscar..." />
              </div>
            </div>

            {/* Grid dos Selects */}
            <div className="filters-grid">
              
              <div className="select-group">
                <label>Status</label>
                <select>
                  <option>Todos</option>
                  <option>Lidos</option>
                  <option>Lendo</option>
                  <option>Não Lidos</option>
                </select>
              </div>

              <div className="select-group">
                <label>Gênero</label>
                <select>
                  <option>Todos</option>
                  <option>Ficção</option>
                  <option>Técnico</option>
                  <option>Fantasia</option>
                </select>
              </div>

              <div className="select-group">
                <label>Editora</label>
                <select>
                  <option>Todas</option>
                </select>
              </div>

              <div className="select-group">
                <label>Avaliação</label>
                <select>
                  <option>Todas</option>
                  <option>1 Estrela</option>
                  <option>2 Estrelas</option>
                  <option>3 Estrelas</option>
                  <option>4 Estrelas</option>
                  <option>5 Estrelas</option>
                </select>
              </div>

              <div className="select-group">
                <label>Ordenar por</label>
                <select>
                    <option>A-Z</option>
                  <option>Mais Recentes</option>
                 <option>Menos Recentes</option>
                </select>
              </div>

            </div>
          </div>
        </section>

        {/* RESULTADO VAZIO */}
        <section className="results-section">
          <div className="empty-results-card">
            <p>Nenhum livro encontrado com os filtros selecionados</p>
          </div>
        </section>

      </main>
    </div>
  );
}