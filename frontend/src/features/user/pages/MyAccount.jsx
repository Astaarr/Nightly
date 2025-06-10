import { useAuth } from "../../authentication/context/AuthContext";
import UserCard from "../components/UserCard";
import PlaceCard from "../../places/components/PlaceCard";
import EventCard from "../../events/components/EventCard";
import PlaceGrid from "../../places/components/PlaceGrid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../core/config/axios";

function MyAccount() {
  const { user, isAuthenticated, isLoading, token } = useAuth();
  const [lugaresFavoritos, setLugaresFavoritos] = useState([]);
  const [eventosReservados, setEventosReservados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingReservas, setLoadingReservas] = useState(true);
  const [error, setError] = useState(null);
  const [errorReservas, setErrorReservas] = useState(null);


  useEffect(() => {
    async function fetchFavoritos() {
      try {
        setLoading(true);
        setError(null);

        const favoritosResponse = await api.get("/favoritos", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const favoritosIds = favoritosResponse.data.map(f => f.id_lugar);

        if (favoritosIds.length === 0) {
          setLugaresFavoritos([]);
          return;
        }

        const lugaresResponse = await api.get("/lugares");
        const lugaresCompletos = lugaresResponse.data.filter(lugar =>
          favoritosIds.includes(lugar.id_lugar)
        );

        const lugaresConFavorito = lugaresCompletos.map(lugar => ({
          ...lugar,
          esFavorito: true
        }));

        setLugaresFavoritos(lugaresConFavorito);
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
        setError("Error al cargar tus lugares favoritos. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    }

    async function fetchReservas() {
      try {
        setLoadingReservas(true);
        setErrorReservas(null);

        const reservasResponse = await api.get("/reservas", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (reservasResponse.data.length === 0) {
          setEventosReservados([]);
          return;
        }

        setEventosReservados(reservasResponse.data);
      } catch (error) {
        console.error("Error al cargar reservas:", error);
        setErrorReservas("Error al cargar tus eventos reservados. Inténtalo de nuevo más tarde.");
      } finally {
        setLoadingReservas(false);
      }
    }

    if (isAuthenticated) {
      fetchFavoritos();
      fetchReservas();
    }
  }, [token, isAuthenticated]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  if (loading || loadingReservas) {
    return <div className="loading">Cargando tu información...</div>;
  }

  return (
    <>
      <section className="account">
        <h2 className="account__title-section">Mi cuenta</h2>
        <UserCard
          username={user.nombre}
          email={user.email}
          avatar={
            user.avatar_url
              ? `${import.meta.env.VITE_STATIC_URL}/${user.avatar_url}`
              : "https://unavatar.io/substack/bankless"
          }
        />
      </section>

      <section className="account">
        <h2 className="account__title-section">Mis lugares favoritos</h2>

        {error ? (
          <div className="error-message">{error}</div>
        ) : lugaresFavoritos.length === 0 ? (
          <div className="no-favorites">
            <p className="account__message-empty">Aún no has agregado ningún lugar a favoritos.</p>
            <p className="account__message-empty"><Link to="/places" className="auth-form__link">¡Explora nuestros lugares!</Link></p>
          </div>
        ) : (
          <PlaceGrid itemsPerPage={6}>
            {lugaresFavoritos.map((lugar) => (
              <PlaceCard
                key={lugar.id_lugar}
                place={lugar}
                onFavoritoChange={(id, estado) => {
                  if (!estado) {
                    setLugaresFavoritos(prev => prev.filter(f => f.id_lugar !== id));
                  }
                }}
              />
            ))}
          </PlaceGrid>
        )}
      </section>

      <section className="account">
        <h2 className="account__title-section">Mis eventos reservados</h2>

        {errorReservas ? (
          <div className="error-message">{errorReservas}</div>
        ) : eventosReservados.length === 0 ? (
          <div className="no-favorites">
            <p className="account__message-empty">Aún no has reservado ningún evento.</p>
            <p className="account__message-empty"><Link to="/events" className="auth-form__link">¡Descubre nuestros eventos!</Link></p>
          </div>
        ) : (
          <PlaceGrid itemsPerPage={6}>
            {eventosReservados.map((evento) => (
              <EventCard
                key={evento.id_evento}
                event={evento}
                onReservaChange={(id) => {
                  setEventosReservados(prev => prev.filter(e => e.id_evento !== id));
                }}
              />
            ))}
          </PlaceGrid>
        )}
      </section>
    </>
  );
}

export default MyAccount;