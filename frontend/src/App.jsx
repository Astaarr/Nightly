// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";

import Home from './pages/Home';
import Discotecas from './pages/Discotecas';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (

    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discotecas" element={<Discotecas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>


  );
}

export default App;
