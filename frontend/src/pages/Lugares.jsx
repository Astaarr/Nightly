// frontend/src/pages/Discotecas.jsx
import { useEffect, useState } from "react";

function Discotecas() {
  const [discotecas, setDiscotecas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDiscotecas() {
      try {
        const response = await fetch("http://localhost:4000/api/discotecas");
        const data = await response.json();
        setDiscotecas(data);
      } catch (error) {
        console.error("Error al cargar discotecas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDiscotecas();
  }, []);

  if (loading) {
    return <div className="loading">Cargando discotecas...</div>;
  }

  return (
    <div className="events">
      {discotecas.map((disco) => (
        <div key={disco.id_discoteca} className="events__card">
          <img
            src={`http://localhost:4000/images/${disco.foto_portada}`}
            alt={disco.nombre}
            className="events__image"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/300x200?text=Sin+Imagen";
            }}              
          />

          <div className="events__header">
            <span className="events__rating"><i className="events__rating-icon fa-solid fa-star"></i> 4.5{disco.valoracion}</span>
            <button className="events__fav"><i className="fa-regular fa-heart"></i></button>
          </div>

          <div className="events__info">
            <h2 className="events__title">{disco.nombre}</h2>
            <p className="events__location"><i className="fa-solid fa-location-dot"></i> {disco.ciudad}</p>
            <p className="events__description">{disco.descripcion}</p>
          </div>
    
          <div className="events__tags">
            <span className="events__tag events__tag--music">{disco.tipo_musica}</span>
            <span className="events__tag events__tag--price">{disco.rango_precio}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Discotecas;
