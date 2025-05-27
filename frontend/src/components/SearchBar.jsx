import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Buscar...", 
  onCategoriaChange, 
  categoriaSeleccionada, 
  type = "place" 
}) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCategorias = async () => {
      if (type !== "place") return;

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          "http://localhost:4000/api/categorias/principales"
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
        setError("Error al cargar las categorías");
      } finally {
        setLoading(false);
      }
    };

    obtenerCategorias();
  }, [type]);

const handleCategoriaClick = (id) => {
  onCategoriaChange?.(id);
};

  return (
    <div className="search-bar">
      <div className="search-bar__navbar">
        <div className="input__container input__container--search">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="input search-bar__input"
          />
          {value && (
            <button
              className="search-bar__clear-button"
              onClick={() => onChange("")}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
          <button className="search-bar__filtrer-button">
            <i className="fa-solid fa-filter"></i> Filtrar
          </button>
        </div>
      </div>

      {type === "place" && (
        <div className="search-bar__categories">
          <button
            className={`search-bar__category ${
              categoriaSeleccionada === null
                ? "search-bar__category--active"
                : ""
            }`}
            onClick={() => handleCategoriaClick(null)}
          >
            Todos
          </button>

          {loading ? (
            <span>Cargando categorías...</span>
          ) : error ? (
            <span className="error">{error}</span>
          ) : (
            categorias.map((categoria) => (
              <button
                key={categoria.id_categoria}
                className={`search-bar__category ${
                  categoriaSeleccionada === categoria.id_categoria
                    ? "search-bar__category--active"
                    : ""
                }`}
                onClick={() => handleCategoriaClick(categoria.id_categoria)}
              >
                {categoria.nombre_categoria}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
