function PlaceCard({ place }) {
  const imagenUrl = `http://localhost:4000/images/${place.url_imagen}`;
  const valoracionNumerica = Number(place.valoracion);

  return (
    <div className="events__card">
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
          <i className="events__rating-icon fa-solid fa-star"></i>{" "}
          {!isNaN(valoracionNumerica)
            ? valoracionNumerica.toFixed(1)
            : "N/A"}
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
        <span className="events__tag events__tag--price">
          {place.precio} €
        </span>
      </div>
    </div>
  );
}

export default PlaceCard;
