import { useState } from 'react';
// Aqui nós avisamos o React para carregar os estilos que vamos criar no passo 2
import './css/login.css'; 

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (evento: React.FormEvent) => {
    evento.preventDefault(); 
    console.log('Tentando fazer login com:', email, password);
  };

  return (
    // A div 'login-container' vai ocupar a tela toda e ter o fundo azul claro
    <div className="login-container">
      
      {/* A div 'login-card' é o quadrado branco no centro */}
      <div className="login-card">
        
        {/* Ícone de Livro (Desenhado com SVG puro para não precisar baixar imagens) */}
        <div className="icon-container">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
        </div>

        <h1 className="login-title">Minha Biblioteca</h1>
        <p className="login-subtitle">Entre para gerenciar seus livros</p>

        <form onSubmit={handleLogin} className="login-form">
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input 
              id="password"
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>

        </form>

        <div className="login-footer">
          Não tem uma conta? <a href="#">Cadastre-se</a>
        </div>

      </div>
    </div>
  );
}