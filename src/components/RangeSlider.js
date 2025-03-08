import { useState, useEffect } from "react";
import { Range } from "react-range";

export default function RangeSlider({ min = 2020, max = 2025, step = 1, values, onChange }) {
  // Ensure default values are within the valid range
  const defaultValues = values && values.length === 2 ? values : [min, max];

  const [rangeValues, setRangeValues] = useState(defaultValues);

  // Update rangeValues when min/max changes
  useEffect(() => {
    setRangeValues([min, max]);
  }, [min, max]);

  const handleChange = (newValues) => {
    setRangeValues(newValues);
    if (onChange) onChange(newValues); // Notify parent component
  };

  return (
    <div className="w-64 flex flex-col items-center">
      <Range
        values={rangeValues}
        step={step}
        min={min}
        max={max}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div {...props} className="h-1 w-3/4 bg-gray-300 rounded-full relative">
            {/* Active range bar */}
            <div
              className="h-1 bg-purple-400 rounded-full absolute"
              style={{
                left: `${((rangeValues[0] - min) / (max - min)) * 100}%`,
                width: `${((rangeValues[1] - rangeValues[0]) / (max - min)) * 100}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div {...props} className="flex items-center justify-center shadow-md">
            <span className="absolute top-[-15px] text-sm bg-white border border-purple-600 px-2 py-1 rounded shadow-md">
              {rangeValues[index]}
            </span>
          </div>
        )}
      />
    </div>
  );
}
