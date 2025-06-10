import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from "../../../core/config/axios";
import PlaceDetails from '../components/PlaceDetails';

function Place() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlace() {
      try {
        const response = await api.get(`/lugares/${id}`);
        setPlace(response.data);
      } catch (error) {
        console.error('Error al cargar el lugar:', error);
        setError('No se pudo cargar la información del lugar');
      } finally {
        setLoading(false);
      }
    }

    fetchPlace();
  }, [id]);

  if (loading) {
    return <div className="loading">Cargando lugar...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!place) {
    return <div className="error">No se encontró el lugar</div>;
  }

  return <PlaceDetails place={place} />;
}

export default Place;