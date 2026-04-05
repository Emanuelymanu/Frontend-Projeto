import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import "../css/MeuPerfil.css";

// MOCK (depois vem da API)
const userMock = {
  nome: "João Vitor",
  email: "joao@email.com",
  cpf: "123.456.789-00",
  senha: "123456"
};

export function MeuPerfil() {

  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(userMock.nome);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  return (
    <div className="biblioteca-container">

      <Sidebar 
  onLogout={() => console.log("logout")} 
  active="biblioteca" 
/>

      <main className="main-content">

        <header className="page-header">
          <h1>Meu Perfil</h1>
          <p>Gerencie suas informações</p>
        </header>

        <div className="filter-card">

          {!editando ? (
            <>
              <h2>{userMock.nome}</h2>

              <p><strong>Email:</strong> {userMock.email}</p>
              <p><strong>CPF:</strong> {userMock.cpf}</p>

              <button onClick={() => setEditando(true)}>
                Editar Perfil
              </button>
            </>
          ) : (
            <>
              <div className="select-group">
                <label>Nome</label>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="select-group">
                <label>Senha atual</label>
                <input
                  type="password"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                />
              </div>

              <div className="select-group">
                <label>Nova senha</label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
              </div>

              <button onClick={() => {
                console.log("Atualizar:", {
                  nome,
                  novaSenha
                });

                setEditando(false);
                setSenhaAtual("");
                setNovaSenha("");
              }}>
                Salvar
              </button>

              <button onClick={() => setEditando(false)}>
                Cancelar
              </button>
            </>
          )}

        </div>

      </main>
    </div>
  );
}