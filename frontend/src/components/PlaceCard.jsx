function PlaceCard({ place }) {
  return (
    <div className="events__card">
      <img
        src={`http://localhost:4000/images/${place.foto_portada}`}
        alt={place.nombre}
        className="events__image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/300x200?text=Sin+Imagen";
        }}
      />

      <div className="events__header">
        <span className="events__rating">
          <i className="events__rating-icon fa-solid fa-star"></i> 4.5
          {place.valoracion}
        </span>
        <button className="events__fav">
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>

      <div className="events__info">
        <h2 className="events__title">{place.nombre}</h2>
        <p className="events__location">
          <i className="fa-solid fa-location-dot"></i> {place.ciudad}
        </p>
        <p className="events__description">{place.descripcion}</p>
      </div>

      <div className="events__tags">
        <span className="events__tag events__tag--music">
          {place.tipo_musica}
        </span>
        <span className="events__tag events__tag--price">
          {place.rango_precio}
        </span>
      </div>
    </div>
  );
}

export default PlaceCard;
