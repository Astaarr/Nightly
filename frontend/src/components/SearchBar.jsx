import React from "react";

function SearchBar({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <div className="input__container input__container--search">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input events__search-bar"
      />
      <button className="events__filtrer-button"><i class="fa-solid fa-filter"></i> Filtrar</button>
    </div>
  );
}

export default SearchBar;
