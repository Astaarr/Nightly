import { useState } from "react";

const Category = ({ category, isSelected, onSelect }) => {
  return (
    <div 
      className={`place-finder__category ${isSelected ? "place-finder__category--active" : ""}`}
      onClick={() => onSelect(category)}
    >
      <div className="place-finder__category-icon">
        <i className={`fa-solid ${category.icono}`}></i>
      </div>
      <h4 className="place-finder__category-title">{category.nombre_categoria}</h4>
      <p className="place-finder__category-description">
        {category.descripcion}
      </p>
    </div>
  );
};

function PlaceFinderCategory({ categories, loading, error, selectedCategory, onCategorySelect }) {
  if (loading) {
    return (
      <div className="place-finder__categories">
        <div className="place-finder__loading">
          <p>Cargando categorías...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="place-finder__categories">
        <div className="place-finder__error">
          <p>Error al cargar categorías: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="place-finder__categories">
      {categories.map((category) => (
        <Category
          key={category.id_categoria}
          category={category}
          isSelected={selectedCategory?.id_categoria === category.id_categoria}
          onSelect={onCategorySelect}
        />
      ))}
    </div>
  );
}

export default PlaceFinderCategory;
