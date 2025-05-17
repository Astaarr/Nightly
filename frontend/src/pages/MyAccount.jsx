import { useAuth } from "../context/AuthContext";
import UserCard from "../components/UserCard";

import PlaceCard from "../components/PlaceCard";
import PlaceGrid from "../components/PlaceGrid";

import { useEffect, useState } from "react";

function MyAccount() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    window.location.href = "/login";
  }

  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLugares() {
      try {
        const response = await fetch("http://localhost:4000/api/lugares");
        const data = await response.json();
        setLugares(data);
      } catch (error) {
        console.error("Error al cargar lugares:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLugares();
  }, []);

  if (loading) {
    return <div className="loading">Cargando lugares...</div>;
  }

  return (
    <>
      <section className="account">
        <h2 className="account__title-section">Mi cuenta</h2>

        <UserCard username={user.nombre} email={user.email} />
      </section>

      <section className="account">
        <h2 className="account__title-section">Favoritos</h2>

        <PlaceGrid>
          {lugares.map((place) => (
            <PlaceCard key={place.id_lugar} place={place} />
          ))}
        </PlaceGrid>
      </section>
    </>
  );
}

export default MyAccount;
