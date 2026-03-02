// Comentamos a importação do Login e agora importamos o Cadastro
// import { Login } from './pages/login';
import { Cadastro } from './pages/cadastro';

function App() {
  return (
    <div>
      {/* Trocamos a tag <Login /> pela <Cadastro /> */}
      <Cadastro />
    </div>
  );
}

export default App;