// 1. Importamos as ferramentas de rota
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 2. Importamos as três páginas que já criou
import { Login } from './pages/login';
import { Cadastro } from './pages/cadastro';
import { Home } from './pages/home'; // <-- Adicionámos a importação da Home aqui!
import { Biblioteca } from './pages/biblioteca';
import { Dashboard } from './pages/dashboard';
import { Leitura } from "./pages/leituras";
import { MeuPerfil } from "./pages/MeuPerfil";
import { authService } from './services/authService';


function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = authService.isAuthenticated();
  console.log('Verificando autenticação:', isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/leitura" element={<Leitura />} />
        <Route path="/MeuPerfil" element={<MeuPerfil />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;