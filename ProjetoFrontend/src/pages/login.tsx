import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Aqui nós avisamos o React para carregar os estilos que vamos criar no passo 2
import './css/login.css';
import { authService } from '../services/authService';
import type { ApiError } from '../types/auth';

export function Login() {
  const navegate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleLogin = async (evento: React.FormEvent) => {
    evento.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login({ email, senha });
      console.log('Login realizado com sucesso', response);
      navegate('/home');
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.mensagem || "Erro ao fazer login")
      console.error("Erro no login", error);
    } finally {
      setLoading(false);
    }
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
        {/* <div className='error-mensagem' style={{
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          padding: '10px',
          borderRadius: '6px',
          marginBottom: '15px',
          fontSize: '14px'
        }}>
          {error}
        </div> */}

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
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            Entrar
          </button>

        </form>

        <div className="login-footer">
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </div>

      </div>
    </div>
  );
}