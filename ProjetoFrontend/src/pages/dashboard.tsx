import { Sidebar } from "../components/sidebar";
import { BookOpen, BookMarked, CheckCircle2, Circle } from "lucide-react";
import "../css/dashboard.css";

const livrosMock = [
  { id: 1, titulo: "Dom Casmurro", genero: "Ficção", status: "Lido" },
  { id: 2, titulo: "Clean Code", genero: "Técnico", status: "Lendo" },
  { id: 3, titulo: "Harry Potter", genero: "Fantasia", status: "Não lido" },
  { id: 4, titulo: "Outro Livro", genero: "Ficção", status: "Lido" }
];

export function Dashboard() {

  const total = livrosMock.length;
  const lidos = livrosMock.filter(l => l.status === "Lido").length;
  const lendo = livrosMock.filter(l => l.status === "Lendo").length;
  const naoLidos = livrosMock.filter(l => l.status === "Não lido").length;

  const generos: any = {};
  livrosMock.forEach(l => {
    generos[l.genero] = (generos[l.genero] || 0) + 1;
  });

  const topGeneros = Object.entries(generos);

  return (
    <div className="biblioteca-container">

      <Sidebar 
  onLogout={() => console.log("logout")} 
  active="dashboard" 
/>

      <main className="main-content">

        <header className="page-header">
          <h1>Dashboard</h1>
          <p>Visão geral da sua biblioteca</p>
        </header>

        {/* CARDS */}
        <div className="dashboard-cards">

          <div className="card">
            <div>
              <p>Total</p>
              <h2>{total}</h2>
            </div>
            <BookOpen />
          </div>

          <div className="card">
            <div>
              <p>Não Lidos</p>
              <h2>{naoLidos}</h2>
            </div>
            <Circle />
          </div>

          <div className="card">
            <div>
              <p>Lendo</p>
              <h2>{lendo}</h2>
            </div>
            <BookMarked />
          </div>

          <div className="card">
            <div>
              <p>Lidos</p>
              <h2>{lidos}</h2>
            </div>
            <CheckCircle2 />
          </div>

        </div>

        {/* GÊNEROS */}
        <div className="filter-card">
          <h2>Gêneros</h2>

          {topGeneros.map(([genero, qtd]: any) => (
            <div key={genero} className="genre-item">
              <span>{genero}</span>
              <strong>{qtd}</strong>
            </div>
          ))}

        </div>

      </main>
    </div>
  );
}