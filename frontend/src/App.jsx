// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Discotecas from './pages/Discotecas';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <>
    <nav>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/discotecas">Discotecas</a></li>
        <li><a href="/login">Iniciar sesión</a></li>
        <li><a href="/register">Registrarse</a></li>
      </ul>
    </nav>



    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discotecas" element={<Discotecas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    
    </>



  );
}

export default App;
