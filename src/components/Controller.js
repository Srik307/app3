import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


export const YearRangeSelector = ({setOutRange}) => {
  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const [range, setRange] = useState([2000, 2025]);
  const [dragging, setDragging] = useState(null); // 'start', 'end', or null
  const trackRef = useRef(null);
  
  // Handle numeric input changes
  const handleStartYearChange = (e) => {
    const newStartYear = Math.max(startYear, parseInt(e.target.value) || startYear);
    if (newStartYear <= range[1]) {
      setRange([newStartYear, range[1]]);
      setOutRange([newStartYear, range[1]]);
    }
  };
  
  const handleEndYearChange = (e) => {
    const newEndYear = Math.min(currentYear, parseInt(e.target.value) || currentYear);
    if (newEndYear >= range[0]) {
      setRange([range[0], newEndYear]);
      setOutRange([range[0], newEndYear]);
    }
  };
  
  // Handle mouse/touch events for dragging
  const handleMouseDown = (handle) => {
    setDragging(handle);
  };
  
  const handleMouseUp = () => {
    setDragging(null);
  };
  
  const handleMouseMove = (e) => {
    if (!dragging || !trackRef.current) return;
    
    const track = trackRef.current;
    const rect = track.getBoundingClientRect();
    
    // Calculate position relative to track
    let position = (e.clientX - rect.left) / rect.width;
    position = Math.max(0, Math.min(1, position));
    
    // Convert position to year
    const year = Math.round(startYear + position * (currentYear - startYear));
    
    if (dragging === 'start') {
      if (year < range[1]) {
        setRange([year, range[1]]);
        setOutRange([year, range[1]]);
      }
    } else if (dragging === 'end') {
      if (year > range[0]) {
        setRange([range[0], year]);
        setOutRange([range[0], year]);
      }
    }
  };
  
  // Add and remove event listeners
  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [dragging, range]);
  
  // Handle touch events
  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      const touchEvent = {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY
      };
      handleMouseMove(touchEvent);
    }
  };
  
  // Generate tick marks for the timeline
  const generateTicks = () => {
    const ticks = [];
    const step = 7;
    for (let year = startYear; year <= currentYear; year += step) {
      const position = ((year - startYear) / (currentYear - startYear)) * 100;
      ticks.push(
        <div 
          key={year} 
          className="absolute text-center" 
          style={{ 
            left: `${position}%`, 
            transform: year === startYear ? 'translateX(0%)' : 
                      year === currentYear ? 'translateX(-100%)' : 'translateX(-50%)'
          }}
        >
          <div className="h-2 w-0.5 bg-gray-400 mx-auto"></div>
          <div className="text-xs text-gray-600 mt-2 max-w-[30px] truncate">{year}</div>
        </div>
      );
    }
    return ticks;
  };
  
  
  
  // Calculate positions for the range handles
  const startPosition = ((range[0] - startYear) / (currentYear - startYear)) * 100;
  const endPosition = ((range[1] - startYear) / (currentYear - startYear)) * 100;
  
  return (
    <div className="p-2 w-3/4 rounded-md bg-white select-none">
      <div className="mb-10 relative">
        {/* Timeline track */}
        <div 
          ref={trackRef}
          className="h-1 w-full bg-gray-300 rounded relative"
          onMouseDown={(e) => {
            if (e.target === trackRef.current) {
              const rect = trackRef.current.getBoundingClientRect();
              const position = (e.clientX - rect.left) / rect.width;
              const year = Math.round(startYear + position * (currentYear - startYear));
              
              // Determine which handle to move based on which is closer
              if (Math.abs(year - range[0]) < Math.abs(year - range[1])) {
                setRange([year, range[1]]);
              } else {
                setRange([range[0], year]);
              }
            }
          }}
        >
          {/* Tick marks */}
          {generateTicks()}
          
          {/* Selected range */}
          <div 
            className="absolute h-1 bg-blue-500 rounded-full" 
            style={{ 
              left: `${startPosition}%`, 
              width: `${endPosition - startPosition}%` 
            }}
          ></div>
          
          {/* Start handle */}
          <div 
            className={`absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -mt-1 cursor-pointer shadow-md ${dragging === 'start' ? 'ring-2 ring-blue-300' : ''}`}
            style={{ left: `${startPosition}%`, transform: 'translateX(-50%)' }}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown('start');
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleMouseDown('start');
            }}
          ></div>
          
          {/* End handle */}
          <div 
            className={`absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -mt-1 cursor-pointer shadow-md ${dragging === 'end' ? 'ring-2 ring-blue-300' : ''}`}
            style={{ left: `${endPosition}%`, transform: 'translateX(-50%)' }}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown('end');
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleMouseDown('end');
            }}
          ></div>
        </div>
      </div>
      
      <div className="flex gap-6">
        <div className="flex-1">
          <label className="text-xs font-medium text-gray-700 me-3">Start</label>
          <input
            type="number"
            min={startYear}
            max={currentYear}
            value={range[0]}
            onChange={handleStartYearChange}
            className="text-center text-[12px] font-bold px-0.5 py-0.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-16"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs font-medium text-gray-700 me-3">End</label>
          <input
            type="number"
            min={startYear}
            max={currentYear}
            value={range[1]}
            onChange={handleEndYearChange}
            className="text-center text-[12px] font-bold px-0.5 py-0.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-16"
          />
        </div>
      </div>
    </div>
  );
};


export const YearSelector = ({ setSelectedYear }) => {
  const [year, setYear] = useState(2025);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(null);
  const prevYearRef = useRef(year);
  const [inputValue, setInputValue] = useState(year.toString());
  
  const handleIncrement = () => {
    setDirection('up');
    setIsAnimating(true);
    const newYear = year + 1;
    setYear(newYear);
    setInputValue(newYear.toString());
    setSelectedYear(newYear);
  };
  
  const handleDecrement = () => {
    setDirection('down');
    setIsAnimating(true);
    const newYear = year - 1;
    setYear(newYear);
    setInputValue(newYear.toString());
    setSelectedYear(newYear);
  };
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Update year only if value is a valid number
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue)) {
      const prevYear = year;
      setDirection(parsedValue > prevYear ? 'up' : 'down');
      setYear(parsedValue);
      setSelectedYear(parsedValue);
      setIsAnimating(true);
    }
  };
  
  // Handle blur event when user clicks away from input
  const handleBlur = () => {
    // If input is empty or invalid, reset to previous valid year
    if (inputValue === '' || isNaN(parseInt(inputValue))) {
      setInputValue(year.toString());
    }
  };
  
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    prevYearRef.current = year;
  }, [year, isAnimating]);
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-center">Select the Year</h2>
      <div className="flex items-center justify-center w-60">
        <button 
          onClick={handleDecrement}
          className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-l-lg hover:bg-blue-600 focus:outline-none"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="relative bg-white border border-gray-300 h-10 w-24">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-full h-full text-center text-lg appearance-none"
            style={{ 
              MozAppearance: 'textfield',
              WebkitAppearance: 'none'
            }}
          />
        </div>
        
        <button 
          onClick={handleIncrement}
          className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-r-lg hover:bg-blue-600 focus:outline-none"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};


