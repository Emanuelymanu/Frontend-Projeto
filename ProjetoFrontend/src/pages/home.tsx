// Importando os ícones profissionais! 
// (Coloquei 'Home as HomeIcon' para não confundir com o nome da nossa página)
import {
  Home as HomeIcon,
  LayoutDashboard,
  Library,
  BookPlus,
  User,
  Newspaper,
  LogOut,
  ImagePlus,
  BookOpen
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './css/home.css';

export function Home() {

  const navigate = useNavigate();
  const [usuarioNome, setUsuarioNome] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    const usuario = authService.getUser();
    if(usuario){
      setUsuarioNome(usuario.nome);
    }
    setLoading(false);
}, [navigate]);

const handleLogout= ()=> {
  authService.logout();
}
  

  return (
    <div className="home-container">

      {/* MENU LATERAL (SIDEBAR) */}
      <aside className="sidebar">
        <div className="sidebar-header">
          {/* O ícone principal da logo */}
          <BookOpen size={28} color="#1d4ed8" />
          <h2>Biblioteca</h2>
        </div>

        <nav className="sidebar-menu">
          <a href="#" className="menu-item active">
            <HomeIcon size={20} /> Início
          </a>
          <a href="dashboard" className="menu-item">
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#" className="menu-item">
            <Library size={20} /> Biblioteca
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
          {/* Adicionamos a barra '/' para ele voltar pro login quando clicar em sair no futuro */}
          <a href="/" className="menu-item logout">
            <LogOut size={20} onClick={handleLogout} /> Sair
          </a>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL (DIREITA) */}
      <main className="main-content">

        {/* Banner com degradê */}
        <section className="welcome-banner">
          <div className="banner-content">
            <BookOpen size={48} color="white" />

            {/* 2. USAMOS A VARIÁVEL AQUI COM AS CHAVES { } */}
            <h1>Bem-vindo, { usuarioNome}!</h1>

            <p>Organize sua biblioteca pessoal</p>
          </div>
          <button className="btn-personalizar">
            <ImagePlus size={18} /> Personalizar Banner
          </button>
        </section>

        {/* Seção de Últimos Livros */}
        <section className="recent-books-section">
          <h2>Últimos Livros Acessados</h2>

          <div className="empty-state-card">
            <BookOpen size={48} color="#94a3b8" />
            <p>Você ainda não acessou nenhum livro</p>
          </div>
        </section>

      </main>

    </div>
  );
}