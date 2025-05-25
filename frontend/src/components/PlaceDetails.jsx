

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel } from 'swiper/modules';



function PlaceDetails() {
  return (
    <section className="place">
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel]}
        className="place__swiper"
      >
        <SwiperSlide>
            <img className='place__image' src="https://images.unsplash.com/photo-1713885462557-12b5c41f22cd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img className='place__image' src="https://images.unsplash.com/photo-1547210841-2ceb0c5f0679?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>

      <div className="place__actions">
        <button className="place__action">
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <button className="place__action">
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>
      <div className="place__overlay">
        <div className="place__content">
          <div className="place__tags">
            <div className="place__tag">Tomar algo</div>
            <div className="place__tag">Rooftops</div>
          </div>
          <h2 className="place__title">Lugar 1</h2>
          <div className="place__location">
            <i class="fa-solid fa-location-dot"></i>
            <span className="place__address">Plaza de España, 3, Madrid</span>
          </div>
          <div className="place__item">
            <i className="fa-solid fa-calendar-days"></i>
            <span>Horario</span>
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlaceDetails;
