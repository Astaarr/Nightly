// src/routes/index.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Places from "../pages/Places";
import Events from "../pages/Events";
import Place from "../pages/Place";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyAccount from "../pages/MyAccount";
import UserPreferences from "../pages/UserPreferences";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/places" element={<Places />} />
      <Route path="/events" element={<Events />} />
      <Route path="/place" element={<Place />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account" element={<MyAccount />} />
      <Route path="/preferences" element={<UserPreferences />} />
    </Routes>
  );
}
