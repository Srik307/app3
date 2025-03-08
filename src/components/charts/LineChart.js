import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChartCustom = ({ data, range, selectedYear, height = "48" }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [yDomain, setYDomain] = useState([0, 50]);
  const [useYearOnly, setUseYearOnly] = useState(false);

  useEffect(() => {
    if (!data || data.length === 0) return;

    let filtered = data;

    // Apply year filtering
    if (selectedYear) {
      filtered = data.filter(item => item.year === selectedYear);
      setUseYearOnly(false); // Show monthly data for individual year
    } else if (range && range.length === 2) {
      filtered = data.filter(item => item.year >= range[0] && item.year <= range[1]);
      setUseYearOnly(true); // Show only years on X-axis
    }

    // Aggregate data by year if range is selected
    if (useYearOnly) {
      const groupedByYear = filtered.reduce((acc, cur) => {
        const existing = acc.find(item => item.year === cur.year);
        if (existing) {
          existing.value = Math.max(existing.value,cur.value); // Sum values for each year
        } else {
          acc.push({ year: cur.year, value: cur.value });
        }
        return acc;
      }, []);
      filtered = groupedByYear;
    }

    // Calculate appropriate Y domain
    if (filtered.length > 0) {
      const maxValue = Math.max(...filtered.map(item => item.value));
      const roundedMax = Math.ceil(maxValue / 10) * 10;
      setYDomain([0, Math.max(50, roundedMax)]);
    }

    setFilteredData(filtered);
  }, [data, range, selectedYear, useYearOnly]);

  return (
    <div className={`w-full h-${height} relative`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey={useYearOnly ? "year" : "month"} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            domain={yDomain}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="purple" 
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {filteredData.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          No data available for the selected range
        </div>
      )}
    </div>
  );
};

export default LineChartCustom;
