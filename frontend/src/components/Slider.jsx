import { useState, useRef, useEffect, useCallback } from "react";

function Slider({ 
  min = 0, 
  max = 100, 
  initialValue = 50,
  step = 1,
  prefix = "",
  suffix = "",
  title = "",
  options = null,
  onChange 
}) {
  const isOptionsMode = options && Array.isArray(options) && options.length > 0;
  
  const sliderMin = isOptionsMode ? 0 : min;
  const sliderMax = isOptionsMode ? options.length - 1 : max;
  const sliderStep = isOptionsMode ? 1 : step;
  
  const getInitialValue = () => {
    if (isOptionsMode) {
      if (typeof initialValue === 'string') {
        const index = options.findIndex(option => option === initialValue);
        return index !== -1 ? index : 0;
      }
      return typeof initialValue === 'number' && initialValue < options.length ? initialValue : 0;
    }
    return initialValue;
  };
  
  const [value, setValue] = useState(getInitialValue());
  const sliderRef = useRef(null);
  const progress = useRef(null);
  
  const getPercent = (val) => Math.round(((val - sliderMin) / (sliderMax - sliderMin)) * 100);
  
  useEffect(() => {
    const percent = getPercent(value);
    
    if (progress.current) {
      progress.current.style.width = `${percent}%`;
    }
  }, [value, sliderMin, sliderMax]);
  
  const notifyChange = useCallback(() => {
    if (onChange) {
      if (isOptionsMode) {
        onChange({
          value: options[value],
          index: value,
          option: options[value]
        });
      } else {
        onChange(value);
      }
    }
  }, [onChange, value, isOptionsMode, options]);
  
  useEffect(() => {
    notifyChange();
  }, [notifyChange]);
  
  const getDisplayValue = () => {
    return `${prefix}${value}${suffix}`;
  };
  
  return (
    <div className="slider__container">
      {title && <h4 className="slider__title">{title}</h4>}
      
      <div className="slider__control">
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          step={sliderStep}
          value={value}
          ref={sliderRef}
          onChange={(event) => {
            const newValue = +event.target.value;
            setValue(newValue);
          }}
          className="slider__input"
        />
        <div className="slider__track"></div>
        <div ref={progress} className="slider__progress"></div>
      </div>
      
      {isOptionsMode && (
        <div className="slider__options">
          {options.map((option, index) => (
            <span 
              key={index} 
              className={`slider__option ${index === value ? 'slider__option--active' : ''}`}
            >
              {option}
            </span>
          ))}
        </div>
      )}
      
      {!isOptionsMode && (
        <div className="slider__value">{getDisplayValue()}</div>
      )}
    </div>
  );
}

export default Slider; 