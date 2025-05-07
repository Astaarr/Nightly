// src/routes/index.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Eventos from "../pages/Lugares";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
