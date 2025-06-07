import { useState, useRef, useEffect, useCallback } from "react";

function RangeSlider({ 
  min = 0, 
  max = 100, 
  initialMin = 0, 
  initialMax = 100, 
  step = 1,
  prefix = "",
  suffix = "",
  title = "",
  onChange 
}) {
  const [minVal, setMinVal] = useState(initialMin);
  const [maxVal, setMaxVal] = useState(initialMax);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);
  
  // Convertir a porcentaje
  const getPercent = (value) => Math.round(((value - min) / (max - min)) * 100);
  
  // Establecer width del rango cuando cambia el valor mínimo
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);
      
      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, maxVal, min, max]);
  
  // Establecer posición del rango cuando cambia el valor máximo
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);
      
      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, minVal, min, max]);
  
  // Notificar cambios al componente padre - usar useCallback para memoizar
  const notifyChange = useCallback(() => {
    if (onChange) {
      onChange({ min: minVal, max: maxVal });
    }
  }, [onChange, minVal, maxVal]);
  
  useEffect(() => {
    notifyChange();
  }, [notifyChange]);
  
  return (
    <div className="range-slider__container">
      {title && <h4 className="range-slider__title">{title}</h4>}
      <div className="range-slider__slider">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - step);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className="range-slider__thumb range-slider__thumb--left"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + step);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className="range-slider__thumb range-slider__thumb--right"
        />
        
        <div className="range-slider__track"></div>
        <div ref={range} className="range-slider__range"></div>
      </div>
      <div className="range-slider__values">
        <div className="range-slider__value">{prefix}{minVal}{suffix}</div>
        <div className="range-slider__value">{prefix}{maxVal}{suffix}</div>
      </div>
    </div>
  );
}

export default RangeSlider; 