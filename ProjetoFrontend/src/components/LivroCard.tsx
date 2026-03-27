import './css/components.css';

interface Livro {
  id: number;
  titulo: string;
  capa?: string;
  status?: string;
}

interface LivroCardProps {
  livro: Livro;
  onClick: () => void;
}

export function LivroCard({ livro, onClick }: LivroCardProps) {
  return (
    <div className="book-card" onClick={onClick}>
      
      <div className="book-cover">
        {livro.capa ? (
          <img src={livro.capa} alt={livro.titulo} />
        ) : (
          <span>📖</span>
        )}
      </div>

      <h3 className="book-title">{livro.titulo}</h3>

    </div>
  );
}