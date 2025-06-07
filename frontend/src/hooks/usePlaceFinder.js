import { useState, useCallback } from 'react';

// Pasos del PlaceFinder
export const PLACE_FINDER_STEPS = {
  CATEGORIES: 'categories',
  SUBCATEGORIES: 'subcategories', 
  FILTERS: 'filters',
  RESULTS: 'results'
};

const usePlaceFinder = () => {
  // Estado del paso actual
  const [currentStep, setCurrentStep] = useState(PLACE_FINDER_STEPS.CATEGORIES);
  
  // Estado de los datos seleccionados
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [filters, setFilters] = useState({
    ageRange: { min: 18, max: 65 },
    groupSize: null,
    environment: null,
    formality: null
  });
  
  // Estado de los datos cargados
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Funciones de navegación
  const goToStep = useCallback((step) => {
    setCurrentStep(step);
    setError(null);
  }, []);

  const goBack = useCallback(() => {
    switch (currentStep) {
      case PLACE_FINDER_STEPS.SUBCATEGORIES:
        setCurrentStep(PLACE_FINDER_STEPS.CATEGORIES);
        setSelectedCategory(null);
        setSubcategories([]);
        break;
      case PLACE_FINDER_STEPS.FILTERS:
        setCurrentStep(PLACE_FINDER_STEPS.SUBCATEGORIES);
        setSelectedSubcategory(null);
        break;
      case PLACE_FINDER_STEPS.RESULTS:
        setCurrentStep(PLACE_FINDER_STEPS.FILTERS);
        setPlaces([]);
        break;
      default:
        break;
    }
  }, [currentStep]);

  // Funciones para manejar selecciones
  const selectCategory = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentStep(PLACE_FINDER_STEPS.SUBCATEGORIES);
  }, []);

  const selectSubcategory = useCallback((subcategory) => {
    setSelectedSubcategory(subcategory);
    // No cambiar de paso automáticamente
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const goToFilters = useCallback(() => {
    setCurrentStep(PLACE_FINDER_STEPS.FILTERS);
  }, []);

  // Función para cargar categorías
  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:4000/api/place-finder/categories');
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
      } else {
        throw new Error(data.message || 'Error al cargar categorías');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error cargando categorías:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para cargar subcategorías
  const loadSubcategories = useCallback(async (categoryId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:4000/api/place-finder/categories/${categoryId}/subcategories`);
      const data = await response.json();
      
      if (data.success) {
        setSubcategories(data.data);
      } else {
        throw new Error(data.message || 'Error al cargar subcategorías');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error cargando subcategorías:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para buscar lugares
  const searchPlaces = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const searchParams = {
        categoryId: selectedSubcategory?.id_categoria,
        minAge: filters.ageRange.min,
        maxAge: filters.ageRange.max,
        groupSize: filters.groupSize,
        environment: filters.environment,
        formality: filters.formality
      };

      const response = await fetch('http://localhost:4000/api/place-finder/places/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPlaces(data.data);
        setCurrentStep(PLACE_FINDER_STEPS.RESULTS);
      } else {
        throw new Error(data.message || 'Error al buscar lugares');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error buscando lugares:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedSubcategory, filters]);

  // Función para resetear todo
  const reset = useCallback(() => {
    setCurrentStep(PLACE_FINDER_STEPS.CATEGORIES);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setFilters({
      ageRange: { min: 18, max: 65 },
      groupSize: null,
      environment: null,
      formality: null
    });
    setSubcategories([]);
    setPlaces([]);
    setError(null);
  }, []);

  return {
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
    goToStep,
    goBack,
    selectCategory,
    selectSubcategory,
    updateFilters,
    goToFilters,
    loadCategories,
    loadSubcategories,
    searchPlaces,
    reset
  };
};

export default usePlaceFinder; 