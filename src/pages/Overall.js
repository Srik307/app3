import React, { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Select from "react-select";
import { areasColors, journaltrends, ResearchAreas, submissionbyyear, TopIndexes, yearwiseQuartiles } from "../sampledata";
import { SubmissionByYear } from "../datacards/Manuscripts";

const quartileColors = ["#1E88E5", "#FFC107", "#4CAF50", "#F44336"];

const Overall = () => {
  const [yearQuartiles, setYearQuartiles] = useState(2025);
  const [activeView, setActiveView] = useState("overview");
  
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const transformedData = yearwiseQuartiles.data
    .filter((item) => item.year === yearQuartiles)
    .flatMap((item) => [
      { quartile: "Q1", value: item.Q1 },
      { quartile: "Q2", value: item.Q2 },
      { quartile: "Q3", value: item.Q3 },
      { quartile: "Q4", value: item.Q4 },
    ]);

  // Navigation tiles component
  const NavigationTiles = ({ vertical = false }) => (
    <div className={`grid ${vertical ? "grid-cols-1 gap-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"}`}>
      <div 
        className={`bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all ${activeView === "overview" ? "ring-2 ring-blue-500" : "hover:bg-blue-50"}`}
        onClick={() => setActiveView("overview")}
      >
        <h2 className="text-lg font-semibold mb-2">Overview</h2>
        <p className="text-sm text-gray-600">Key metrics</p>
      </div>
      
      <div 
        className={`bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all ${activeView === "researchAreas" ? "ring-2 ring-blue-500" : "hover:bg-blue-50"}`}
        onClick={() => setActiveView("researchAreas")}
      >
        <h2 className="text-lg font-semibold mb-2">Research Areas</h2>
        <p className="text-sm text-gray-600">By field</p>
      </div>
      
      <div 
        className={`bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all ${activeView === "journalTrends" ? "ring-2 ring-blue-500" : "hover:bg-blue-50"}`}
        onClick={() => setActiveView("journalTrends")}
      >
        <h2 className="text-lg font-semibold mb-2">Journal Trends</h2>
        <p className="text-sm text-gray-600">Publications</p>
      </div>
      
      <div 
        className={`bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all ${activeView === "quartiles" ? "ring-2 ring-blue-500" : "hover:bg-blue-50"}`}
        onClick={() => setActiveView("quartiles")}
      >
        <h2 className="text-lg font-semibold mb-2">Quartiles</h2>
        <p className="text-sm text-gray-600">Manuscripts</p>
      </div>
      
      <div 
        className={`bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all ${activeView === "topIndexes" ? "ring-2 ring-blue-500" : "hover:bg-blue-50"}`}
        onClick={() => setActiveView("topIndexes")}
      >
        <h2 className="text-lg font-semibold mb-2">Top Indexes</h2>
        <p className="text-sm text-gray-600">Distribution</p>
      </div>
    </div>
  );

  // Render different views based on the active view
  const renderMainContent = () => {
    switch (activeView) {
      case "overview":
        return (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                    <h4 className="text-md font-medium text-blue-800">Submissions</h4>
                    <p className="text-2xl font-bold">10,000</p>
                    <p className="text-sm text-gray-600">Total papers</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg shadow-md">
                    <h4 className="text-md font-medium text-green-800">Authors</h4>
                    <p className="text-2xl font-bold">500</p>
                    <p className="text-sm text-gray-600">Active and passive</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg shadow-md">
                    <h4 className="text-md font-medium text-purple-800">Avg Review Time</h4>
                    <p className="text-2xl font-bold">1.5</p>
                    <p className="text-sm text-gray-600">Days</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg shadow-md">
                    <h4 className="text-md font-medium text-amber-800">Approval Rate</h4>
                    <p className="text-2xl font-bold">40%</p>
                    <p className="text-sm text-gray-600">Accepted papers</p>
                  </div>
                </div>
              </div>

              <SubmissionByYear data={submissionbyyear} />
            </div>
          </div>
        );
      
      case "researchAreas":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Research Areas</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ResearchAreas}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ResearchAreas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={areasColors[index % areasColors.length]} />
                    ))}
                  </Pie>
                  <Legend
                    align="right"
                    verticalAlign="middle"
                    layout="vertical"
                    iconType="circle"
                    iconSize={12}
                    wrapperStyle={{ padding: "10px" }}
                  />
                  <text
                    x="50%"
                    y="48%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={24}
                    fontWeight="bold"
                  >
                    12+ Research
                  </text>
                  <text
                    x="50%"
                    y="58%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={24}
                    fontWeight="bold"
                  >
                    Areas
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      case "journalTrends":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Journal Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={journaltrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="IEEE Journals" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={3} />
                  <Line type="monotone" dataKey="Elsevier Journals" stroke="#82ca9d" activeDot={{ r: 8 }} strokeWidth={3} />
                  <Line type="monotone" dataKey="Springer" stroke="#ffc658" activeDot={{ r: 8 }} strokeWidth={3} />
                  <Line type="monotone" dataKey="ASME Journals" stroke="#ff8042" activeDot={{ r: 8 }} strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      case "quartiles":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Manuscripts Quartiles</h2>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg">Distribution by quartile for selected year</p>
              <Select
                options={yearwiseQuartiles.years.map((year) => ({ value: year, label: year }))}
                value={{ value: yearQuartiles, label: yearQuartiles }}
                onChange={(selected) => setYearQuartiles(selected.value)}
                className="w-32"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderRadius: "8px",
                    borderColor: state.isFocused ? "#7C3AED" : "#e2e8f0",
                    boxShadow: state.isFocused ? "0 0 0 2px #A78BFA" : "none",
                    "&:hover": { borderColor: "#9333EA" },
                  }),
                  option: (base, { isFocused, isSelected }) => ({
                    ...base,
                    backgroundColor: isSelected ? "#9333EA" : isFocused ? "#E9D5FF" : "white",
                    color: isSelected ? "white" : "#4A0072",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "#6B21A8",
                  }),
                }}
              />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={transformedData}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="quartile" type="category" fill="#000" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name={`Quartiles for ${yearQuartiles}`} barSize={40} radius={[0, 4, 4, 0]}>
                    {transformedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={quartileColors[index % quartileColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      case "topIndexes":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Top Indexes</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TopIndexes}
                    cx="50%"
                    cy="50%"
                    fill="#8884d8"
                    dataKey="value"
                    outerRadius={120}
                    label={renderLabel}
                    labelLine={false}
                  >
                    {TopIndexes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={areasColors[index % areasColors.length]} />
                    ))}
                  </Pie>
                  <Legend
                    align="right"
                    verticalAlign="middle"
                    layout="vertical"
                    iconType="circle"
                    iconSize={12}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      

      case "performance":
      default:
        return <div>Select a dashboard to view</div>;
    }
  };

  return (
    <div className="w-full p-2">
      <h1 className="text-3xl font-bold mb-3">Dashboard</h1>
      
      {activeView === "overview" ? (
        // Overview layout - Main content on top, navigation at bottom
        <>
          <div className="mb-3">
            {renderMainContent()}
          </div>
          <NavigationTiles vertical={false} />
        </>
      ) : (
        // Non-overview layout - Main content left, navigation right
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            {renderMainContent()}
          </div>
          <div className="md:w-1/4">
            <NavigationTiles vertical={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Overall;