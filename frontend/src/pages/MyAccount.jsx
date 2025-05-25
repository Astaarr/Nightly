import { useAuth } from "../context/AuthContext";
import UserCard from "../components/UserCard";
import PlaceCard from "../components/PlaceCard";
import PlaceGrid from "../components/PlaceGrid";
import { useEffect, useState } from "react";
import axios from "axios";

function MyAccount() {
  const { user, isAuthenticated, isLoading, token } = useAuth();
  const [lugaresFavoritos, setLugaresFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState("https://unavatar.io/substack/bankless");

  // Efecto para cargar y actualizar los datos del usuario
  useEffect(() => {
    const loadUserData = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUserData(storedUser);
        
        // Actualizar el avatar cuando cambian los datos del usuario
        if (storedUser.avatar_url) {
          setAvatar(`http://localhost:4000/${storedUser.avatar_url}`);
        } else {
          setAvatar("https://unavatar.io/substack/bankless");
        }
      }
    };

    loadUserData(); // Cargar datos iniciales

    // Configurar un intervalo para verificar cambios
    const interval = setInterval(loadUserData, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchFavoritos() {
      try {
        setLoading(true);
        setError(null);
        
        const favoritosResponse = await axios.get("http://localhost:4000/api/favoritos", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const favoritosIds = favoritosResponse.data.map(f => f.id_lugar);
        
        if (favoritosIds.length === 0) {
          setLugaresFavoritos([]);
          return;
        }

        const lugaresResponse = await axios.get("http://localhost:4000/api/lugares");
        const lugaresCompletos = lugaresResponse.data.filter(lugar => 
          favoritosIds.includes(lugar.id_lugar)
        );

        const lugaresConFavorito = lugaresCompletos.map(lugar => ({
          ...lugar,
          esFavorito: true
        }));

        setLugaresFavoritos(lugaresConFavorito);
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
        setError("Error al cargar tus lugares favoritos. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    }

    if (isAuthenticated) {
      fetchFavoritos();
    }
  }, [token, isAuthenticated]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  if (loading) {
    return <div className="loading">Cargando tus favoritos...</div>;
  }

  if (!userData) {
    return <div className="loading">Cargando datos del usuario...</div>;
  }

  return (
    <>
      <section className="account">
        <h2 className="account__title-section">Mi cuenta</h2>
        <UserCard 
          username={userData.nombre} 
          email={userData.email} 
          avatar={avatar}
        />
      </section>

      <section className="account">
        <h2 className="account__title-section">Mis lugares favoritos</h2>
        
        {error ? (
          <div className="error-message">{error}</div>
        ) : lugaresFavoritos.length === 0 ? (
          <div className="no-favorites">
            <p>Aún no has agregado ningún lugar a favoritos.</p>
            <p>¡Explora nuestros lugares y guarda tus favoritos!</p>
          </div>
        ) : (
          <PlaceGrid>
            {lugaresFavoritos.map((lugar) => (
              <PlaceCard 
                key={lugar.id_lugar} 
                place={lugar}
                onFavoritoChange={(id, estado) => {
                  if (!estado) {
                    setLugaresFavoritos(prev => prev.filter(f => f.id_lugar !== id));
                  }
                }}
              />
            ))}
          </PlaceGrid>
        )}
      </section>
    </>
  );
}

export default MyAccount;