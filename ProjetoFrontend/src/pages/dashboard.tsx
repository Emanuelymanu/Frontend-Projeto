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
  Circle,
  BookMarked,
  CheckCircle
} from 'lucide-react';

import './css/dashboard.css';

export function Dashboard() {
  
  // Variáveis simulando os dados que virão do Back-end no futuro
  const stats = {
    total: 0,
    naoLidos: 0,
    lendo: 0,
    lidos: 0
  };

  return (
    <div className="dashboard-container">
      
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
          {/* Agora o Dashboard é o item ativo! */}
          <a href="/dashboard" className="menu-item active">
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#" className="menu-item">
            <Library size={20} /> Biblioteca
          </a>
          {/* Adicionei o item Leituras que vi na sua imagem */}
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
          <h1>Dashboard</h1>
          <p>Visão geral da sua biblioteca</p>
        </header>

        {/* Grid com os 4 Cards */}
        <section className="stats-grid">
          
          {/* Card 1: Total */}
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-title">Total de Livros</span>
              <span className="stat-value">{stats.total}</span>
            </div>
            <div className="stat-icon">
              <BookOpen size={32} color="#3b82f6" /> {/* Azul */}
            </div>
          </div>

          {/* Card 2: Não Lidos */}
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-title">Não Lidos</span>
              <span className="stat-value">{stats.naoLidos}</span>
            </div>
            <div className="stat-icon">
              <Circle size={32} color="#94a3b8" /> {/* Cinza */}
            </div>
          </div>

          {/* Card 3: Lendo */}
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-title">Lendo</span>
              <span className="stat-value">{stats.lendo}</span>
            </div>
            <div className="stat-icon">
              <BookMarked size={32} color="#f97316" /> {/* Laranja */}
            </div>
          </div>

          {/* Card 4: Lidos */}
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-title">Lidos</span>
              <span className="stat-value">{stats.lidos}</span>
            </div>
            <div className="stat-icon">
              <CheckCircle size={32} color="#22c55e" /> {/* Verde */}
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}