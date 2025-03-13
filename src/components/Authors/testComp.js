import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submissionbyyear } from "../../sampledata";
import RangeSlider from "../RangeSlider";
import LineChartCustom from "../charts/LineChart";
import Select from "react-select";
import { FaNewspaper } from "react-icons/fa";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Dashboard() {
  const [selected, setSelected] = useState("Range");
  const [range, setRange] = useState([submissionbyyear?.minYear || 2000, submissionbyyear?.maxYear || 2025]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [yearOptions, setYearOptions] = useState([]);
  const [mainChart, setMainChart] = useState("chart1");
  const mainBoxRef = useRef(null);

  useEffect(() => {
    // Populate year options from submissionbyyear data
    if (submissionbyyear?.submissions) {
      setYearOptions(
        submissionbyyear.years.map((item) => ({
          value: item,
          label: item.toString(),
        }))
      );
    }
  }, []);

  const handleSwap = (key) => {
    setMainChart(key);
    setTimeout(() => {
      mainBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  };

  const handleRangeChange = (newRange) => {
    setRange(newRange);
  };

  const handleYearSelect = (selectedOption) => {
    setSelectedYear(selectedOption ? selectedOption.value : null);
  };

  const publications = [
    { name: "SCOPUS", count: 3 },
    { name: "WOS", count: 0 },
    { name: "SCI", count: 0 },
    { name: "PBM", count: 0 },
    { name: "IEE", count: 3 },
    { name: "GSC", count: 4 },
    { name: "ABDC", count: 0 },
  ];


  const ArticlesType=[
    { name: 'Journal', count: 30 },
    { name: 'Conference', count: 25 },
    { name: 'Book', count: 20 },
    { name: 'Book Chapter', count: 20 },
  ];


 const ArticlesColors=['#4285F4', '#EA4335', '#FBBC05', 'purple','#FF6D01', '#46BDC6', '#7B0099', '#00A1F1', '#FFCD00', '#FF7300'];



 const Scopus = [
  { year: 2020, "Citations": 45, "H-index": 20,AvgSNIP:2.5 ,HighestSNIP:3.5},
  { year: 2021, "Citations": 58, "H-index": 34 ,AvgSNIP:3.5,HighestSNIP:4.5},
  { year: 2022, "Citations": 62, "H-index": 45 ,AvgSNIP:4.5,HighestSNIP:5.5},
  { year: 2023, "Citations": 92, "H-index": 56 ,AvgSNIP:5.5,HighestSNIP:6.5},
  { year: 2024, "Citations": 99, "H-index": 77,AvgSNIP:6.5 ,HighestSNIP:7.5},
];

const WOS=[
  { year: 2020, "Citations": 40, "H-index": 25,AvgSNIP:2.5 ,HighestSNIP:3.5},
  { year: 2021, "Citations": 48, "H-index": 30 ,AvgSNIP:3.5,HighestSNIP:4.5},
  { year: 2022, "Citations": 52, "H-index": 40 ,AvgSNIP:4.5,HighestSNIP:5.5},
  { year: 2023, "Citations": 82, "H-index": 50 ,AvgSNIP:5.5,HighestSNIP:6.5},
  { year: 2024, "Citations": 89, "H-index": 70,AvgSNIP:6.5 ,HighestSNIP:7.5},
]



const Patents = [
  { year: '2020', patent: 0 },
  { year: '2021', patent: 0 },
  { year: '2022', patent: 1 },
  { year: '2023', patent: 0 },
  { year: '2024', patent: 2 },
];

  const charts = {
    chart1: (
      <div style={{height:"300px"}} className="p-2">
        <h2 className="text-xl font-medium mb-2">Publications</h2>
        {submissionbyyear?.submissions ? (
          <LineChartCustom
            height="48"
            data={submissionbyyear.submissions}
            range={selected === "Range" ? range : null}
            selectedYear={selected === "Individual" ? selectedYear : null}
          />
        ) : (
          <div className="h-48 flex items-center justify-center text-gray-500">No submission data available</div>
        )}

        {mainChart === "chart1" && (
          <div className="mt-4 flex flex-row items-center space-x-4 w-full">
            <div className="flex items-center space-x-4 cursor-pointer me-10">
              {["Range", "Individual"].map((option) => (
                <label key={option} className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="radio"
                    name="choice"
                    value={option}
                    checked={selected === option}
                    onChange={() => setSelected(option)}
                    className="hidden"
                  />
                  <div
                    className={`w-4 h-4 flex items-center justify-center border-2 rounded-full ${
                      selected === option ? "border-purple bg-purple-900" : "border-gray-400"
                    }`}
                  >
                    {selected === option && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                  <span>{option}</span>
                </label>
              ))}
            </div>

            {selected === "Range" && (
              <RangeSlider value={range} onChange={handleRangeChange} min={submissionbyyear.minYear} max={submissionbyyear.maxYear} />
            )}

            {selected === "Individual" && (
              <Select
                options={yearOptions}
                value={yearOptions.find((option) => option.value === selectedYear)}
                onChange={handleYearSelect}
                className="w-full h-auto"
                placeholder="Select a year"
                isClearable={false}
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
            )}
          </div>
        )}
      </div>
    ),
    chart2:  <div style={{height:"300px"}} className="p-2 pl-4">
                <h2 className="text-xl font-bold">Articles</h2>
                <div className="h-full overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart >
                      <Pie
                        data={ArticlesType}
                        cx="50%"
                        cy="40%"
                        outerRadius={(mainChart=="chart2")?110:100}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {ArticlesType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={ArticlesColors[index % ArticlesColors.length]} />
                        ))}
                      </Pie>
                      {mainChart === "chart2" && (
                    <Legend
        align="right"
        verticalAlign="top"
        layout="vertical"
        iconType="circle"
        iconSize={12}
        wrapperStyle={{ fontSize: 18 ,paddingRight:20}}
        content={({ payload }) => (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {payload.map((entry, index) => {
              const total = ArticlesType.reduce((sum, item) => sum + item.count, 0);
              const percentage = ((entry.payload.value / total) * 100).toFixed(1);
              return (
                <li key={`item-${index}`} style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: entry.color,
                      marginRight: 8,
                    }}
                  />
                  {entry.value} ({percentage}%)
                </li>
              );
            })}
          </ul>
        )}/>
    )}
                    <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>,
    chart3: <div style={{height:"250px"}} className="p-2">
                         <h2 className="text-xl font-bold mb-3">Scopus</h2>
                         <div className="h-full overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={Scopus}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                     {mainChart==="chart3" &&
                     <Legend />
                      }
                      <Line type="monotone" dataKey="citations" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={3} />
                      <Line type="monotone" dataKey="H-index" stroke="#82ca9d" activeDot={{ r: 8 }} strokeWidth={3} />
                      <Line type="monotone" dataKey="AvgSNIP" stroke="#ffc658" activeDot={{ r: 8 }} strokeWidth={3} />
                      <Line type="monotone" dataKey="HighestSNIP" stroke="#ff8042" activeDot={{ r: 8 }} strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>,
    chart4: <div style={{height:"250px"}} className="p-2">
    <h2 className="text-xl font-bold mb-3">Web of Science</h2>
    <div className="h-full overflow-hidden">
<ResponsiveContainer width="100%" height="100%">
<LineChart data={WOS}>
 <CartesianGrid strokeDasharray="3 3" />
 <XAxis dataKey="year" />
 <YAxis />
 <Tooltip />
{mainChart==="chart4" &&
<Legend />
 }
 {/* //use different color (not used in scopus) for each line here */}
  <Line type="monotone" dataKey="citations" stroke="#FF8042" activeDot={{ r: 8 }} strokeWidth={3} />
  <Line type="monotone" dataKey="H-index" stroke="#FFCD00" activeDot={{ r: 8 }} strokeWidth={3} />
  <Line type="monotone" dataKey="AvgSNIP" stroke="#FF7300" activeDot={{ r: 8 }} strokeWidth={3} />
  <Line type="monotone" dataKey="HighestSNIP" stroke="#FF6D01" activeDot={{ r: 8 }} strokeWidth={3} />
</LineChart>
</ResponsiveContainer>
</div>
</div>,

 chart5:
 <div className="p-4" style={{height:"250px"}}>
  <h2 className="text-xl font-bold mb-2">Patents</h2>
 <div className="h-full overflow-hidden">
 <ResponsiveContainer width="100%" >
  <BarChart data={Patents}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="year" type="category" />
    <YAxis dataKey="patent" type="number" fill="#000" />
    <Tooltip />
    {mainChart === "chart5" &&
    <Legend />
  }
    <Bar dataKey="patent" barSize={40} radius={[0, 4, 4, 0]} fill="purple" />
  </BarChart>
</ResponsiveContainer>
 </div>
</div> };


const smallcharts = {
  chart1: (
<div style={{ height: "130px" }} className="p-1">
  <h2 className="text-sm font-medium mb-1">Publications</h2>
  {submissionbyyear?.submissions ? (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={submissionbyyear.submissions.filter((item) => item.year >= 2024 && item.year <= 2025)}
       margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 7 }}
        />
        <YAxis
          tick={{ fontSize: 7 }}
          axisLine={false}
          tickLine={false}
          width={20}
        />
        <Tooltip wrapperStyle={{ fontSize: "8px" }} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="purple"
          strokeWidth={1.5}
          dot={{ r: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <div className="h-16 flex items-center justify-center text-gray-500 text-xs">
      No submission data available
    </div>
  )}
</div>

  ),
  chart2: (
    <div style={{ height: "100px" }} className="p-1 pl-2">
      <h2 className="text-md font-bold">Articles</h2>
      <div className="h-full overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ArticlesType}
              cx="50%"
              cy="55%"
              outerRadius={40}
              fill="#8884d8"
              dataKey="count"
            >
              {ArticlesType.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={ArticlesColors[index % ArticlesColors.length]} />
              ))}
            </Pie>
            <Tooltip wrapperStyle={{ fontSize: "10px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  ),
  chart3: (
    <div style={{ height: "100px" }} className="p-2">
      <h2 className="text-md font-bold mb-3">Scopus</h2>
      <div className="h-full overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={Scopus} margin={{ left: 0, right: 10, top: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" padding={{ left: 0, right: 0 }} tick={{ fontSize: 8 }} />
            <YAxis width={20} tick={{ fontSize: 8 }} />
            <Tooltip wrapperStyle={{ fontSize: "8px" }} />
            <Line type="monotone" dataKey="citations" stroke="#8884d8" activeDot={{ r: 3 }} strokeWidth={1.5} />
            <Line type="monotone" dataKey="H-index" stroke="#82ca9d" activeDot={{ r: 3 }} strokeWidth={1.5} />
            <Line type="monotone" dataKey="AvgSNIP" stroke="#ffc658" activeDot={{ r: 3 }} strokeWidth={1.5} />
            <Line type="monotone" dataKey="HighestSNIP" stroke="#ff8042" activeDot={{ r: 3 }} strokeWidth={1.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  ),
  chart4: (
    <div style={{ height: "100px" }} className="p-2">
      <h2 className="text-md font-bold mb-4">Web of Science</h2>
      <div className="h-full overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={WOS} margin={{ left: 0, right: 10, top: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fontSize: 8 }} />
            <YAxis width={20} tick={{ fontSize: 8 }} />
            <Tooltip wrapperStyle={{ fontSize: "8px" }} />
            {mainChart === "chart4" && <Legend wrapperStyle={{ fontSize: "8px" }} />}
            <Line type="monotone" dataKey="citations" stroke="#FF8042" activeDot={{ r: 3 }} strokeWidth={1.5} />
            <Line type="monotone" dataKey="H-index" stroke="#FFCD00" activeDot={{ r: 3 }} strokeWidth={1.5} />
            <Line type="monotone" dataKey="AvgSNIP" stroke="#FF7300" activeDot={{ r: 3 }} strokeWidth={1.5} />
            <Line type="monotone" dataKey="HighestSNIP" stroke="#FF6D01" activeDot={{ r: 3 }} strokeWidth={1.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  ),
  chart5: (
    <div className="p-2" style={{ height: "100px" }}>
      <h2 className="text-md font-bold mb-4">Patents</h2>
      <div className="h-full overflow-hidden">
        <ResponsiveContainer width="100%">
          <BarChart data={Patents} margin={{ left: 0, right: 5, top: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" type="category" tick={{ fontSize: 8 }} />
            <YAxis dataKey="patent" type="number" width={20} tick={{ fontSize: 8 }} />
            <Tooltip wrapperStyle={{ fontSize: "8px" }} />
            {mainChart === "chart5" && <Legend wrapperStyle={{ fontSize: "8px" }} />}
            <Bar dataKey="patent" barSize={20} radius={[0, 2, 2, 0]} fill="purple" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  ),
};



  const descriptions = {
    chart1: 
    <div className="bg-white w-full max-w-md mx-auto border border-gray-600 rounded-lg h-full">
    <h2 className="text-lg font-semibold text-center bg-gray-100 py-2 rounded-t-lg">
      Publications
    </h2>
    <div className="flex flex-wrap justify-start gap-1 p-2">
      {publications.map((pub, index) => (
        <div key={index} className="flex flex-col items-center space-y-1 w-20 border border-gray-400 rounded p-1">
          <FaNewspaper className="text-gray-600 text-xl" color="purple" />
          <span className="text-xs font-medium">{pub.name} - {pub.count}</span>
        </div>
      ))}
    </div>
  </div>
    ,
    chart2:     
    <div className="bg-white w-full max-w-md mx-auto border border-gray-600 rounded-lg">
    <h2 className="text-lg font-semibold text-center bg-gray-100 py-2 rounded-t-lg">
      Articles Type
    </h2>
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {ArticlesType.map((pub, index) => (
        <div key={index} className="flex flex-col items-center space-y-1 w-30 border border-gray-400 rounded p-3">
        <FaNewspaper className="text-gray-600 text-xl" color="purple" />
        <span className="text-xs font-medium">{pub.name} - {pub.count}</span>
      </div>
      ))}
    </div>
  </div>,
    chart3:  <div className="bg-white w-full max-w-md mx-auto border border-gray-600 rounded-lg">
    <h2 className="text-lg font-semibold text-center bg-gray-100 py-2 rounded-t-lg">
      Top Index - Scopus
    </h2>
    <div className="flex flex-wrap justify-center gap-4 p-2">
      {Object.keys(Scopus[Scopus.length-1]).map((pub, index) => (
        <div key={index} className="flex flex-col items-center space-y-1 w-30 border border-gray-400 rounded p-2">
          <FaNewspaper className="text-gray-600 text-2xl" color="purple" />
          <span className="text-xs font-medium whitespace-nowrap">{pub} - {Scopus[Scopus.length-1][pub]}</span>
        </div>
      ))}
    </div>
  </div>,
    chart4:<div className="bg-white w-full max-w-md mx-auto border border-gray-600 rounded-lg">
    <h2 className="text-lg font-semibold text-center bg-gray-100 py-2 rounded-t-lg">
      Top Index - Web of Science
    </h2>
    <div className="flex flex-wrap justify-center gap-4 p-2">
      {Object.keys(WOS[WOS.length-1]).map((pub, index) => (
        <div key={index} className="flex flex-col items-center space-y-1 w-30 border border-gray-400 rounded p-2">
          <FaNewspaper className="text-gray-600 text-2xl" color="purple" />
          <span className="text-xs font-medium whitespace-nowrap">{pub} - {WOS[WOS.length-1][pub]}</span>
        </div>
      ))}
    </div>
  </div>,
  chart5: <div className="bg-white w-full max-w-md mx-auto border border-gray-600 rounded-lg" style={{height:"100%"}}>
    <div className="flex justify-center items-center gap-4 p-4 bg-gray-100 py-2 rounded-t-lg">
      <FaNewspaper className="text-gray-600 text-2xl" color="purple" />
      <h2 className="text-lg font-semibold text-center">
     Patents Filed ( {Patents[0].year}-{Patents[Patents.length-1].year} )
    </h2>
    </div>
    <div className="flex flex-col justify-center items-center gap-4 pl-2 pr-2 overflow-y-auto pb-10" style={{maxHeight:"200px"}}>
      {/* // list of year and patentes filed */}
      <div className="flex justify-between items-center w-full mt-1 border-b-2 border-gray-400 pl-3 pr-3">
          <span className="text-md font-bold whitespace-nowrap">Year</span>
          <span className="text-md font-bold">Count</span>
        </div>
      {Patents.map((patent, index) => (
        <div key={index} className="flex justify-between items-center w-full border-b-2 pl-3 pr-5">
          <span className="text-md font-medium whitespace-nowrap">{patent.year}</span>
          <span className="text-md font-bold">{patent.patent}</span>
        </div>
      ))}
    </div>
    </div>
  };

  return (
    <div>
      {/* Main Chart Section */}
      <div ref={mainBoxRef} className="grid grid-cols-[3fr_2fr_2fr] gap-4 mt-3">
        {/* Main Chart Box */}
        <motion.div
          key={mainChart}
          className="bg-white border border-purple-300 shadow-lg rounded"
          style={{ height: "300px" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">{charts[mainChart]}</AnimatePresence>
        </motion.div>

        {/* Side Box with Description */}
        <motion.div
          key={mainChart + "-desc"}
          className="bg-white shadow-lg rounded p-4"
          style={{ height: "300px" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          {descriptions[mainChart]}
        </motion.div>

      <div className="flex flex-wrap gap-4">
        {Object.keys(charts).map((key) =>
          mainChart !== key ? (
            <motion.div
              key={key}
              className="bg-white shadow-lg rounded cursor-pointer hover:bg-blue-400 transition"
              style={{ height: "140px",width:"150px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSwap(key)}
            >
              {smallcharts[key]}
            </motion.div>
          ) : null
        )}
      </div>


      </div>

    </div>
  );
}
