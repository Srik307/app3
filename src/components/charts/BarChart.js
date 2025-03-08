import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const BarChartCustom = () => {

  // Sample data for line chart
  const lineData = [
    { month: 'Jan', value: 25 },
    { month: 'Feb', value: 30 },
    { month: 'Mar', value: 38 },
    { month: 'Apr', value: 32 },
    { month: 'May', value: 10 },
    { month: 'Jun', value: 35 },
    { month: 'Jul', value: 22 },
    { month: 'Aug', value: 30 },
    { month: 'Sep', value: 15 },
    { month: 'Oct', value: 35 },
    { month: 'Nov', value: 25 },
    { month: 'Dec', value: 25 },
  ];

  // Sample data for bar chart (forecast vs actual)
  const barData = [
    { name: 'Q1', forecastVolume: 35, actualForecast: 80 },
    { name: 'Q2', forecastVolume: 85, actualForecast: 70 },
    { name: 'Q3', forecastVolume: 45, actualForecast: 0 }, // No actual data for this quarter yet
  ];

  // Define the highlighted regions for line chart
  const highlightedRegions = [
    { start: 'Mar', end: 'Mar', width: 1 },
    { start: 'Jun', end: 'Jul', width: 2 },
    { start: 'Aug', end: 'Aug', width: 1 }
  ];

  // Find indices for the highlighted regions
  const getMonthIndex = (month) => {
    return lineData.findIndex(item => item.month === month);
  };

  // Emphasized data points (with circles)
  const emphasisPoints = ['Mar', 'Jun', 'Aug'];
  
  return (
    <div>
      
      <div className="h-64">
        
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
              barGap={10}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
              />
              <Tooltip />
              <Bar dataKey="forecastVolume" fill="#4ADE80" name="Forecast Volume" radius={[4, 4, 0, 0]} barSize={40} />
              <Bar dataKey="actualForecast" fill="#065F46" name="Actual Forecast" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-400 rounded-sm mr-2"></div>
          <span className="text-sm">Forecast Volume</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-800 rounded-sm mr-2"></div>
          <span className="text-sm">Actual Forecast</span>
        </div>
      </div>
    </div>
  );
};

export default BarChartCustom;