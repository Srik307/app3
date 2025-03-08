import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submissionbyyear } from "../../sampledata";
import RangeSlider from "../RangeSlider";
import LineChartCustom from "../charts/LineChart";
import Select from "react-select";
import { FaNewspaper } from "react-icons/fa";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function ArticleMetrics() {
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
      mainBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    chart1:  <div style={{height:"200px"}} className="p-2 pl-4">
                <h2 className="text-xl font-bold">Articles</h2>
                <div className="h-full overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart >
                      <Pie
                        data={ArticlesType}
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
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
    chart2: <div style={{height:"200px"}} className="p-2">
                         <h2 className="text-xl font-bold mb-3">Scopus</h2>
                         <div className="h-full overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={Scopus} margin={{ left: 0, right: 7, top: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis width={35} />
                      <Tooltip />
                     <Legend />
                      <Line type="monotone" dataKey="citations" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={3} />
                      <Line type="monotone" dataKey="H-index" stroke="#82ca9d" activeDot={{ r: 8 }} strokeWidth={3} />
                      <Line type="monotone" dataKey="AvgSNIP" stroke="#ffc658" activeDot={{ r: 8 }} strokeWidth={3} />
                      <Line type="monotone" dataKey="HighestSNIP" stroke="#ff8042" activeDot={{ r: 8 }} strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>,
    chart3: <div style={{height:"200px"}} className="p-2">
    <h2 className="text-xl font-bold mb-3">Web of Science</h2>
    <div className="h-full overflow-hidden">
<ResponsiveContainer width="100%" height="100%">
<LineChart data={WOS} margin={{ left: 0, right: 7, top: 0, bottom: 0 }}>
 <CartesianGrid strokeDasharray="3 3" />
 <XAxis dataKey="year" />
 <YAxis width={35} />
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

 chart4:
 <div className="p-2" style={{height:"200px"}}>
  <h2 className="text-xl font-bold">Patents</h2>
 <div className="h-full overflow-hidden">
 <ResponsiveContainer width="100%" >
  <BarChart data={Patents} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="year" type="category" />
    <YAxis width={40} dataKey="patent" type="number" fill="#000" />
    <Tooltip />
    <Legend align="right" verticalAlign="top" wrapperStyle={{paddingBottom:10}} />
    <Bar dataKey="patent" barSize={40} radius={[0, 4, 4, 0]} fill="purple" />
  </BarChart>
</ResponsiveContainer>
 </div>
</div> };


const smallcharts = {
  chart1: (
    <div style={{ height: "80px" }} className="p-1 pl-2">
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
  chart2: (
    <div style={{ height: "100px" }} className="p-2">
      <h2 className="text-sm font-bold mb-3">Scopus</h2>
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
  chart3: (
    <div style={{ height: "100px" }} className="p-2">
      <h2 className="text-sm font-bold mb-4">Web of Science</h2>
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
  chart4: (
    <div className="p-2" style={{ height: "100px" }}>
      <h2 className="text-sm font-bold mb-4">Patents</h2>
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

  return (
    <div>
      {/* Main Chart Section */}
      <div ref={mainBoxRef}>
        {/* Main Chart Box */}
        <motion.div
          key={mainChart}
          className="bg-white border border-purple-300 shadow-lg rounded mb-2"
          style={{ height: "250px",width:"100%" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">{charts[mainChart]}</AnimatePresence>
        </motion.div>

        {/* Side Box with Description */}


              {/* Small Charts Section */}
      <div className="flex flex-wrap gap-4">
        {Object.keys(charts).map((key) =>
          mainChart !== key ? (
            <motion.div
              key={key}
              className="bg-white shadow-lg rounded cursor-pointer hover:bg-blue-400 transition"
              style={{ height: "130px",width:"130px" }}
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
