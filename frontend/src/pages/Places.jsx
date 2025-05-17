import { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard";
import PlaceGrid from "../components/PlaceGrid";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../context/AuthContext";


function Places() {

  const { isAuthenticated } = useAuth();
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

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

  const lugaresFiltrados = lugares.filter((place) =>
    place.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Cargando lugares...</div>;
  }

  return (
    <div className="places">
      <h1 className="places__title">Lugares</h1>

      <SearchBar
        value={busqueda}
        onChange={setBusqueda}
        placeholder="Buscar lugar..."
      />

      <PlaceGrid>
        {lugaresFiltrados.map((place) => (
          <PlaceCard key={place.id_lugar} place={place} />
        ))}
      </PlaceGrid>
    </div>
  );
}

export default Places;
