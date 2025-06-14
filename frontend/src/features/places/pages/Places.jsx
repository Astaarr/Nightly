import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PlaceCard from "../components/PlaceCard";
import PlaceGrid from "../components/PlaceGrid";
import SearchBar from "../../../shared/components/SearchBar";
import { useAuth } from "../../authentication/context/AuthContext";
import api from "../../../core/config/axios";

function Places() {
  const { isAuthenticated, token, isLoading: authLoading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [error, setError] = useState(null);

  // Leer el parámetro de categoría de la URL al cargar el componente
  useEffect(() => {
    const categoria = searchParams.get('categoria');
    if (categoria) {
      setCategoriaSeleccionada(parseInt(categoria));
    }
  }, [searchParams]);

  useEffect(() => {
    if (authLoading) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Construir la URL con query param si hay categoría seleccionada
        let url = "/lugares";
        if (categoriaSeleccionada) {
          url += `?categoria=${categoriaSeleccionada}`;
        }

        const lugaresResponse = await api.get(url);
        let lugaresData = lugaresResponse.data;

        // Marcar favoritos si el usuario está logueado
        if (isAuthenticated && token) {
          try {
            const favoritosResponse = await api.get("/favoritos", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const favoritosIds = favoritosResponse.data.map(
              (fav) => fav.id_lugar
            );

            lugaresData = lugaresData.map((lugar) => ({
              ...lugar,
              esFavorito: favoritosIds.includes(lugar.id_lugar),
            }));
          } catch (favoritosError) {
            console.error("Error al cargar favoritos:", favoritosError);
          }
        }

        setLugares(lugaresData);
      } catch (error) {
        console.error("Error al cargar lugares:", error);
        setError("Error al cargar los lugares. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoriaSeleccionada, isAuthenticated, token, authLoading]);

  const lugaresFiltrados = lugares.filter((place) =>
    place.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (authLoading || loading) {
    return <div className="loading">Cargando lugares...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="places">
      <h1 className="places__title">Lugares</h1>

      <SearchBar
        value={busqueda}
        onChange={setBusqueda}
        onCategoriaChange={(idCategoria) => {
          console.log("Categoría seleccionada:", idCategoria);
          setCategoriaSeleccionada(idCategoria);
          // Actualizar la URL cuando se cambie la categoría
          if (idCategoria) {
            setSearchParams({ categoria: idCategoria });
          } else {
            setSearchParams({});
          }
        }}
        categoriaSeleccionada={categoriaSeleccionada}
      />

      <PlaceGrid>
        {lugaresFiltrados.map((place) => (
          <PlaceCard
            key={place.id_lugar}
            place={place}
            onFavoritoChange={(id_lugar, nuevoEstado) => {
              setLugares((prev) =>
                prev.map((l) =>
                  l.id_lugar === id_lugar
                    ? { ...l, esFavorito: nuevoEstado }
                    : l
                )
              );
            }}
          />
        ))}
      </PlaceGrid>
    </div>
  );
}

export default Places;
