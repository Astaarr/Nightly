// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel } from "swiper/modules";
import { useState } from 'react';

function PlaceDetails() {
  const [showTimetable, setShowTimetable] = useState(false);

  const toggleTimetable = () => {
    setShowTimetable(!showTimetable);
  };

  return (
    <section className="place">
      <h1 className="place__title">Lugar 1</h1>

      <img
        className="place__image"
        src="https://images.unsplash.com/photo-1713885462557-12b5c41f22cd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
    

      <div className="place__actions">
        <button className="place__action">
          <i className="fa-solid fa-angle-left"></i>
        </button>
      </div>

      <div className="place__overlay">
        <section className="place__content">
          <div className="place__tags">
            <div className="place__tag">Tomar algo</div>
            <div className="place__tag">Rooftops</div>
          </div>

          <div className="place__sections">
            <article className="place__section">
              <div className="place__item">
                <i className="place__icon fa-solid fa-location-dot"></i>
                <div className="place__details">
                  <h3 className="place__details-name">Dirección</h3>
                  <span className="place__address">
                    Plaza de España, 3, Madrid
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
                    Ver horarios <i 
                      className="place__view-timetable-icon fa-solid fa-angle-down"
                      style={{ transform: showTimetable ? 'rotate(180deg)' : 'rotate(0deg)'}}
                    ></i>
                  </span>
                  {showTimetable && (
                    <div className="place__timetable">
                      <span className="place__day">
                        Lunes <span className="place__time">15:24 - 00:00</span>
                      </span>
                      <span className="place__day">
                        Martes <span className="place__time">15:24 - 00:00</span>
                      </span>
                      <span className="place__day">
                        Miercoles <span className="place__time">15:24 - 00:00</span>
                      </span>
                      <span className="place__day">
                        Jueves <span className="place__time">15:24 - 00:00</span>
                      </span>
                      <span className="place__day">
                        Viernes <span className="place__time">15:24 - 00:00</span>
                      </span>
                      <span className="place__day">
                        Sábado <span className="place__time">15:24 - 00:00</span>
                      </span>
                      <span className="place__day">
                        Domingo <span className="place__time">15:24 - 00:00</span>
                      </span>
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
                  <span className="place__price">
                    <i className="fa-solid fa-euro-sign"></i>
                    <i className="fa-solid fa-euro-sign"></i>
                  </span>
                </div>
              </div>

              <div className="place__item">
                <i className="place__icon fa-solid fa-face-smile"></i>
                <div className="place__details">
                  <h3 className="place__details-name">Valoración</h3>
                  <span className="place__rating">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star-half-stroke"></i>
                    <i className="fa-regular fa-star"></i>
                  </span>
                </div>
              </div>
            </article>
          </div>
          <button className="place__fav-button"><i className="fa-regular fa-heart"></i> Favoritos</button>
        </section>
      </div>
    </section>
  );
}

export default PlaceDetails;
