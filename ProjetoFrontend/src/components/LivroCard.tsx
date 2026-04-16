import '../css/LivroCard.css';
import type { Livro } from "../types/livro";

interface LivroCardProps {
  livro: Livro & { status?: string };
  onClick: () => void;
}

export function LivroCard({ livro, onClick }: LivroCardProps) {
  let capaUrl = livro.capa;

  if (capaUrl && !capaUrl.startsWith('http')) {
    capaUrl = `http://localhost:3000/uploads/${capaUrl}`;
  }

  const statusMap: Record<string, string> = {
    lido: 'Lido',
    lendo: 'Lendo',
    quero_ler: 'Quero ler',
    nao_lido: 'Não lido',
    abandonado: 'Abandonado',
    relendo: 'Relendo'
  };

  const statusKey = (livro.status || livro.status_leitura || '').toString().toLowerCase();

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

      {statusKey && (
        <p className={`book-status status-${statusKey}`}>
          {statusMap[statusKey] || livro.status || livro.status_leitura}
        </p>
      )}
    </div>
  );
}