import { useEffect, useState } from "react";
import api from "../../../core/config/axios";
import EventCard from "../components/EventCard";
import PlaceGrid from "../../places/components/PlaceGrid";
import SearchBar from "../../../shared/components/SearchBar";

function Events() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function fetchEventos() {
      try {
        const response = await api.get("/eventos");
        setEventos(response.data);
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEventos();
  }, []);

  const eventosFiltrados = eventos.filter((event) =>
    event.nombre_evento.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Cargando eventos...</div>;
  }

  return (
    <div className="places">
      <h1 className="places__title">Eventos</h1>

      <SearchBar
        value={busqueda}
        onChange={setBusqueda}
        placeholder="Buscar eventos..."
        type="event"
      />

      <PlaceGrid>
        {eventosFiltrados.map((event) => (
          <EventCard key={event.id_evento} event={event} />
        ))}
      </PlaceGrid>
    </div>
  );
}

export default Events;
