import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../core/config/axios";
import { useAuth } from "../../authentication/context/AuthContext";
import { useNotification } from "../../../core/context/NotificationContext";

function PlaceDetails({ place }) {
  const [showTimetable, setShowTimetable] = useState(false);
  const [esFavorito, setEsFavorito] = useState(false);
  const [loadingFavorito, setLoadingFavorito] = useState(false);
  const [errorFavorito, setErrorFavorito] = useState(null);
  
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (isAuthenticated && token) {
      const checkFavoritoStatus = async () => {
        try {
          const response = await api.get("/favoritos", {
            headers: { Authorization: `Bearer ${token}` }
          });
          const favoritosIds = response.data.map((fav) => fav.id_lugar);
          setEsFavorito(favoritosIds.includes(place.id_lugar));
        } catch (error) {
          console.error("Error al verificar estado de favorito:", error);
        }
      };
      checkFavoritoStatus();
    }
  }, [isAuthenticated, token, place.id_lugar]);

  const toggleTimetable = () => {
    setShowTimetable(!showTimetable);
  };

  const handleBack = () => {
    navigate("/places");
  };

  const handleToggleFavorito = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setLoadingFavorito(true);
    setErrorFavorito(null);

    try {
      if (esFavorito) {
        await api.delete(`/favoritos/lugar/${place.id_lugar}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEsFavorito(false);
        showNotification("Lugar eliminado de favoritos");
      } else {
        await api.post(
          "/favoritos",
          { id_lugar: place.id_lugar },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEsFavorito(true);
        showNotification("Lugar añadido a favoritos");
      }
    } catch (error) {
      console.error("Error al cambiar favorito:", error);
      setErrorFavorito(
        error.response?.data?.message ||
        "Error al actualizar favoritos. Inténtalo de nuevo."
      );
    } finally {
      setLoadingFavorito(false);
    }
  };

  return (
    <section className="place">
      <h1 className="place__title">{place.nombre}</h1>

      <img
        className="place__image"
        src={`${import.meta.env.VITE_STATIC_URL}/images/${place.url_imagen}`}
        alt={place.nombre}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/300x200?text=Sin+Imagen";
        }}
      />

      <div className="place__actions">
        <button className="place__action" onClick={handleBack}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
      </div>

      <div className="place__overlay">
        <section className="place__content">
          <div className="place__tags">
            {place.categorias?.map((categoria, index) => (
              <div key={index} className="place__tag">
                {categoria}
              </div>
            ))}
          </div>

          <p className="place__description">{place.descripcion}</p>

          <div className="place__sections">
            <article className="place__section">
              <div className="place__item">
                <i className="place__icon fa-solid fa-location-dot"></i>
                <div className="place__details">
                  <h3 className="place__details-name">Dirección</h3>
                  <span className="place__address">
                    {place.direccion}, {place.ciudad}
                  </span>
                </div>
              </div>

              <div className="place__item">
                <i className="place__icon fa-solid fa-calendar-days"></i>
                <div className="place__details">
                  <h3 className="place__details-name">Horario</h3>
                  <span
                    className="place__view-timetable"
                    onClick={toggleTimetable}
                  >
                    Ver horarios{" "}
                    <i
                      className="place__view-timetable-icon fa-solid fa-angle-down"
                      style={{
                        transform: showTimetable
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    ></i>
                  </span>
                  {showTimetable && (
                    <div className="place__timetable">
                      {place.horarios?.map((horario, index) => (
                        <span key={index} className="place__day">
                          {horario.dia}{" "}
                          <span className="place__time">
                            {horario.hora_apertura} - {horario.hora_cierre}
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>

            <article className="place__section">
              <div className="place__item">
                <i className="place__icon fa-solid fa-tag"></i>
                <div className="place__details">
                  <h3 className="place__details-name">Precio Medio</h3>
                  <span className="place__price">{place.precio}</span>
                </div>
              </div>

              <div className="place__item">
                <i className="place__icon fa-solid fa-face-smile"></i>
                <div className="place__details">
                  <h3 className="place__details-name">Valoración</h3>
                  <span className="place__rating">
                    {Array(Math.floor(place.valoracion))
                      .fill()
                      .map((_, i) => (
                        <i key={i} className="fa-solid fa-star"></i>
                      ))}
                    {place.valoracion % 1 >= 0.5 && (
                      <i className="fa-solid fa-star-half-stroke"></i>
                    )}
                    {Array(5 - Math.ceil(place.valoracion))
                      .fill()
                      .map((_, i) => (
                        <i key={i} className="fa-regular fa-star"></i>
                      ))}
                  </span>
                </div>
              </div>
            </article>
          </div>

          <button
            className={`place__fav-button ${esFavorito ? "place__fav-button--active" : ""}`}
            onClick={handleToggleFavorito}
            disabled={loadingFavorito}
          >
            <i
              className={esFavorito ? "fa-solid fa-heart" : "fa-regular fa-heart"}
            ></i>
            {esFavorito ? " Guardado" : " Favoritos"}
          </button>

          {errorFavorito && <div className="place__error">{errorFavorito}</div>}
        </section>
      </div>
    </section>
  );
}

export default PlaceDetails;
