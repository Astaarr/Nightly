import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import EventCard from "../components/EventCard";

function PlaceCard({ place, onFavoritoChange = () => { } }) {
  const imagenUrl = `http://localhost:4000/images/${place.url_imagen}`;
  const valoracionNumerica = Number(place.valoracion).toFixed(1);
  const { token, isAuthenticated } = useAuth();
  const [esFavorito, setEsFavorito] = useState(place.esFavorito || false);
  const [loadingFavorito, setLoadingFavorito] = useState(false);
  const [errorFavorito, setErrorFavorito] = useState(null);
  const navigate = useNavigate();

  const handleToggleFavorito = async () => {
    if (!isAuthenticated) {
      // Redirigir al usuario a la página de inicio de sesión
      navigate('/login');
      return;
    }

    if (loadingFavorito) return;
    setLoadingFavorito(true);
    setErrorFavorito(null);

    try {
      if (esFavorito) {
        await axios.delete(`http://localhost:4000/api/favoritos/lugar/${place.id_lugar}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEsFavorito(false);
        onFavoritoChange(place.id_lugar, false);
      } else {
        await axios.post(
          "http://localhost:4000/api/favoritos",
          { id_lugar: place.id_lugar },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEsFavorito(true);
        onFavoritoChange(place.id_lugar, true);
      }
    } catch (error) {
      console.error("Error al cambiar favorito:", error);
      setErrorFavorito(
        error.response?.data?.message ||
        'Error al actualizar favoritos. Inténtalo de nuevo.'
      );
      // Revertir el cambio visual si hay error
      setEsFavorito(!esFavorito);
    } finally {
      setLoadingFavorito(false);
    }
  };

  return (
    <article className="events__card" onClick={() => navigate(`/place/${place.id_lugar}`)}>
      <img
        src={imagenUrl}
        alt={place.nombre}
        className="events__image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/300x200?text=Sin+Imagen";
        }}
      />

      <div className="events__header">
        <span className="events__rating">
          <i className="events__rating-icon fa-solid fa-star"></i> {valoracionNumerica}
        </span>
        <button
          className={`events__fav ${esFavorito ? "events__fav--active" : ""}`}
          onClick={(e) => {
            e.stopPropagation(); 
            handleToggleFavorito();
          }}
          disabled={loadingFavorito}
          aria-label={esFavorito ? "Quitar de favoritos" : "Añadir a favoritos"}
          title={!isAuthenticated ? "Inicia sesión para guardar favoritos" : ""}
        >
          <i className={esFavorito ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
        </button>
      </div>

      {errorFavorito && (
        <div className="events__error">
          {errorFavorito}
        </div>
      )}

      <div className="events__info">
        <h2 className="events__title">{place.nombre}</h2>
        <p className="events__location">
          <i className="fa-solid fa-location-dot"></i> {place.ciudad}
        </p>
        <p className="events__description">{place.descripcion}</p>
      </div>

      <div className="events__tags">
        <span className="events__tag events__tag--price">{place.precio}</span>
      </div>
    </article>
  );
}

export default PlaceCard;