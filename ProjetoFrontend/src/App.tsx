// 1. Importamos as ferramentas de rota
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2. Importamos as três páginas que já criou
import { Login } from './pages/login';
import { Cadastro } from './pages/cadastro';
import { Home } from './pages/home'; // <-- Adicionámos a importação da Home aqui!
import { Dashboard } from './pages/dashboard';
import { Biblioteca } from './pages/biblioteca';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;