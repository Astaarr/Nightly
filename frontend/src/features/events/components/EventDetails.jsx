import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../core/config/axios";
import { useAuth } from "../../authentication/context/AuthContext";
import { useNotification } from "../../../core/context/NotificationContext";
import Reserve from "./Reserve";
import ConfirmModal from "../../../shared/components/ConfirmModal";
import ConfirmAnimation from "../../../shared/components/confirmAnimation";

function EventDetails({ event }) {
  const [reservado, setReservado] = useState(false);
  const [loadingReserva, setLoadingReserva] = useState(false);
  const [errorReserva, setErrorReserva] = useState(null);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (isAuthenticated && token) {
      const checkReservaStatus = async () => {
        try {
          const response = await api.get("/reservas", {
            headers: { Authorization: `Bearer ${token}` }
          });
          const reservasIds = response.data.map((res) => res.id_evento);
          setReservado(reservasIds.includes(event.id_evento));
        } catch (error) {
          console.error("Error al verificar estado de reserva:", error);
        }
      };
      checkReservaStatus();
    }
  }, [isAuthenticated, token, event.id_evento]);

  const handleBack = () => {
    navigate(-1);
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
      await api.delete(`/reservas/${event.id_evento}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservado(false);
      setShowConfirmModal(false);
      showNotification("La reserva fue cancelada exitosamente");
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
    setShowReserveModal(false);
    setShowSuccessAnimation(true);
  };

  const handleCloseSuccessAnimation = () => {
    setShowSuccessAnimation(false);
  };

  const handlePlaceClick = () => {
    if (event.id_lugar) {
      navigate(`/place/${event.id_lugar}`);
    }
  };

  return (
    <section className="place">
      <h1 className="place__title">{event.nombre_evento}</h1>

      <img
        className="place__image"
        src={`${import.meta.env.VITE_STATIC_URL}/images/${event.imagen_evento}`}
        alt={event.nombre_evento}
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
            <div className="place__tag events__tag--music">
              <i className="fa-solid fa-music"></i>  {event.tipo_musica}
            </div>
            {event.dress_code && (
              <div className="place__tag events__tag--dress">
                <i className="fa-solid fa-shirt"></i>  {event.dress_code}
              </div>
            )}
            {event.nivel_formalidad && (
              <div className="place__tag events__tag--formality">
                <i className="fa-solid fa-user-tie"></i>  {event.nivel_formalidad}
              </div>
            )}
            {event.ambiente && (
              <div className="place__tag events__tag--ambiente">
                <i className="fa-solid fa-heart"></i>  {event.ambiente}
              </div>
            )}
            {event.tamano_grupo && (
              <div className="place__tag events__tag--group">
                <i className="fa-solid fa-users"></i>  {event.tamano_grupo}
              </div>
            )}
            {(event.edad_minima || event.edad_maxima) && (
              <div className="place__tag events__tag--age">
                <i className="fa-solid fa-calendar-check"></i> 
                {event.edad_minima && event.edad_maxima 
                  ? `${event.edad_minima}-${event.edad_maxima} años`
                  : event.edad_minima 
                    ? `+${event.edad_minima} años`
                    : `${event.edad_maxima} años máx`
                }
              </div>
            )}
          </div>

          <p className="place__description">{event.descripcion}</p>

          <div className="place__sections">
            <article className="place__section">
              <div className="place__item">
                <i className="place__icon fa-solid fa-location-dot"></i>
                <div className="place__details">
                  <h3 className="place__details-name">Dirección</h3>
                  <span 
                    className="place__address place__address--link" 
                    onClick={handlePlaceClick}
                  >
                    {event.nombre_lugar}
                  </span>
                </div>
              </div>

              <div className="place__item">
                <i className="place__icon fa-solid fa-calendar-days"></i>
                <div className="place__details">
                  <h3 className="place__details-name">Horario</h3>
                  <span className="place__view-time">
                    {new Date(event.fecha_evento).toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </article>

            <article className="place__section">
              <div className="place__item">
                <i className="place__icon fa-solid fa-tag"></i>
                <div className="place__details">
                  <h3 className="place__details-name">Precio Entrada</h3>
                  <span className="place__price">
                    <span>{event.precio_entrada} €</span>
                  </span>
                </div>
              </div>
            </article>
          </div>

          <button
            className={`place__fav-button ${reservado ? "place__fav-button--active" : ""}`}
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

          {errorReserva && <div className="place__error">{errorReserva}</div>}
        </section>
      </div>

      {showReserveModal && (
        <Reserve
          event={event}
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

      {showSuccessAnimation && (
        <ConfirmModal
          isOpen={showSuccessAnimation}
          title="¡Reserva Exitosa!"
          message={
            <>
              <p>
                Revisa la bandeja de entrada para obtener los
                detalles de la reserva.
              </p>
              <div className="modal__animation-container">
                <ConfirmAnimation />
              </div>
            </>
          }
          onConfirm={handleCloseSuccessAnimation}
          showCancel={false}
        />
      )}
    </section>
  );
}

export default EventDetails; 