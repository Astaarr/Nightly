function EventCard({ event }) {
    const imagenUrl = `http://localhost:4000/images/${event.imagen_evento}`;
  
    return (
      <div className="events__card">
        <img
          src={imagenUrl}
          alt={event.nombre_evento}
          className="events__image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/300x200?text=Sin+Imagen";
          }}
        />
  
        <div className="events__header">
          <span className="events__tag events__tag--music">
            <i className="fa-solid fa-music"></i> {event.tipo_musica}
          </span>
          <button className="events__fav">
            <i className="fa-regular fa-heart"></i>
          </button>
        </div>
  
        <div className="events__info">
          <h2 className="events__title">{event.nombre_evento}</h2>
          <p className="events__location">
            <i className="fa-solid fa-calendar-days"></i>{" "}
            {new Date(event.fecha_evento).toLocaleDateString("es-ES")}
          </p>
          <p className="events__description">{event.descripcion}</p>
        </div>
  
        <div className="events__tags">
          <span className="events__tag events__tag--price">
            {event.precio_entrada} €
          </span>
          <span className="events__tag events__tag--dress">
            {event.dress_code}
          </span>
        </div>
      </div>
    );
  }
  
  export default EventCard;
  