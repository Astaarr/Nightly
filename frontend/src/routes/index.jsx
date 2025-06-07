// src/routes/index.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Places from "../pages/Places";
import Events from "../pages/Events";
import Place from "../pages/Place";
import Event from "../pages/Event";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyAccount from "../pages/MyAccount";
import UserPreferences from "../pages/UserPreferences";
import PlaceFinder from "../components/PlaceFinder";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/places" element={<Places />} />
      <Route path="/place/:id" element={<Place />} />
      <Route path="/events" element={<Events />} />
      <Route path="/event/:id" element={<Event />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account" element={<MyAccount />} />
      <Route path="/preferences" element={<UserPreferences />} />
      <Route path="/place-finder" element={<PlaceFinder />} />
    </Routes>
  );
}
