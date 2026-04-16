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

  // Função para normalizar status: minúsculo, sem acento, underline
  function normalizarStatus(status: string) {
    return status
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove acentos
      .replace(/ç/g, 'c')
      .replace(/\s+/g, '_'); // espaços para underline
  }

  const statusMap: Record<string, string> = {
    lido: 'Lido',
    lendo: 'Lendo',
    quero_ler: 'Quero ler',
    nao_lido: 'Não lido',
    abandonado: 'Abandonado',
    relendo: 'Relendo'
  };

  const rawStatus = (livro.status || livro.status_leitura || '').toString();
  const statusKey = normalizarStatus(rawStatus);

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
          {statusMap[statusKey] || rawStatus}
        </p>
      )}
    </div>
  );
}