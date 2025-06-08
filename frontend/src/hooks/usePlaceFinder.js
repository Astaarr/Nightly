import { useState, useCallback } from 'react';
import api from '../api/axios';

export const PLACE_FINDER_STEPS = {
  CATEGORIES: 'categories',
  SUBCATEGORIES: 'subcategories',
  FILTERS: 'filters',
  RESULTS: 'results'
};

const usePlaceFinder = () => {
  const [currentStep, setCurrentStep] = useState(PLACE_FINDER_STEPS.CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [filters, setFilters] = useState({
    ageRange: { min: 18, max: 65 },
    groupSize: null,
    environment: null,
    formality: null
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const selectCategory = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentStep(PLACE_FINDER_STEPS.SUBCATEGORIES);
  }, []);

  const selectSubcategory = useCallback((subcategory) => {
    setSelectedSubcategory(subcategory);
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const goToFilters = useCallback(() => {
    setCurrentStep(PLACE_FINDER_STEPS.FILTERS);
  }, []);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/place-finder/categories');
      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        throw new Error(response.data.message || 'Error al cargar categorías');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error cargando categorías:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSubcategories = useCallback(async (categoryId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/place-finder/categories/${categoryId}/subcategories`);
      if (response.data.success) {
        setSubcategories(response.data.data);
      } else {
        throw new Error(response.data.message || 'Error al cargar subcategorías');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error cargando subcategorías:', err);
    } finally {
      setLoading(false);
    }
  }, []);

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

      const response = await api.post('/place-finder/places/search', searchParams);

      if (response.data.success) {
        setPlaces(response.data.data);
        setCurrentStep(PLACE_FINDER_STEPS.RESULTS);
      } else {
        throw new Error(response.data.message || 'Error al buscar lugares');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error buscando lugares:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedSubcategory, filters]);

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
    currentStep,
    selectedCategory,
    selectedSubcategory,
    filters,
    categories,
    subcategories,
    places,
    loading,
    error,
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
