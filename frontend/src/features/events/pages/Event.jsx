import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from "../../../core/config/axios";
import PlaceDetails from '../../places/components/PlaceDetails';

function Event() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await api.get(`/eventos/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error al cargar el evento:', error);
        setError('No se pudo cargar la información del evento');
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div className="loading">Cargando evento...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!event) {
    return <div className="error">No se encontró el evento</div>;
  }

  return <PlaceDetails item={event} type="event" />;
}

export default Event;