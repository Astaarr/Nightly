import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Reserve from "./Reserve";
import ConfirmModal from "./ConfirmModal";
import ConfirmAnimation from "./confirmAnimation";

function PlaceDetails({ item, type }) {
  const [showTimetable, setShowTimetable] = useState(false);
  const [esFavorito, setEsFavorito] = useState(false);
  const [loadingFavorito, setLoadingFavorito] = useState(false);
  const [errorFavorito, setErrorFavorito] = useState(null);
  const [loadingReserva, setLoadingReserva] = useState(false);
  const [errorReserva, setErrorReserva] = useState(null);
  const [reservado, setReservado] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();

  const [showReserveModal, setShowReserveModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // Nuevo estado para mostrar la animación de confirmación
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  useEffect(() => {
    if (isAuthenticated && token) {
      if (type === "place") {
        const checkFavoritoStatus = async () => {
          try {
            const response = await axios.get(
              `http://localhost:4000/api/favoritos`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const favoritosIds = response.data.map((fav) => fav.id_lugar);
            setEsFavorito(favoritosIds.includes(item.id_lugar));
          } catch (error) {
            console.error("Error al verificar estado de favorito:", error);
          }
        };
        checkFavoritoStatus();
      } else if (type === "event") {
        const checkReservaStatus = async () => {
          try {
            const response = await axios.get(
              `http://localhost:4000/api/reservas`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const reservasIds = response.data.map((res) => res.id_evento);
            setReservado(reservasIds.includes(item.id_evento));
          } catch (error) {
            console.error("Error al verificar estado de reserva:", error);
          }
        };
        checkReservaStatus();
      }
    }
  }, [isAuthenticated, token, item.id_lugar, item.id_evento, type]);

  const toggleTimetable = () => {
    setShowTimetable(!showTimetable);
  };

  const handleBack = () => {
    navigate(type === "place" ? "/places" : "/events");
  };

  const handleToggleFavorito = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (loadingFavorito) return;
    setLoadingFavorito(true);
    setErrorFavorito(null);

    try {
      if (esFavorito) {
        await axios.delete(
          `http://localhost:4000/api/favoritos/lugar/${item.id_lugar}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEsFavorito(false);
      } else {
        await axios.post(
          "http://localhost:4000/api/favoritos",
          { id_lugar: item.id_lugar },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEsFavorito(true);
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

  const handleReserveClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (reservado) {
      setShowConfirmModal(true);
    } else {
      setShowReserveModal(true);
    }
  };

  const handleCancelReserva = async () => {
    try {
      setLoadingReserva(true);
      setErrorReserva(null);
      await axios.delete(
        `http://localhost:4000/api/reservas/${item.id_evento}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReservado(false);
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
      setErrorReserva(
        error.response?.data?.message ||
          "Error al cancelar la reserva. Inténtalo de nuevo."
      );
    } finally {
      setLoadingReserva(false);
    }
  };

  const handleCloseModal = () => {
    setShowReserveModal(false);
  };

  const handleReservaChange = (id_evento) => {
    setReservado(true);
    // Cerrar el modal de reserva
    setShowReserveModal(false);
    // Mostrar la animación de éxito
    setShowSuccessAnimation(true);
  };

  // Función para cerrar la animación de éxito
  const handleCloseSuccessAnimation = () => {
    setShowSuccessAnimation(false);
  };

  return (
    <section className="place">
      <h1 className="place__title">
        {type === "place" ? item.nombre : item.nombre_evento}
      </h1>

      <img
        className="place__image"
        src={`http://localhost:4000/images/${
          type === "place" ? item.url_imagen : item.imagen_evento
        }`}
        alt={type === "place" ? item.nombre : item.nombre_evento}
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
            {type === "place" ? (
              item.categorias?.map((categoria, index) => (
                <div key={index} className="place__tag">
                  {categoria}
                </div>
              ))
            ) : (
              <div className="place__tag events__tag--music">
                <i className="fa-solid fa-music"></i> {item.tipo_musica}
              </div>
            )}
          </div>

          <p className="place__description">{item.descripcion}</p>

          <div className="place__sections">
            <article className="place__section">
              <div className="place__item">
                <i className="place__icon fa-solid fa-location-dot"></i>
                <div className="place__details">
                  <h3 className="place__details-name">Dirección</h3>
                  <span className="place__address">
                    {type === "place"
                      ? `${item.direccion}, ${item.ciudad}`
                      : item.nombre_lugar}
                  </span>
                </div>
              </div>

              <div className="place__item">
                <i className="place__icon fa-solid fa-calendar-days"></i>
                <div className="place__details">
                  <h3 className="place__details-name">Horario</h3>
                  {type === "place" ? (
                    <>
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
                          {type === "place" ? (
                            item.horarios?.map((horario, index) => (
                              <span key={index} className="place__day">
                                {horario.dia}{" "}
                                <span className="place__time">
                                  {horario.hora_apertura} -{" "}
                                  {horario.hora_cierre}
                                </span>
                              </span>
                            ))
                          ) : (
                            <span className="place__day">
                              {new Date(item.fecha_evento).toLocaleDateString(
                                "es-ES",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="place__view-time">
                      {new Date(item.fecha_evento).toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
              </div>
            </article>

            <article className="place__section">
              <div className="place__item">
                <i className="place__icon fa-solid fa-tag"></i>
                <div className="place__details">
                  <h3 className="place__details-name">Precio Medio</h3>
                  <span className="place__price">
                    {type === "place" ? (
                      [...item.precio].map((_, i) => (
                        <i key={i} className="fa-solid fa-euro-sign"></i>
                      ))
                    ) : (
                      <span>{item.precio_entrada} €</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="place__item">
                <i className="place__icon fa-solid fa-face-smile"></i>
                <div className="place__details">
                  <h3 className="place__details-name">Valoración</h3>
                  <span className="place__rating">
                    {type === "place" && (
                      <>
                        {Array(Math.floor(item.valoracion))
                          .fill()
                          .map((_, i) => (
                            <i key={i} className="fa-solid fa-star"></i>
                          ))}
                        {item.valoracion % 1 >= 0.5 && (
                          <i className="fa-solid fa-star-half-stroke"></i>
                        )}
                        {Array(5 - Math.ceil(item.valoracion))
                          .fill()
                          .map((_, i) => (
                            <i key={i} className="fa-regular fa-star"></i>
                          ))}
                      </>
                    )}
                  </span>
                </div>
              </div>
            </article>
          </div>

          {type === "place" ? (
            <button
              className={`place__fav-button ${
                esFavorito ? "place__fav-button--active" : ""
              }`}
              onClick={handleToggleFavorito}
              disabled={loadingFavorito}
            >
              <i
                className={
                  esFavorito ? "fa-solid fa-heart" : "fa-regular fa-heart"
                }
              ></i>
              {esFavorito ? " Guardado" : " Favoritos"}
            </button>
          ) : (
            <button
              className={`place__fav-button ${
                reservado ? "place__fav-button--active" : ""
              }`}
              onClick={handleReserveClick}
              disabled={loadingReserva}
            >
              <i
                className={
                  reservado
                    ? "fa-solid fa-calendar-check"
                    : "fa-regular fa-calendar-check"
                }
              ></i>
              {reservado ? " Cancelar reserva" : " Reservar"}
            </button>
          )}

          {errorFavorito && <div className="place__error">{errorFavorito}</div>}
          {errorReserva && <div className="place__error">{errorReserva}</div>}
        </section>
      </div>

      {showReserveModal && (
        <Reserve 
          event={item} 
          onClose={handleCloseModal}
          onReservaChange={handleReservaChange}
        />
      )}
      
      {showConfirmModal && (
        <ConfirmModal
          isOpen={showConfirmModal}
          title="Cancelar Reserva"
          message="¿Estás seguro de que deseas cancelar tu reserva para este evento?"
          onConfirm={handleCancelReserva}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}

      {/* Modal con animación de confirmación de reserva exitosa */}
      {showSuccessAnimation && (
        <ConfirmModal
          isOpen={showSuccessAnimation}
          title="¡Reserva Exitosa!"
          message={<ConfirmAnimation />}
          onConfirm={handleCloseSuccessAnimation}
          showCancel={false}
        />
      )}
    </section>
  );
}

export default PlaceDetails;