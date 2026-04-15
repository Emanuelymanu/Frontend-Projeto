import {
  Home,
  LayoutDashboard,
  Library,
  BookPlus,
  User,
  LogOut,
  BookOpen
} from "lucide-react";

import { Link } from "react-router-dom";

interface SidebarProps {
  onLogout: () => void;
  active: string;
}

export function Sidebar({ onLogout, active }: SidebarProps) {
  return (
    <aside className="sidebar">

      <div className="sidebar-header">
        <BookOpen size={28} color="#1d4ed8" />
        <h2>Diário Digital</h2>
      </div>

      <nav className="sidebar-menu">
        <Link to="/home" className={`menu-item ${active === "home" ? "active" : ""}`}>
          <Home size={20} /> Início
        </Link>

        <Link to="/dashboard" className={`menu-item ${active === "dashboard" ? "active" : ""}`}>
          <LayoutDashboard size={20} /> Dashboard
        </Link>

        <Link to="/biblioteca" className={`menu-item ${active === "biblioteca" ? "active" : ""}`}>
          <Library size={20} /> Biblioteca
        </Link>

        <Link to="/CadastroLivro" className={`menu-item ${active === "CadastroLivro" ? "active" : ""}`}>
          <BookPlus size={20} /> Cadastrar
        </Link>


        <Link to="/leitura" className={`menu-item ${active === "leitura" ? "active" : ""}`}>
          <BookOpen size={20} /> Leituras
        </Link>

        <Link to="/anotacoes-resenhas" className={`menu-item ${active === "anotacoes-resenhas" ? "active" : ""}`}>
          <BookOpen size={20} /> Anotações & Resenhas
        </Link>

        <Link to="/MeuPerfil" className={`menu-item ${active === "MeuPerfil" ? "active" : ""}`}>
          <User size={20} /> Minha Conta
        </Link>

      </nav>

      <div className="sidebar-footer">
        <button onClick={onLogout} className="menu-item logout">
          <LogOut size={20} /> Sair
        </button>
      </div>

    </aside>
  );
}