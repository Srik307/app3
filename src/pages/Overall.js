import React,{useState,useEffect} from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, RadarChart, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell, ComposedChart
} from 'recharts';
import {YearRangeSelector,YearSelector} from '../components/Controller';
import { motion, AnimatePresence } from "framer-motion";
import { FaNewspaper } from "react-icons/fa";
import { SquareArrowUpLeft, Grid } from 'lucide-react';
import { articles } from '../sampledata';

const OverAllDashboard = ({id}) => {

  const [mainChart, setMainChart] = useState("chartdocumentsbydept");
  const [yearOrMonth, setYearOrMonth] = useState('yearly');
  const [selectedYear, setSelectedYear] = useState(null);
  const [range, setRange] = useState([2010, 2025]);
  const [yDomain, setYDomain] = useState([0, 50]);
  const [filteredData1, setFilteredData1] = useState([]);
  const [filteredData2, setFilteredData2] = useState([]);
  const [filteredData3, setFilteredData3] = useState([]);
  const [filteredData4, setFilteredData4] = useState([]);

  // Sample data for the various metrics
  const pipelineData = {
    totalLeads: 15002,
    leadRevenue: 5926,
    acquisitionCost: 149.82,
    totalSiteVisits: 28.02,
    totalRevenue: 5.92,
    mentionCount: 31
  };

  // Engagement time data
  const engagementTimeData = [
    { hour: '12am', value: 20 },
    { hour: '2am', value: 10 },
    { hour: '4am', value: 5 },
    { hour: '6am', value: 15 },
    { hour: '8am', value: 35 },
    { hour: '10am', value: 50 },
    { hour: '12pm', value: 80 },
    { hour: '2pm', value: 70 },
    { hour: '4pm', value: 90 },
    { hour: '6pm', value: 60 },
    { hour: '8pm', value: 40 },
    { hour: '10pm', value: 30 }
  ];

  // Weekly engagement data
  const weekdayData = [
    { day: 'Sun', opens: 3411, rate: 35.7 },
    { day: 'Mon', opens: 3816, rate: 42.5 },
    { day: 'Tue', opens: 2856, rate: 45.3 },
    { day: 'Wed', opens: 3523, rate: 54.8 },
    { day: 'Thu', opens: 4148, rate: 48.3 },
    { day: 'Fri', opens: 3892, rate: 46.6 },
    { day: 'Sat', opens: 2401, rate: 32.0 }
  ];

  // Lead source data
  const leadSourceData = [
    { name: 'Organic', value: 35 },
    { name: 'Paid', value: 25 },
    { name: 'Social', value: 18 },
    { name: 'Email', value: 15 },
    { name: 'Referral', value: 7 }
  ];

  // ROI by channel data
  const roiData = [
    { name: 'Social', value: 4.2 },
    { name: 'Email', value: 3.8 },
    { name: 'Search', value: 3.1 },
    { name: 'Display', value: 2.5 },
    { name: 'Video', value: 2.8 }
  ];

  // Cost per win data
  const costPerWinData = [
    { month: 'Jan', cost: 18 },
    { month: 'Feb', cost: 16 },
    { month: 'Mar', cost: 14 },
    { month: 'Apr', cost: 15 },
    { month: 'May', cost: 17 },
    { month: 'Jun', cost: 16 },
    { month: 'Jul', cost: 14 },
    { month: 'Aug', cost: 15 },
    { month: 'Sep', cost: 16 }
  ];

  // Marketing spend by channel data
  const spendByChannelData = [
    { quarter: 'Q1', social: 120, email: 80, search: 100, display: 60 },
    { quarter: 'Q2', social: 130, email: 90, search: 110, display: 70 },
    { quarter: 'Q3', social: 140, email: 100, search: 120, display: 80 },
    { quarter: 'Q4', social: 150, email: 110, search: 130, display: 90 }
  ];

  // Spend vs Budget data
  const spendVsBudgetData = [
    { name: 'Social', spent: 80, budget: 100 },
    { name: 'Email', spent: 70, budget: 90 },
    { name: 'Search', spent: 90, budget: 80 }
  ];

  // Online vs In-store data
  const salesChannelData = [
    { quarter: 'Q1', online: 120, inStore: 80 },
    { quarter: 'Q2', online: 140, inStore: 90 },
    { quarter: 'Q3', online: 160, inStore: 100 },
    { quarter: 'Q4', online: 180, inStore: 110 }
  ];

  // Site visits data
  const siteVisitsData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    visits: Math.floor(Math.random() * 500) + 500
  }));

  // Revenue by promotion data
  const revenueByPromotionData = [
    { promotion: 'Email Campaign', value: 1.2 },
    { promotion: 'Social Media', value: 1.5 },
    { promotion: 'Search Ads', value: 1.1 },
    { promotion: 'Display Ads', value: 0.8 },
    { promotion: 'Affiliate', value: 0.7 }
  ];

  // Sales by customer type data
  const salesByCustomerTypeData = [
    { name: 'New', value: 35 },
    { name: 'Returning', value: 45 },
    { name: 'Loyal', value: 20 }
  ];

  // Mentions by source data
  const mentionsBySourceData = [
    { name: 'Twitter', value: 40 },
    { name: 'Facebook', value: 30 },
    { name: 'Instagram', value: 20 },
    { name: 'LinkedIn', value: 10 }
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a05195'];
  const COLORS2 = ['#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F'];






  const RADIAN = Math.PI / 180;








/*********************************8*/

const publications = [
  { name: "SCOPUS", count: 3 },
  { name: "WOS", count: 0 },
  { name: "SCI", count: 0 },
  { name: "PBM", count: 0 },
  { name: "IEE", count: 3 },
  { name: "GSC", count: 4 },
  { name: "ABDC", count: 0 },
];


const submissions=[
  { "year": 2020, "month": "Jan", "value": 36 },
  { "year": 2020, "month": "Feb", "value": 48 },
  { "year": 2020, "month": "Mar", "value": 47 },
  { "year": 2020, "month": "Apr", "value": 22 },
  { "year": 2020, "month": "May", "value": 17 },
  { "year": 2020, "month": "Jun", "value": 19 },
  { "year": 2020, "month": "Jul", "value": 17 },
  { "year": 2020, "month": "Aug", "value": 41 },
  { "year": 2020, "month": "Sep", "value": 59 },
  { "year": 2020, "month": "Oct", "value": 55 },
  { "year": 2020, "month": "Nov", "value": 18 },
  { "year": 2020, "month": "Dec", "value": 19 },
  { "year": 2021, "month": "Jan", "value": 39 },
  { "year": 2021, "month": "Feb", "value": 51 },
  { "year": 2021, "month": "Mar", "value": 30 },
  { "year": 2021, "month": "Apr", "value": 14 },
  { "year": 2021, "month": "May", "value": 33 },
  { "year": 2021, "month": "Jun", "value": 39 },
  { "year": 2021, "month": "Jul", "value": 32 },
  { "year": 2021, "month": "Aug", "value": 45 },
  { "year": 2021, "month": "Sep", "value": 42 },
  { "year": 2021, "month": "Oct", "value": 47 },
  { "year": 2021, "month": "Nov", "value": 40 },
  { "year": 2021, "month": "Dec", "value": 24 },
  { "year": 2022, "month": "Jan", "value": 52 },
  { "year": 2022, "month": "Feb", "value": 11 },
  { "year": 2022, "month": "Mar", "value": 50 },
  { "year": 2022, "month": "Apr", "value": 23 },
  { "year": 2022, "month": "May", "value": 25 },
  { "year": 2022, "month": "Jun", "value": 41 },
  { "year": 2022, "month": "Jul", "value": 11 },
  { "year": 2022, "month": "Aug", "value": 22 },
  { "year": 2022, "month": "Sep", "value": 43 },
  { "year": 2022, "month": "Oct", "value": 20 },
  { "year": 2022, "month": "Nov", "value": 16 },
  { "year": 2022, "month": "Dec", "value": 20 },
  { "year": 2023, "month": "Jan", "value": 52 },
  { "year": 2023, "month": "Feb", "value": 25 },
  { "year": 2023, "month": "Mar", "value": 21 },
  { "year": 2023, "month": "Apr", "value": 40 },
  { "year": 2023, "month": "May", "value": 11 },
  { "year": 2023, "month": "Jun", "value": 24 },
  { "year": 2023, "month": "Jul", "value": 30 },
  { "year": 2023, "month": "Aug", "value": 56 },
  { "year": 2023, "month": "Sep", "value": 19 },
  { "year": 2023, "month": "Oct", "value": 29 },
  { "year": 2023, "month": "Nov", "value": 45 },
  { "year": 2023, "month": "Dec", "value": 13 },
  { "year": 2024, "month": "Jan", "value": 45 },
  { "year": 2024, "month": "Feb", "value": 22 },
  { "year": 2024, "month": "Mar", "value": 54 },
  { "year": 2024, "month": "Apr", "value": 52 },
  { "year": 2024, "month": "May", "value": 55 },
  { "year": 2024, "month": "Jun", "value": 44 },
  { "year": 2024, "month": "Jul", "value": 37 },
  { "year": 2024, "month": "Aug", "value": 33 },
  { "year": 2024, "month": "Sep", "value": 41 },
  { "year": 2024, "month": "Oct", "value": 41 },
  { "year": 2024, "month": "Nov", "value": 11 },
  { "year": 2024, "month": "Dec", "value": 30 },
  { "year": 2025, "month": "Jan", "value": 37 },
  { "year": 2025, "month": "Feb", "value": 11 },
  { "year": 2025, "month": "Mar", "value": 48 },
  { "year": 2025, "month": "Apr", "value": 52 },
  { "year": 2025, "month": "May", "value": 18 },
  { "year": 2025, "month": "Jun", "value": 19 },
  { "year": 2025, "month": "Jul", "value": 40 },
  { "year": 2025, "month": "Aug", "value": 45 },
  { "year": 2025, "month": "Sep", "value": 39 },
  { "year": 2025, "month": "Oct", "value": 23 },
  { "year": 2025, "month": "Nov", "value": 18 },
  { "year": 2025, "month": "Dec", "value": 100 }
];

const WosVsScopus = [
  { year: 2020, month: 'Jan', wos: 0, scopus: 0 },
  { year: 2020, month: 'Feb', wos: 0, scopus: 0 },
  { year: 2020, month: 'Mar', wos: 0, scopus: 0 },
  { year: 2020, month: 'Apr', wos: 0, scopus: 0 },
  { year: 2020, month: 'May', wos: 0, scopus: 0 },
  { year: 2020, month: 'Jun', wos: 0, scopus: 0 },
  { year: 2020, month: 'Jul', wos: 0, scopus: 0 },
  { year: 2020, month: 'Aug', wos: 0, scopus: 0 },
  { year: 2020, month: 'Sep', wos: 0, scopus: 0 },
  { year: 2020, month: 'Oct', wos: 0, scopus: 0 },
  { year: 2020, month: 'Nov', wos: 0, scopus: 0 },
  { year: 2020, month: 'Dec', wos: 1, scopus: 3 },

  { year: 2021, month: 'Jan', wos: 0, scopus: 0 },
  { year: 2021, month: 'Feb', wos: 0, scopus: 0 },
  { year: 2021, month: 'Mar', wos: 0, scopus: 0 },
  { year: 2021, month: 'Apr', wos: 0, scopus: 0 },
  { year: 2021, month: 'May', wos: 0, scopus: 0 },
  { year: 2021, month: 'Jun', wos: 0, scopus: 0 },
  { year: 2021, month: 'Jul', wos: 0, scopus: 0 },
  { year: 2021, month: 'Aug', wos: 0, scopus: 0 },
  { year: 2021, month: 'Sep', wos: 0, scopus: 0 },
  { year: 2021, month: 'Oct', wos: 0, scopus: 0 },
  { year: 2021, month: 'Nov', wos: 0, scopus: 0 },
  { year: 2021, month: 'Dec', wos: 4, scopus: 5 },

  { year: 2022, month: 'Dec', wos: 6, scopus: 7 },
  { year: 2023, month: 'Dec', wos: 5, scopus: 1 },
  { year: 2024, month: 'Dec', wos: 5, scopus: 3 },
  { year: 2025, month: 'Dec', wos: 5, scopus: 3 },
];


const QuartilesData = [
  { year: 2020, Q1: 12, Q2: 50, Q3: 14, Q4: 25},
  { year: 2021, Q1: 135, Q2: 55, Q3: 14, Q4: 27},
  { year: 2022, Q1: 14, Q2: 56, Q3: 18, Q4: 27},
  { year: 2023, Q1: 15, Q2: 59, Q3: 14.82, Q4: 28},
  { year: 2024, Q1: 15, Q2: 22, Q3: 15.5, Q4: 29},
  { year: 2025, Q1: 15, Q2: 45, Q3: 15.5, Q4: 29},
];


const transformdata = (year) => {
  const data = QuartilesData.find((d) => d.year === year) || {};
  console.log(data);
  
  return [
    { category: "Q1", value: data.Q1 || 0 },
    { category: "Q2", value: data.Q2 || 0 },
    { category: "Q3", value: data.Q3 || 0 },
    { category: "Q4", value: data.Q4 || 0 },
  ];
};

const filteredDataQuartiles=transformdata(selectedYear||2025);




const ResearchAreas={
  "2025":[
  { name: 'Category A', value: 30 },
  { name: 'Category B', value: 25 },
  { name: 'Category C', value: 20 },
  { name: 'Category D', value: 25 },
  { name: 'Category E', value: 15 },
  { name: 'Category F', value: 10 },
  { name: 'Category G', value: 5 },
  { name: 'Category H', value: 5 },
  { name: 'Category I', value: 5 },
  { name: 'Category J', value: 5 }],
 
  "2024":[
    { name: 'Category A', value: 3 },
    { name: 'Category B', value: 25 },
    { name: 'Category C', value: 2 },
    { name: 'Category D', value: 5 },
    { name: 'Category E', value: 5 },
    { name: 'Category F', value: 10 },
    { name: 'Category G', value: 5 },
    { name: 'Category H', value: 5 },
    { name: 'Category I', value: 5 },
    { name: 'Category J', value: 5 }
  ]
}

const CustomLegendResearch = ({ payload }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  return (
    <div style={{ position: "relative" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {payload.map((entry, index) => {
          const total = ArticlesType.reduce((sum, item) => sum + item.count, 0);
          const percentage = ((entry.payload.value / total) * 100).toFixed(1);
          const legendText = `${entry.value} (${percentage}%)`;

          return (
            <li
              key={`item-${index}`}
              style={{
                display: "flex",
                alignItems: "center",
                maxWidth: "120px", // Adjust width as needed
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                cursor: "pointer",
                position: "relative",
                marginBottom: "6px",
              }}
              onMouseEnter={(e) => {
                setHoveredItem(index);
                setTooltipPosition({
                  top: e.target.getBoundingClientRect().top - 30,
                  left: e.target.getBoundingClientRect().left + 20,
                });
              }}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: entry.color,
                  marginRight: 8,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flexGrow: 1,
                }}
              >
                {legendText}
              </span>
              {/* Tooltip */}
              {hoveredItem === index && (
                <div
                  style={{
                    position: "fixed",
                    top: tooltipPosition.top,
                    left: tooltipPosition.left,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    color: "#fff",
                    padding: "6px 10px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    zIndex: 1000,
                    pointerEvents: "none",
                  }}
                >
                  {legendText}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};


const ArticlesByType=[
  {name:"Journal",value:30},
  {name:"Conference",value:25},
  {name:"Book",value:20},
  {name:"Book Chapter",value:20},
]

const departmentData = [
  { department: "Engineering", documents: 120 },
  { department: "Marketing", documents: 85 },
  { department: "Finance", documents: 95 },
  { department: "Human Resources", documents: 60 },
  { department: "Sales", documents: 110 },
  { department: "Customer Support", documents: 75 },
  { department: "Operations", documents: 90 },
  { department: "IT", documents: 130 },
  { department: "Research & Development", documents: 105 },
  { department: "Legal", documents: 70 }
];

const CustomLabelDept = (props) => {
  const { x, y, width, height, department } = props;

 // Adjusts font size dynamically
  const maxChars = Math.floor(height / Math.abs(department.length-2) ); // Adjust text length based on bar height
  console.log(maxChars,department);
  const truncatedText = department.length > maxChars ? department.substring(0, maxChars) + "..." : department;

  return (
    <g
    >
      {/* Department Name inside Bar (Rotated) */}
      <text
        x={x}
        y={y + height / 2}
        textAnchor="left"
        alignmentBaseline="middle"
        fontSize={12}
        fontWeight={"medium"}
        fill="white"
        transform={`rotate(-90, ${x + width / 2}, ${y + height / 2})`} // Vertical text
      >
        {truncatedText}
      </text>

    </g>
  );
};






//listener for documents
useEffect(() => {
  if (!submissions || submissions.length === 0) return;

  let filtered = submissions;

  if (selectedYear) {
    // Filter by selected year
    filtered = submissions.filter(item => item.year === selectedYear);
  } else if (range && range.length === 2) {
    // Filter by range
    filtered = submissions.filter(item => item.year >= range[0] && item.year <= range[1]);

    if (yearOrMonth === "yearly") {
      // Sum up values for each year
      const groupedByYear = filtered.reduce((acc, cur) => {
        const existing = acc.find(item => item.year === cur.year);
        if (existing) {
          existing.value += cur.value; // Sum values for each year
        } else {
          acc.push({ year: cur.year, value: cur.value });
        }
        return acc;
      }, []);
      filtered = groupedByYear;
    }
  }

  // Calculate appropriate Y domain
  if (filtered.length > 0) {
    const maxValue = Math.max(...filtered.map(item => item.value))+100;
    const roundedMax = Math.ceil(maxValue / 10) * 10;
    
    // Prevent unnecessary re-renders
    setYDomain(prev => (prev[1] !== Math.max(50, roundedMax) ? [0, Math.max(50, roundedMax)] : prev));
  }

  // Prevent unnecessary re-renders
  setFilteredData1(prev => (JSON.stringify(prev) !== JSON.stringify(filtered) ? filtered : prev));

}, [submissions, range, selectedYear, yearOrMonth]);



//listener for wos vs scopus
useEffect(() => {
  if (!WosVsScopus || WosVsScopus.length === 0) return;

  let filtered = WosVsScopus;

  if (selectedYear) {
    // Filter by selected year
    filtered = WosVsScopus.filter(item => item.year === selectedYear);
  } else if (range && range.length === 2) {
    // Filter by range
    filtered = WosVsScopus.filter(item => item.year >= range[0] && item.year <= range[1]);

    if (yearOrMonth === "yearly") {
      // Sum up values for each year
      const groupedByYear = filtered.reduce((acc, cur) => {
        const existing = acc.find(item => item.year === cur.year);
        if (existing) {
          existing.value += cur.value; // Sum values for each year
        } else {
          acc.push({ year: cur.year, wos: cur.wos ,scopus:cur.scopus });
        }
        return acc;
      }, []);
      filtered = groupedByYear;
    }
  }
  
  console.log(filtered);

  // Prevent unnecessary re-renders
  setFilteredData2(prev => (JSON.stringify(prev) !== JSON.stringify(filtered) ? filtered : prev));

}, [WosVsScopus, range, selectedYear, yearOrMonth]);





 ////////////////////////////////////////////////

 
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


///////////////////////////




  const charts = {
    chartdocuments: (
<div className="p-3" style={{height:"150px"}} >
  <h2 className="text-lg font-medium mb-5">Documents</h2>
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={filteredData1} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey={yearOrMonth === "yearly" ? "year" : "month"}
        axisLine={false}
        tickLine={false}
        tickMargin={10}
        fontSize={12}
      />
      <YAxis
        domain={yDomain}
        axisLine={false}
        tickLine={false}
        tickMargin={10}
        fontSize={12}
        width={45}
      />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="value"
        stroke="purple"
        fill="purple"
        fillOpacity={0.3} // Adjust fill transparency
        strokeWidth={1}
      />
    </AreaChart>
  </ResponsiveContainer>
</div>
),
chartwosvsscopus:
<div className="p-3" style={{height:"200px"}} >
  <h2 className="text-lg font-medium">Web of Science Vs Scopus</h2>
  <div className="h-full overflow-hidden">
<ResponsiveContainer width="100%">
<BarChart data={filteredData2} margin={[0,0,0,0]} >
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey={yearOrMonth === "yearly" ? "year" : "month"} type="category" fontSize={13} />
  <YAxis type="number" fill="#000" width={30} fontSize={13} />
  <Tooltip />
  {mainChart === "chart2" &&
  <Legend verticalAlign='top' align='right' />
}
  <Bar dataKey="wos" barSize={15} radius={[4, 4, 0, 0]} fill="#008080"/>
  <Bar dataKey="scopus" barSize={15} radius={[4, 4, 0, 0]} fill="#007BFF" />
</BarChart>
</ResponsiveContainer>
</div>
</div>,
    chartsresearch:<div style={{height:"300px"}} className="p-2 pl-4">
                <h2 className="text-xl font-bold">Research Fields in {selectedYear||2025}</h2>
                <div className="h-full overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top:0, right: 0, bottom: 0, left: 0 }}>
                      <Pie
                        data={ResearchAreas["2025"]}
                        cx="45%"
                        cy="40%"
                        outerRadius={80}
                        innerRadius={50}
                        fill="#8884d8"
                        dataKey="value"
                        fontSize={12}
                      >
                        {ResearchAreas["2025"].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    <Tooltip />
                    <Legend
      align="right"
      verticalAlign="top"
      layout="vertical"
      iconType="circle"
      iconSize={12}
      wrapperStyle={{ fontSize: 12, paddingRight: 5 }}
      content={CustomLegendResearch}
    />       </PieChart>
                  </ResponsiveContainer>
                </div>
          </div>,
    chartscopus: <div style={{height:"200px"}} className="p-2">
                         <h2 className="text-xl font-bold mb-3">Scopus</h2>
                         <div className="h-full overflow-hidden">
                         <ResponsiveContainer width="100%" height="100%">
<LineChart data={WOS} margin={{ top: 0, right: 0, bottom: 20, left: 0 }}>
 <CartesianGrid strokeDasharray="3 3" />
 <XAxis dataKey="year" fontSize={11} />
 <YAxis width={25} fontSize={11} />
 <Tooltip />
 <Legend wrapperStyle={{fontSize:13}} verticalAlign='top' align='right'/>
 {/* //use different color (not used in scopus) for each line here */}
  <Line type="monotone" dataKey="citations" stroke="#FF8042" dot={false} strokeWidth={2} />
  <Line type="natural" dataKey="H-index" stroke="#FFCD00"  dot={false}   strokeWidth={2}/>
  <Line type="monotone" dataKey="AvgSNIP" stroke="#FF7300" dot={false} strokeWidth={2}/>
  <Line type="monotone" dataKey="HighestSNIP" stroke="#FF6D01" dot={false} strokeWidth={2}/>
</LineChart>
</ResponsiveContainer>
                </div>
              </div>,
    chartwos: <div style={{height:"200px"}} className="p-2">
    <h2 className="text-md font-medium">Web of Science</h2>
    <div className="h-full overflow-hidden">
<ResponsiveContainer width="100%" height="100%">
<LineChart data={WOS} margin={{ top: 10, right: 0, bottom: 10, left: 0 }}>
 <CartesianGrid strokeDasharray="3 3" />
 <XAxis dataKey="year" fontSize={11}/>
 <YAxis width={30}  fontSize={11}/>
 <Tooltip />
<Legend wrapperStyle={{fontSize:13}} verticalAlign='top' align='right'/>
 {/* //use different color (not used in scopus) for each line here */}
  <Line type="monotone" dataKey="citations" stroke="#FF8042"  strokeWidth={2} dot={false} />
  <Line type="monotone" dataKey="H-index" stroke="#FFCD00"  strokeWidth={2} dot={false}/>
  <Line type="monotone" dataKey="AvgSNIP" stroke="#FF7300"  strokeWidth={2} dot={false}/>
  <Line type="monotone" dataKey="HighestSNIP" stroke="#FF6D01"  strokeWidth={2}dot={false} />
</LineChart>
</ResponsiveContainer>
</div>
</div>,


chartquartiles: <div className="p-3" style={{height:"200px"}} >
<h2 className="text-lg font-medium">Quartiles - {selectedYear||2025}</h2>
<ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        layout="vertical"
        data={filteredDataQuartiles}
        margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" dataKey={"value"} fontSize={12}/>
        <YAxis dataKey="category" type="category" width={30} />
        <Tooltip />
        <Bar dataKey="value" barSize={16} fill="#8884d8">
          {[
            <Cell key="cell-0" fill="#3b82f6" radius={[0,4,4,0]} />,
            <Cell key="cell-1" fill="#60a5fa" radius={[0,4,4,0]} />,
            <Cell key="cell-2" fill="#22c55e" radius={[0,4,4,0]} />,
            <Cell key="cell-3" fill="#f97316" radius={[0,4,4,0]} />
          ]}
        </Bar>
      </ComposedChart>
    </ResponsiveContainer>
</div>,

chartpatents:
 <div className="p-4" style={{height:"210px"}}>
  <h2 className="text-md font-medium mb-2">Patents</h2>
 <div className="h-full overflow-hidden">
 <ResponsiveContainer width="100%" >
  <BarChart data={Patents} margin={{ top: 0, right: 0, bottom: 20, left: 0 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="year" type="category" fontSize={10}/>
    <YAxis dataKey="patent" type="number" fill="#000" width={30} fontSize={10}/>
    <Tooltip />
    {mainChart === "chart5" &&
    <Legend />
  }
    <Bar dataKey="patent" barSize={40} radius={[0, 4, 4, 0]} fill="purple" />
  </BarChart>
</ResponsiveContainer>
 </div>
</div>,
chartprojects:
<div className="p-4" style={{height:"210px"}}>
<h2 className="text-md font-medium mb-2">Projects</h2>
<div className="h-full overflow-hidden">
<ResponsiveContainer width="100%" >
<BarChart data={Patents} margin={{ top: 0, right: 0, bottom: 20, left: 0 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="year" type="category" fontSize={10}/>
  <YAxis dataKey="patent" type="number" fill="#000" width={30} fontSize={10}/>
  <Tooltip />
  {mainChart === "chart5" &&
  <Legend />
}
  <Bar dataKey="patent" barSize={40} radius={[0, 4, 4, 0]} fill="#CD853F" />
</BarChart>
</ResponsiveContainer>
</div>
</div>,

chartartcilebytype:
<div className="p-3" style={{height:"200px"}} >
  <h2 className="text-lg font-medium">Articles by Type</h2>
  <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top:20, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={ArticlesByType}
                cx="50%"
                cy="40%"
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                fontSize={12}
              >
                {ResearchAreas["2025"].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                ))}
              </Pie>
            <Tooltip />
            <Legend
      align="right"
      verticalAlign="top"
      layout="vertical"
      iconType="circle"
      iconSize={12}
      wrapperStyle={{ fontSize: 12, paddingRight: 5 }}
      content={CustomLegendResearch}
    /> 
            </PieChart>
          </ResponsiveContainer>
      </div>,

chartdocumentsbydept:
<div className="p-3" style={{height:"220px"}} >
      <h2 className="text-lg font-medium">Documents by Department</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={departmentData}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid stroke='#f5f5f5'/>
          <XAxis
            dataKey="department"
            tickLine={false}
            tick={false}
            textAnchor="end"
            interval={0}
          />
          <YAxis fontSize={12} width={35} />
          <Tooltip />
          <Bar dataKey="documents" fill="#2E5AAC" radius={[4,4,0,0]} label={({ x, y, width, height, index }) => (
              <CustomLabelDept
                x={x}
                y={y}
                width={width}
                height={height}
                department={departmentData[index].department}
              />
            )}>
            {departmentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#2E5AAC" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
</div>
  };


  const descriptions = {
    chartdocuments: 
<div className="flex flex-wrap gap-4 py-4 px-1 bg-white rounded-lg">
  <div className="p-3 bg-gray-100 rounded-md w-48 text-center">
    <h2 className="text-lg font-semibold text-gray-700">Yearly Rate</h2>
    <span className="text-sm text-gray-600">306 documents / year</span>
  </div>
  <div className="p-3 bg-gray-100 rounded-md w-48 text-center">
    <h2 className="text-lg font-semibold text-gray-700">Monthly Rate</h2>
    <span className="text-sm text-gray-600">26 documents / month</span>
  </div>
</div>
,
chartprojects: 
<div className="flex flex-wrap gap-4 py-4 px-1 bg-white rounded-lg">
  <div className="p-3 bg-gray-100 rounded-md w-48 text-center">
    <h2 className="text-lg font-semibold text-gray-700">Yearly Rate</h2>
    <span className="text-sm text-gray-600">306 documents / year</span>
  </div>
  <div className="p-3 bg-gray-100 rounded-md w-48 text-center">
    <h2 className="text-lg font-semibold text-gray-700">Monthly Rate</h2>
    <span className="text-sm text-gray-600">26 documents / month</span>
  </div>
</div>
,chartpatents: 
<div className="flex flex-wrap gap-4 py-4 px-1 bg-white rounded-lg">
  <div className="p-3 bg-gray-100 rounded-md w-48 text-center">
    <h2 className="text-lg font-semibold text-gray-700">Yearly Rate</h2>
    <span className="text-sm text-gray-600">306 documents / year</span>
  </div>
  <div className="p-3 bg-gray-100 rounded-md w-48 text-center">
    <h2 className="text-lg font-semibold text-gray-700">Monthly Rate</h2>
    <span className="text-sm text-gray-600">26 documents / month</span>
  </div>
</div>
,
chartwosvsscopus:     
<div className="flex flex-wrap gap-4 py-4 px-1 bg-white rounded-lg">
  <div className="p-3 bg-gray-100 rounded-md w-48 text-center">
    <h2 className="text-lg font-semibold text-gray-700">Web of Science</h2>
    <span className="text-sm text-gray-600">Total - 306 documents </span>
  </div>
  <div className="p-3 bg-gray-100 rounded-md w-48 text-center">
    <h2 className="text-lg font-semibold text-gray-700">Scopus</h2>
    <span className="text-sm text-gray-600">Total - 200 documents</span>
  </div>
</div>,

chartscopus:  <div className="flex flex-wrap gap-4 py-4 px-1 bg-white rounded-lg">
    <div className="p-3 bg-gray-100 rounded-md w-48 text-center">
      <h2 className="text-lg font-semibold text-gray-700">Web of Science</h2>
      <span className="text-sm text-gray-600">Total - 306 documents </span>
    </div>
    <div className="p-3 bg-gray-100 rounded-md w-48 text-center">
      <h2 className="text-lg font-semibold text-gray-700">Scopus</h2>
      <span className="text-sm text-gray-600">Total - 200 documents</span>
    </div>
  </div>,
chartsresearch:  <div className="flex flex-wrap gap-4 py-4 px-1 bg-white rounded-lg">
<div className="p-3 bg-gray-100 rounded-md w-48 text-center">
  <h2 className="text-lg font-semibold text-gray-700">Web of Science</h2>
  <span className="text-sm text-gray-600">Total - 306 documents </span>
</div>
<div className="p-3 bg-gray-100 rounded-md w-48 text-center">
  <h2 className="text-lg font-semibold text-gray-700">Scopus</h2>
  <span className="text-sm text-gray-600">Total - 200 documents</span>
</div>
</div>,
    chartwos:<div className="flex flex-wrap gap-4 py-4 px-1 bg-white rounded-lg">
    <div className="p-3 bg-gray-100 rounded-md w-48 text-center">
      <h2 className="text-lg font-semibold text-gray-700">Yearly Rate</h2>
      <span className="text-sm text-gray-600">306 documents / year</span>
    </div>
    <div className="p-3 bg-gray-100 rounded-md w-48 text-center">
      <h2 className="text-lg font-semibold text-gray-700">Monthly Rate</h2>
      <span className="text-sm text-gray-600">26 documents / month</span>
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
    </div>,

  chartquartiles:
  <div className="grid grid-cols-2 gap-2">
    <div className="grid grid-rows-2 gap-2">
    <div className="p-3 bg-gray-100 rounded-md  text-center">
    <h2 className="text-lg font-semibold text-gray-700">Q1</h2>
    <span className="text-sm text-gray-600">200 documents</span>
  </div>
  <div className="p-3 bg-gray-100 rounded-md text-center">
    <h2 className="text-lg font-semibold text-gray-700">Q2</h2>
    <span className="text-sm text-gray-600">200 documents</span>
  </div>
    </div>
    <div className="grid grid-rows-2 gap-2">
    <div className="p-3 bg-gray-100 rounded-md  text-center">
    <h2 className="text-lg font-semibold text-gray-700">Q3</h2>
    <span className="text-sm text-gray-600">200 documents</span>
  </div>
  <div className="p-3 bg-gray-100 rounded-md  text-center">
    <h2 className="text-lg font-semibold text-gray-700">Q4</h2>
    <span className="text-sm text-gray-600">200 documents</span>
  </div>
  </div>
</div>,
chartartcilebytype:<div className="flex flex-wrap gap-4 py-4 px-1 bg-white rounded-lg">
<div className="p-3 bg-gray-100 rounded-md w-48 text-center">
  <h2 className="text-lg font-semibold text-gray-700">Web of Science</h2>
  <span className="text-sm text-gray-600">Total - 306 documents </span>
</div>
<div className="p-3 bg-gray-100 rounded-md w-48 text-center">
  <h2 className="text-lg font-semibold text-gray-700">Scopus</h2>
  <span className="text-sm text-gray-600">Total - 200 documents</span>
</div>
</div>,
chartdocumentsbydept:<div className="flex flex-wrap gap-4 px-1 bg-white rounded-lg">
<div className="px-2 bg-gray-100 rounded-md w-48 text-center">
  <h2 className="text-lg font-semibold text-gray-700 mb-2">Departments</h2>
 <ul className='mb-2'>
  {departmentData.map((dept, index) => (
  <li className='flex justify-between items-center text-[11px]'><span>{dept.department}</span><span>{dept.documents}</span></li>
  ))}
  </ul>
</div>
</div>
  };


  return (
    <div className="bg-gray-100 px-1 font-sans" id={id}>

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl text-gray-600 font-medium">Dashboard</h1>
      </div>


        {/* Top row with engagement chart */}
      <div className=' grid grid-cols-2 gap-2 mb-2'>
        

        {/*Main chart View */}
        <div className='flex flex-col space-y-2 '>

        <div className="bg-white rounded-lg shadow-lg grid grid-cols-[2fr_1fr] gap-1">
  
          <motion.div
            key={mainChart}
            className="bg-white rounded"
            style={{minHeight:"200px" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">{charts[mainChart]}</AnimatePresence>
          </motion.div>
  
          <motion.div
          key={mainChart + "-desc"}
          className="bg-white rounded p-1"
          style={{ height: "fit-content" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          {descriptions[mainChart]}
        </motion.div>

        </div>
        <div className='grid grid-cols-[4fr_2fr] gap-2'>
  
        <div className="p-2 bg-white rounded-2xl shadow-md w-full">
      <h2 className="text-sm font-medium mb-2 px-2">Top 5 Documents in {selectedYear||2025} </h2>
      <div className="space-y-2">
        {articles.slice(0,5).map((article, index) => (
          <div key={index} className="px-4 py-2 border rounded-lg bg-gray-100">
            <h3 className="text-[11px] font-medium">{article.title}</h3>
          </div>
        ))}
      </div>
    </div>


  <div>
    {/* Patents */}
 
    <div className="bg-white p-2 mb-2 rounded-md shadow text-[12px] max-h-[140px] h-[140px] min-w-[20%] hover:scale-105 transition-transform duration-100" onClick={()=>{setMainChart("chartpatents")}}>

<div className='flex w-full justify-between'><h2 className="font-medium">Patents</h2><SquareArrowUpLeft className='cursor-pointer opacity-50' width={15} height={15}/></div>
<div className='py-3 h-full'>
<div className="h-full overflow-hidden">
 <ResponsiveContainer width="100%" >
  <BarChart data={Patents} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="year" type="category"  fontSize={10}/>
    <YAxis dataKey="patent" type="number" fill="#000" width={15} fontSize={10} />
    <Tooltip />
    <Bar dataKey="patent" barSize={40} radius={[0, 4, 4, 0]} fill="purple" />
  </BarChart>
</ResponsiveContainer>
 </div>
  </div>
  </div>


      {/* Projects */}

      <div className="bg-white p-2 mb-2 rounded-md shadow text-[12px] max-h-[140px] h-[140px] min-w-[20%] hover:scale-105 transition-transform duration-100" onClick={()=>{setMainChart("chartprojects")}}>

      <div className='flex w-full justify-between'><h2 className="font-medium">Projects</h2><SquareArrowUpLeft className='cursor-pointer opacity-50' width={15} height={15}/></div>
<div className='py-3 h-full'>
<div className="h-full overflow-hidden">
 <ResponsiveContainer width="100%" >
  <BarChart data={Patents} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="year" type="category"  fontSize={10}/>
    <YAxis dataKey="patent" type="number" fill="#000" width={15} fontSize={10} />
    <Tooltip />
    <Bar dataKey="patent" barSize={40} radius={[0, 4, 4, 0]} fill="#CD853F" />
  </BarChart>
</ResponsiveContainer>
 </div>
  </div>
  </div>


  </div>
  

        </div>
        </div>



{/* Main grid 2 */}
<div>
        <div className='grid grid-cols-3 gap-2 '>
        
        {/* Documents */}

  <div className="bg-white p-2 rounded-md shadow text-[12px] max-h-40 hover:scale-105 transition-transform duration-100" onClick={()=>{setMainChart("chartdocuments")}}>

  <div className='flex w-full justify-between'><h2 className="font-medium">Documents</h2><SquareArrowUpLeft className='cursor-pointer opacity-50' width={15} height={15}/></div>
<div className='py-3 h-full'>
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={filteredData1} margin={{ top: 0, right: 0, left: 0, bottom:0}}>
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <XAxis
        dataKey={yearOrMonth === "yearly" ? "year" : "month"}
        axisLine={false}
        tickLine={false}
        fontSize={8}
      />
      <YAxis
        domain={yDomain}
        axisLine={false}
        tickLine={false}
        fontSize={8}
        width={20}
      />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="value"
        stroke="purple"
        fill="purple"
        fillOpacity={0.3} // Adjust fill transparency
        strokeWidth={1}
      />
    </AreaChart>
  </ResponsiveContainer>
  </div>
  </div>

        
        {/* WOs vs Scopus */}

        <div className="bg-white p-2 rounded-md shadow text-[12px] max-h-40 hover:scale-105 transition-transform duration-100" onClick={()=>{setMainChart("chartwosvsscopus")}}>

        <div className='flex w-full justify-between'><h2 className="font-medium">WOS vs Scopus</h2><SquareArrowUpLeft className='cursor-pointer opacity-50' width={15} height={15}/></div>
<div className='py-3 h-full'>
<ResponsiveContainer width="100%">
<BarChart data={filteredData2} margin={[0,0,0,0]} >
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey={yearOrMonth === "yearly" ? "year" : "month"} type="category" fontSize={8} />
  <YAxis type="number" fill="#000" width={20} fontSize={8} />
  <Tooltip />
  {mainChart === "chart2" &&
  <Legend verticalAlign='top' align='right' />
}
  <Bar dataKey="wos" barSize={15} radius={[2, 2, 0, 0]} fill="#008080"/>
  <Bar dataKey="scopus" barSize={15} radius={[2, 2, 0, 0]} fill="#007BFF" />
</BarChart>
</ResponsiveContainer>
  </div>
  </div>
  
        {/* Quartiles */}

        <div className="bg-white p-2 rounded-md shadow text-[12px] max-h-40 hover:scale-105 transition-transform duration-100" onClick={()=>{setMainChart("chartquartiles")}}>
        <div className='flex w-full justify-between'><h2 className="font-medium">Quartiles - {selectedYear||2025}</h2><SquareArrowUpLeft className='cursor-pointer opacity-50' width={15} height={15}/></div>
        <div className='py-3 h-full'>
        <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        layout="vertical"
        data={filteredDataQuartiles}
        margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" dataKey={"value"} fontSize={10}/>
        <YAxis dataKey="category" type="category" width={30} fontSize={10} />
        <Tooltip />
        <Bar dataKey="value" barSize={16} fill="#8884d8">
          {[
            <Cell key="cell-0" fill="#3b82f6" radius={[0,2,2,0]} />,
            <Cell key="cell-1" fill="#60a5fa" radius={[0,2,2,0]} />,
            <Cell key="cell-2" fill="#22c55e" radius={[0,2,2,0]} />,
            <Cell key="cell-3" fill="#f97316" radius={[0,2,2,0]} />
          ]}
        </Bar>
      </ComposedChart>
    </ResponsiveContainer>
    </div>
    </div>

        {/* Research Fields*/}

        <div className="bg-white p-2 rounded-md shadow max-h-40 text-[12px] hover:scale-105 transition-transform duration-100" onClick={()=>{setMainChart("chartsresearch")}}>

        <div className='flex w-full justify-between'><h2 className="font-medium">Research Fields in {selectedYear||2025}</h2><SquareArrowUpLeft className='cursor-pointer opacity-50' width={15} height={15}/></div>
        <div className='py-3 h-full'>
  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top:10, right: 0, bottom: 0, left: 0 }}>
                      <Pie
                        data={ResearchAreas["2025"]}
                        cx="50%"
                        cy="40%"
                        outerRadius={50}
                        innerRadius={30}
                        fill="#8884d8"
                        dataKey="value"
                        fontSize={12}
                      >
                        {ResearchAreas["2025"].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
  </div>
       </div>


{/* Documents by Department */}
<div className="bg-white p-2 rounded-md shadow max-h-40 text-[12px] hover:scale-105 transition-transform duration-100" onClick={()=>{setMainChart("chartdocumentsbydept")}}>

<div className='flex w-full justify-between'><h2 className="font-medium">Documents by Department</h2><SquareArrowUpLeft className='cursor-pointer opacity-50' width={15} height={15}/></div>
<div className='py-2 h-full'>
<ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={departmentData}
          margin={{ top:0, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke='#f5f5f5'/>
          <XAxis
            dataKey="department"
            tickLine={false}
            tick={false}
            textAnchor="end"
            interval={0}
          />
          <YAxis fontSize={10} width={25} />
          <Tooltip />
          <Bar dataKey="documents" fill="#2E5AAC" radius={[2,2,0,0]}>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
</div>
</div>


  {/* Articles By Type */}
 <div className="bg-white p-2 rounded-md shadow max-h-40 text-[12px] hover:scale-105 transition-transform duration-100" onClick={()=>{setMainChart("chartartcilebytype")}}>
 <div className='flex w-full justify-between'><h2 className="font-medium">Articles By Type {selectedYear||2025}</h2><SquareArrowUpLeft className='cursor-pointer opacity-50' width={15} height={15}/></div>
<div className='py-3 h-full'>
<ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top:10, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={ArticlesByType}
                cx="50%"
                cy="40%"
                outerRadius={50}
                fill="#8884d8"
                dataKey="value"
                fontSize={12}
              >
                {ResearchAreas["2025"].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                ))}
              </Pie>
            <Tooltip />
            </PieChart>
          </ResponsiveContainer>
</div>
</div>


      </div>



<div className='grid grid-cols-[4fr_2fr] mt-3 gap-3'>
  {/* Range fixer */}
  <div className='flex justify-between'>
  <div className="flex items-center gap-3 shadow-md rounded-lg overflow-hidden min-w-[65%] max-h-24 bg-white border border-purple-100" style={{width:"100%"}}>
  {/* Selection Box */}
  <div className="bg-white flex-col text-center h-full">
    <div 
      className={`cursor-pointer h-1/2 p-3 text-sm ${yearOrMonth === 'yearly' ? 'bg-blue-500 font-bold text-white' : 'hover:bg-gray-200'}`}
      onClick={() => {setYearOrMonth('yearly');setSelectedYear(null)}}
    >
      Yearly
    </div>
    <div 
      className={`cursor-pointer h-1/2 p-3 text-sm  ${yearOrMonth === 'monthly' ? 'bg-blue-500 font-bold text-white' : 'hover:bg-gray-200'}`}
      onClick={() => {setYearOrMonth('monthly');setSelectedYear(2025)}}
    >
      Monthly
    </div>
  </div>
  {yearOrMonth === 'yearly' ? <YearRangeSelector setOutRange={setRange} /> : <YearSelector setSelectedYear={setSelectedYear} />}
</div>

 </div>
  
   {/* Web of Science */}

  <div className="bg-white p-2 rounded-md shadow text-[12px] max-h-40 hover:scale-105 transition-transform duration-100" onClick={()=>{setMainChart("chartwos")}}>
  <div className='flex w-full justify-between'><h2 className="font-medium">Web of Science</h2><SquareArrowUpLeft className='cursor-pointer opacity-50' width={15} height={15}/></div>
          <div className='py-3 h-full'>
          <ResponsiveContainer width="100%" height="100%">
<LineChart data={WOS} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
 <CartesianGrid strokeDasharray="3 3" />
 <XAxis dataKey="year" fontSize={10} />
 <YAxis width={20} fontSize={10} />
 <Tooltip />
 {/* //use different color (not used in scopus) for each line here */}
  <Line type="monotone" dataKey="citations" stroke="#FF8042" dot={false} strokeWidth={2} />
  <Line type="monotone" dataKey="H-index" stroke="#FFCD00" dot={false} strokeWidth={2} />
  <Line type="monotone" dataKey="AvgSNIP" stroke="#FF7300" dot={false} strokeWidth={2} />
  <Line type="monotone" dataKey="HighestSNIP" stroke="#FF6D01" dot={false} strokeWidth={2} />
</LineChart>
</ResponsiveContainer>
            </div>
    </div>

 </div>
      </div>

        </div>
    </div>
  );
};




{/* <ResponsiveContainer width="100%" height="100%">
<BarChart
  data={spendByChannelData}
  margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
>
  <CartesianGrid strokeDasharray="3 3" vertical={false} />
  <XAxis dataKey="quarter" hide />
  <YAxis hide />
  <Tooltip />
  <Bar dataKey="social" stackId="a" fill="#3b82f6" />
  <Bar dataKey="email" stackId="a" fill="#22c55e" />
  <Bar dataKey="search" stackId="a" fill="#f97316" />
  <Bar dataKey="display" stackId="a" fill="#eab308" />
</BarChart>
</ResponsiveContainer> */}

export default OverAllDashboard;