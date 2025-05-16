import { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard";

function Lugares() {
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLugares() {
      try {
        const response = await fetch("http://localhost:4000/api/lugares");
        const data = await response.json();
        setLugares(data);
      } catch (error) {
        console.error("Error al cargar lugares:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLugares();
  }, []);

  if (loading) {
    return <div className="loading">Cargando lugares...</div>;
  }

  return (
    <div className="events">
      {lugares.map((lugar) => (
        <PlaceCard key={lugar.id_lugar} place={lugar} />
      ))}
    </div>
  );
}

export default Lugares;
