import PlaceGrid from "./PlaceGrid";
import PlaceCard from "./PlaceCard";

function PlaceFinderResults({ places, loading, error, onBackClick, selectedCategory, selectedSubcategory }) {
  // Función para generar el texto del título con la información de categoría/subcategoría
  const generateResultsTitle = () => {
    const resultsCount = places.length;
    
    if (!selectedCategory && !selectedSubcategory) {
      return `Resultados (${resultsCount})`;
    }
    
    return (
      <>
        {resultsCount} resultado{resultsCount !== 1 ? 's' : ''} encontrado{resultsCount !== 1 ? 's' : ''}
        {selectedSubcategory && (
          <>
            {' para '}
            <span className="place-finder__results-highlight">
              {selectedSubcategory.nombre_categoria.toLowerCase()}
            </span>
          </>
        )}
        {selectedCategory && (
          <>
            {' en la categoría '}
            <span className="place-finder__results-highlight">
              {selectedCategory.nombre_categoria.toLowerCase()}
            </span>
          </>
        )}
      </>
    );
  };

  if (loading) {
    return (
      <div className="place-finder__results">
        <div className="place-finder__subcategories-header">
          <button className="place-finder__back-button" onClick={onBackClick}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h3 className="place-finder__results-title">Cargando...</h3>
        </div>
        <div className="place-finder__loading">
          <p>Buscando lugares perfectos para ti...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="place-finder__results">
        <div className="place-finder__subcategories-header">
          <button className="place-finder__back-button" onClick={onBackClick}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h3 className="place-finder__results-title">Error</h3>
        </div>
        <div className="place-finder__error">
          <p>Ha ocurrido un error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="place-finder__results">
      <div className="place-finder__subcategories-header">
        <button className="place-finder__back-button" onClick={onBackClick}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h3 className="place-finder__results-title">
          {generateResultsTitle()}
        </h3>
      </div>
      
      <div className="place-finder__results-content">
        {places.length === 0 ? (
          <div className="place-finder__no-results">
            <p>No se encontraron lugares que cumplan con tus criterios.</p>
            <p>Intenta ajustar los filtros para ver más opciones.</p>
          </div>
        ) : (
          <PlaceGrid>
            {places.map((place) => (
              <PlaceCard
                key={place.id_lugar}
                place={place}
                onFavoritoChange={(id_lugar, nuevoEstado) => {
                  // Aquí podrías manejar el cambio de favorito si es necesario
                  console.log(`Lugar ${id_lugar} marcado como favorito: ${nuevoEstado}`);
                }}
              />
            ))}
          </PlaceGrid>
        )}
      </div>
    </div>
  );
}

export default PlaceFinderResults;