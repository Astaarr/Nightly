import { useEffect } from "react";
import PlaceFinderCategory from "./PlaceFinderCategory";
import PlaceFinderSubCategory from "./PlaceFinderSubCategory";
import PlaceFinderFilters from "./PlaceFinderFilters";
import PlaceFinderResults from "./PlaceFinderResults";
import usePlaceFinder, { PLACE_FINDER_STEPS } from "../hooks/usePlaceFinder";

function PlaceFinder() {
  const {
    // Estado
    currentStep,
    selectedCategory,
    selectedSubcategory,
    filters,
    categories,
    subcategories,
    places,
    loading,
    error,
    
    // Acciones
    goBack,
    selectCategory,
    selectSubcategory,
    updateFilters,
    goToFilters,
    loadCategories,
    loadSubcategories,
    searchPlaces
  } = usePlaceFinder();

  // Cargar categorías al montar el componente
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Cargar subcategorías cuando se selecciona una categoría
  const handleCategorySelect = async (category) => {
    selectCategory(category);
    await loadSubcategories(category.id_categoria);
  };

  // Manejar selección de subcategoría
  const handleSubcategorySelect = (subcategory) => {
    selectSubcategory(subcategory);
  };

  // Continuar desde subcategorías a filtros
  const handleSubcategoryContinue = () => {
    goToFilters();
  };

  // Manejar cambios en filtros
  const handleFiltersChange = (newFilters) => {
    updateFilters(newFilters);
  };

  // Realizar búsqueda
  const handleSearch = () => {
    searchPlaces();
  };

  return (
    <section className="place-finder">
      <div className="place-finder__header">
        <h1>Para ti</h1>
        <h2>¿Qué plan buscas?</h2>
      </div>
      
      <div className="place-finder__content">
        {currentStep === PLACE_FINDER_STEPS.CATEGORIES && (
          <PlaceFinderCategory 
            categories={categories}
            loading={loading}
            error={error}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        )}
        
        {currentStep === PLACE_FINDER_STEPS.SUBCATEGORIES && (
          <PlaceFinderSubCategory 
            subcategories={subcategories}
            loading={loading}
            error={error}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            onSubcategorySelect={handleSubcategorySelect}
            onBackClick={goBack}
            onContinue={handleSubcategoryContinue}
          />
        )}
        
        {currentStep === PLACE_FINDER_STEPS.FILTERS && (
          <PlaceFinderFilters 
            selectedSubcategory={selectedSubcategory}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onBackClick={goBack}
            onSearch={handleSearch}
          />
        )}
        
        {currentStep === PLACE_FINDER_STEPS.RESULTS && (
          <PlaceFinderResults 
            places={places}
            loading={loading}
            error={error}
            onBackClick={goBack}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
          />
        )}
      </div>
    </section>
  );
}

export default PlaceFinder;
