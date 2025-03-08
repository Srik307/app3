import React, { useState, useEffect } from "react";
import Select from "react-select";
import RangeSlider from "../components/RangeSlider";
import LineChartCustom from "../components/charts/LineChart";
import { performancebyyear } from "../sampledata";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const SubmissionByYear = ({ data }) => {
    const [selected, setSelected] = useState("Range");
    const [range, setRange] = useState([data.minYear, data.maxYear]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [yearOptions, setYearOptions] = useState([]);

    // Initialize year options when data changes
    useEffect(() => {
        if (data && data.years) {
            setYearOptions(data.years.map((year) => ({ value: year, label: year.toString() })));
        }
    }, [data]);

    // Reset selectedYear when switching to Range mode
    useEffect(() => {
        if (selected === "Range") {
            setSelectedYear(null);
        } else if (selected === "Individual" && data.years && data.years.length > 0) {
            // Set a default selected year when switching to Individual mode
            setSelectedYear(data.years[data.years.length - 1]); // Default to most recent year
        }
    }, [selected, data]);

    const handleRangeChange = (newRange) => {
        setRange(newRange);
    };

    const handleYearSelect = (selectedOption) => {
        setSelectedYear(selectedOption ? selectedOption.value : null);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_2fr] gap-4 p-4">
            <div className="bg-white p-4">
                <h2 className="text-lg font-semibold mb-3">Submissions by Year</h2>
                
                {data && data.submissions ? (
                    <>
                        <LineChartCustom 
                            height="48" 
                            data={data.submissions} 
                            range={selected === "Range" ? range : null} 
                            selectedYear={selected === "Individual" ? selectedYear : null} 
                        />

                        <div className="mt-4 flex flex-row items-center space-x-4">
                            <div className="flex items-center space-x-4 cursor-pointer me-16">
                            {["Range", "Individual"].map((option) => (
                                <label key={option} className="flex items-center space-x-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="choice"
                                        value={option}
                                        checked={selected === option}
                                        onChange={() => setSelected(option)}
                                        className="hidden" // Hide default radio
                                    />
                                        <div className={`w-4 h-4 flex items-center justify-center border-2 rounded-full ${selected === option ? "border-purple bg-purple-900" : "border-gray-400"}`}>
                                            {selected === option && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                         </div>
                                    <span>{option}</span>
                                </label>
                            ))}
                            </div>


                        {selected === "Range" && (
                                <RangeSlider
                                    value={range} 
                                    onChange={handleRangeChange} 
                                    min={data.minYear} 
                                    max={data.maxYear} 
                                />
                        )}

                        {selected === "Individual" && (
                            <Select
  options={yearOptions}
  value={yearOptions.find(option => option.value === selectedYear)}
  onChange={handleYearSelect}
  className="w-full h-auto"
  placeholder="Select a year"
  isClearable={false}
  styles={{
    control: (base, state) => ({
      ...base,
      borderRadius: "8px",
      borderColor: state.isFocused ? "#7C3AED" : "#e2e8f0", // Purple when focused
      boxShadow: state.isFocused ? "0 0 0 2px #A78BFA" : "none", // Lighter purple glow
      "&:hover": { borderColor: "#9333EA" }, // Darker purple on hover
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#9333EA" : isFocused ? "#E9D5FF" : "white", // Selected is dark purple, hover is light purple
      color: isSelected ? "white" : "#4A0072",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#6B21A8", // Purple text for selected value
    }),
  }}
/>

                        )}
                        </div>

                    </>
                ) : (
                    <div className="h-48 flex items-center justify-center text-gray-500">
                        No submission data available
                    </div>
                )}
            </div>
        </div>
    );
};
