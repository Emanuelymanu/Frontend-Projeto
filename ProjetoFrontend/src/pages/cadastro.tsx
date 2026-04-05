import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
// Aqui importamos o MESMO arquivo CSS do login, pois o estilo é o mesmo!
import '../css/login.css';

export function Cadastro() {
  // Criando a memória para todos os campos do seu formulário
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCadastro = async (evento: React.FormEvent) => {
    evento.preventDefault();

    // Uma validação simples no Front-end: verificar se as senhas são iguais
    if (senha !== confirmarSenha) {
      setError('As senhas não conferem!');
      return; // O return faz a função parar aqui se der erro
    }

    const cpfNumerico = cpf.replace(/\D/g, '');
    if (cpfNumerico.length !== 11) {
      setError('CPF inválido! Digite 11 números');
      return;
    }


    setLoading(true);
    setError('');


    try {
      const response = await authService.cadastro({
        nome,
        email,
        cpf: cpfNumerico,
        senha
      });
      console.log("Cadastro realizado com sucesso, faça login para continuar", response)
      navigate('/login');
    } catch (error: any) {
      // Try to extract backend error message
      let errorMensagem = "Erro ao cadastrar";
      if (error?.mensagem) {
        errorMensagem = error.mensagem;
      } else if (error?.response?.data?.mensagem) {
        errorMensagem = error.response.data.mensagem;
      } else if (error?.message) {
        errorMensagem = error.message;
      }
      setError(errorMensagem);
      // Log full error for debugging
      console.error("Erro no cadastro", error);
    }
  };

  const formatarCPF = (valor: string) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length <= 11) {
      return numeros
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .slice(0, 14);
    }
    return valor;
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarCPF(e.target.value);
    setCpf(valorFormatado);
  };

  return (
    // Reutilizamos a classe 'login-container' para ter o mesmo fundo
    <div className="login-container">

      {/* Reutilizamos a classe 'login-card' para o quadrado branco */}
      <div className="login-card">

        {/* Mesmo ícone de Livro */}
        <div className="icon-container">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
        </div>

        <h1 className="login-title">Criar Conta</h1>
        <p className="login-subtitle">Cadastre-se para começar</p>
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleCadastro} className="login-form">

          <div className="input-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              id="nome"
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              disabled={loading}
            />
          </div>

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
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={handleCpfChange}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              id="confirmarSenha"
              type="password"
              placeholder="••••••••"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            Cadastrar
          </button>

        </form>

        <div className="login-footer">
          Já tem uma conta?  <Link to="/login">Entrar</Link>
        </div>

      </div>
    </div>
  );
}