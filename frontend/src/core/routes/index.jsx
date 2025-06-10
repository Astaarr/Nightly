// src/routes/index.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../../features/home/pages/Home";
import Places from "../../features/places/pages/Places";
import Events from "../../features/events/pages/Events";
import Place from "../../features/places/pages/Place";
import Event from "../../features/events/pages/Event";
import Login from "../../features/authentication/pages/Login";
import Register from "../../features/authentication/pages/Register";
import MyAccount from "../../features/user/pages/MyAccount";
import UserPreferences from "../../features/user/pages/UserPreferences";
import PlaceFinder from "../../features/places/components/PlaceFinder";

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
