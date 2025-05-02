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
    <div className="discotecas-grid">
      {discotecas.map((disco) => (
        <div key={disco.id_discoteca} className="discoteca-card">
          <img
            src={`http://localhost:4000/images/${disco.foto_portada}`}
            alt={disco.nombre}
            className="discoteca-image"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/300x200?text=Sin+Imagen";
            }}              
          />
          <h2 className="discoteca-title">{disco.nombre}</h2>
          <p className="discoteca-city">{disco.ciudad}</p>
          <p className="discoteca-description">{disco.descripcion}</p>
          <div className="discoteca-tags">
            <span className="tag tag-music">{disco.tipo_musica}</span>
            <span className="tag tag-price">{disco.rango_precio}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Discotecas;
