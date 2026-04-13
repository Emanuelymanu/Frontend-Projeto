
import '../css/LivroCard.css';
import type { Livro } from "../types/livro";

interface LivroCardProps {
  livro: Livro;
  onClick: () => void;
}

export function LivroCard({ livro, onClick }: LivroCardProps) {
  // Monta a URL da capa se necessário
  let capaUrl = livro.capa;
  if (capaUrl && !capaUrl.startsWith('http')) {
    capaUrl = `http://localhost:3000/uploads/${capaUrl}`;
  }
  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-cover">
        {capaUrl ? (
          <img src={capaUrl} alt={livro.titulo} />
        ) : (
          <span>📖</span>
        )}
      </div>
      <h3 className="book-title">{livro.titulo}</h3>
    </div>
  );
}

