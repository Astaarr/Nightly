import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Reserve({ event, onClose, onReservaChange }) {
  const { token, user } = useAuth();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorField, setErrorField] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setNombre(user.nombre || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    setErrorField("");
    setIsSuccess(false);

    if (nombre.trim() === "") {
      setMessage("El nombre es obligatorio");
      setErrorField("nombre");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Correo no válido");
      setErrorField("email");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/reservas",
        {
          id_evento: event.id_evento,
          usuario_reserva: nombre,
          email_reserva: email
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setIsSuccess(true);
        setMessage("Reserva realizada con éxito");
        // Esperar un momento para asegurar que el backend ha procesado todo
        setTimeout(() => {
          onReservaChange(event.id_evento);
        }, 1000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al realizar la reserva");
      setIsSuccess(false);
    }
  };

  const getInputClassName = (fieldName) => {
    return `input ${errorField === fieldName ? "input--error" : ""}`;
  };

  const getMessageClassName = () => {
    return `modal__message ${isSuccess ? "modal__message--success" : ""}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__back-container">
          <button className="modal__back" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="modal__header">
          <h2 className="modal__title">Reservar</h2>
          <h1 className="modal__event-name">{event.nombre_evento}</h1>
        </div>

        <div className="modal__content">
          <div className="modal__field">
            <label className="modal__label">Nombre Completo</label>
            <div className="input__container input__container--user">
              <input
                className={getInputClassName("nombre")}
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
          </div>

          <div className="modal__field">
            <label className="modal__label">Correo</label>
            <div className="input__container input__container--email">
              <input
                className={getInputClassName("email")}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="modal__columns">
          <div className="modal__item">
            <i className="place__icon fa-solid fa-calendar-days"></i>
            <div className="place__details">
              <h3 className="place__details-name">Horario</h3>
              <span className="place__rating">
                {new Date(event.fecha_evento).toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </span>
            </div>
          </div>

          <div className="modal__item">
            <i className="place__icon fa-solid fa-location-dot"></i>
            <div className="place__details">
              <h3 className="place__details-name">Lugar</h3>
              <span className="place__rating">{event.nombre_lugar}</span>
            </div>
          </div>
        </div>

        {message && (
            <p className={getMessageClassName()}>
              <i className={isSuccess ? "fa-solid fa-check" : "fa-solid fa-circle-exclamation"}></i>{" "}
              {message}
            </p>
          )}

        <div className="modal__buttons">
          <button className="modal__button" onClick={handleSubmit}>
            <i className="fa-regular fa-calendar-check"></i>
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reserve;