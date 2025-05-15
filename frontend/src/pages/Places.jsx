import { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard";
import PlaceGrid from "../components/PlaceGrid";
import SearchBar from "../components/SearchBar";

function Places() {
  const [discotecas, setDiscotecas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState(""); // Estado para la búsqueda

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

  // Filtrar discotecas según el texto de búsqueda
  const discotecasFiltradas = discotecas.filter((place) =>
    place.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Cargando discotecas...</div>;
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
        {discotecasFiltradas.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </PlaceGrid>
    </div>
  );
}

export default Places;
