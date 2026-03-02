import { useState } from 'react';
// Aqui importamos o MESMO arquivo CSS do login, pois o estilo é o mesmo!
import './/css/login.css'; 

export function Cadastro() {
  // Criando a memória para todos os campos do seu formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = (evento: React.FormEvent) => {
    evento.preventDefault(); 
    
    // Uma validação simples no Front-end: verificar se as senhas são iguais
    if (senha !== confirmarSenha) {
      alert('As senhas não conferem!');
      return; // O return faz a função parar aqui se der erro
    }

    console.log('Tentando cadastrar com os dados:');
    console.log({ nome, email, cpf, senha });
    alert('Cadastro realizado com sucesso! Olhe o console (F12).');
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
            />
          </div>

          <div className="input-group">
            <label htmlFor="cpf">CPF</label>
            <input 
              id="cpf"
              type="text" 
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
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
            />
          </div>

          <button type="submit" className="login-button">
            Cadastrar
          </button>

        </form>

        <div className="login-footer">
          Já tem uma conta? <a href="#">Entrar</a>
        </div>

      </div>
    </div>
  );
}