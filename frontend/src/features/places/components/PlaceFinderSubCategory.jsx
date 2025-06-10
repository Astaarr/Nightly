import { useState } from "react";

const Subcategory = ({ subcategory, isSelected, onSelect }) => {
  return (
    <label
      className={`place-finder__subcategory ${
        isSelected ? "place-finder__subcategory--active" : ""
      }`}
      onClick={() => onSelect(subcategory)}
    >
      <div className="place-finder__subcategory-radio">
        <input 
          type="radio" 
          name="subcategory" 
          checked={isSelected}
          onChange={() => {}}
        />
      </div>
      <div className="place-finder__subcategory-title">{subcategory.nombre_categoria}</div>
    </label>
  );
};

function PlaceFinderSubCategory({ 
  subcategories, 
  loading, 
  error, 
  selectedCategory, 
  selectedSubcategory, 
  onSubcategorySelect, 
  onBackClick,
  onContinue 
}) {
  if (loading) {
    return (
      <div className="place-finder__subcategories">
        <div className="place-finder__subcategories-header">
          <button className="place-finder__back-button" onClick={onBackClick}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h3>Cargando...</h3>
        </div>
        <div className="place-finder__loading">
          <p>Cargando subcategorías...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="place-finder__subcategories">
        <div className="place-finder__subcategories-header">
          <button className="place-finder__back-button" onClick={onBackClick}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h3>Error</h3>
        </div>
        <div className="place-finder__error">
          <p>Error al cargar subcategorías: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="place-finder__subcategories">
      <div className="place-finder__subcategories-header">
        <button className="place-finder__back-button" onClick={onBackClick}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h3>{selectedCategory?.nombre_categoria}</h3>
      </div>
      
      <div className="place-finder__subcategories-content">
        {subcategories.map((subcategory) => (
          <Subcategory 
            key={subcategory.id_categoria}
            subcategory={subcategory}
            isSelected={selectedSubcategory?.id_categoria === subcategory.id_categoria}
            onSelect={onSubcategorySelect}
          />
        ))}
      </div>

      <div className="place-finder__subcategories-footer">
        <button 
          className="place-finder__subcategories-footer-button"
          onClick={onContinue}
          disabled={!selectedSubcategory}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}

export default PlaceFinderSubCategory;
