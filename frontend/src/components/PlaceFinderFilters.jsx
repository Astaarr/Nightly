import { useState, useCallback } from "react";
import RangeSlider from "./RangeSlider";
import Slider from "./Slider";

function PlaceFinderFilters({ 
  selectedSubcategory, 
  filters, 
  onFiltersChange, 
  onBackClick, 
  onSearch 
}) {
  const handleAgeRangeChange = useCallback((range) => {
    onFiltersChange({ ageRange: range });
  }, [onFiltersChange]);

  const handleGroupSizeChange = useCallback((data) => {
    onFiltersChange({ groupSize: data.value });
  }, [onFiltersChange]);

  const handleEnvironmentChange = useCallback((data) => {
    onFiltersChange({ environment: data.value });
  }, [onFiltersChange]);

  const handleFormalityChange = useCallback((data) => {
    onFiltersChange({ formality: data.value });
  }, [onFiltersChange]);

  const groupSizeOptions = ["Individual", "Pareja", "Grupo"];
  const environmentOptions = ["Familiar", "Romántico", "Tranquilo", "Animado"];
  const formalityOptions = ["Formal", "Neutro", "Informal"];
  
  return (
    <div className="place-finder__filters">
      <div className="place-finder__subcategories-header">
        <button className="place-finder__back-button" onClick={onBackClick}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h3 className="place-finder__filters-title">
          {selectedSubcategory?.nombre_categoria}
        </h3>
      </div>
      
      <div className="place-finder__filters-content">
        <div className="place-finder__filters-item">
          <RangeSlider 
            min={18} 
            max={65} 
            initialMin={filters.ageRange.min} 
            initialMax={filters.ageRange.max} 
            step={1}
            prefix=""
            title="Rango de edad"
            onChange={handleAgeRangeChange}
          />
        </div>
        
        <div className="place-finder__filters-item">
          <Slider
            options={groupSizeOptions}
            initialValue={filters.groupSize || "Pareja"}
            title="Tamaño del grupo"
            onChange={handleGroupSizeChange}
          />
        </div>
        
        <div className="place-finder__filters-item">
          <Slider
            options={environmentOptions}
            initialValue={filters.environment || "Romántico"}
            title="Ambiente"
            onChange={handleEnvironmentChange}
          />
        </div>

        <div className="place-finder__filters-item">
          <Slider
            options={formalityOptions}
            initialValue={filters.formality || "Neutro"}
            title="Nivel de formalidad"
            onChange={handleFormalityChange}
          />
        </div>
      </div>

      <div className="place-finder__filters-footer">
        <button 
          className="place-finder__filters-button"
          onClick={onSearch}
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default PlaceFinderFilters;
