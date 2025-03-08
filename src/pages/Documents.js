import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart, 
  Pie, 
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import AuthorDetails from '../components/Authors/AuthorDetails';
import { journaltrends} from '../sampledata';
import ArticlesList from '../components/Articles/ArticleList';
import Dashboard from '../components/Authors/testComp';
import ArticleMetrics from '../components/Articles/ArticlesMetrics';

// Custom SVG Icons
const ChartLineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C6.375 20.496 5.871 21 5.25 21h-2.25A1.125 1.125 0 0 1 2 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const ChartBarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C6.375 20.496 5.871 21 5.25 21h-2.25A1.125 1.125 0 0 1 2 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const ChartPieIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12m-3.75-3H5.625c-.621 0-1.125-.504-1.125-1.125V11.25c0-4.46 3.69-8.25 8.25-8.25h1.5c4.572 0 8.25 3.694 8.25 8.25v4.5c0 .621-.504 1.125-1.125 1.125H5.625Z" />
  </svg>
);

const AcademicCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.186 3.424 48.62 48.62 0 0 0 .188 3.247c.252 3.06 2.74 5.487 5.793 5.748 2.83.237 5.584.29 8.425.15a48.571 48.571 0 0 0 8.426-.15c3.054-.261 5.541-2.688 5.793-5.748a60.44 60.44 0 0 0 .188-3.247c0-1.142-.035-2.281-.188-3.424a6.006 6.006 0 0 0-5.792-5.748 47.969 47.969 0 0 0-8.425-.15c-2.83.237-5.584.29-8.426.15-3.054-.261-5.541-2.688-5.793-5.748A60.54 60.54 0 0 0 1.25 5.9v.1zm-1.264 3.324a.75.75 0 0 1-.263-.535l.004-.798c.004-.592.009-1.076.016-1.044.024.117.108.25.29.368a4.25 4.25 0 0 0 1.777.645 44.41 44.41 0 0 0 8.166.242 44.505 44.505 0 0 0 8.168-.242 4.265 4.265 0 0 0 1.776-.645c.182-.118.266-.25.29-.368.007-.032.012.452.016 1.044l.004.798a.75.75 0 0 1-.263.535 4.765 4.765 0 0 1-1.576.797c-1.601.523-3.268.786-4.958.804a44.714 44.714 0 0 1-5.072-.183 4.767 4.767 0 0 1-1.622-.597zm1.262-2.784A.768.768 0 0 1 4 10.607V9.523a.768.768 0 0 1 .512-.728 6.676 6.676 0 0 1 3.578-.202c1.205.24 2.36.684 3.33 1.258.284.18.465.383.465.6v1.066c0 .22-.181.423-.465.6a6.81 6.81 0 0 1-3.33 1.258 6.556 6.556 0 0 1-3.578-.202.768.768 0 0 1-.512-.728v-1.084zm13.246 3.817a.768.768 0 0 1-.512-.728V9.523a.768.768 0 0 1 .512-.728 6.676 6.676 0 0 1 3.578-.202c1.205.24 2.36.684 3.33 1.258.284.18.465.383.465.6v1.066c0 .22-.181.423-.465.6a6.81 6.81 0 0 1-3.33 1.258 6.556 6.556 0 0 1-3.578-.202z" />
  </svg>
);

const DocumentTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12m-3.75-3H5.625c-.621 0-1.125-.504-1.125-1.125V11.25c0-4.46 3.69-8.25 8.25-8.25h1.5c4.572 0 8.25 3.694 8.25 8.25v4.5c0 .621-.504 1.125-1.125 1.125H5.625Z" />
  </svg>
);

const Documents = () => {
  const [tab, setTab] = useState("documents");
  const [fields, setFields] = useState(["line", "pie"]);
  const curyear = new Date().getFullYear();
  const baseyr = 2015;
  const [yearRange, setYearRange] = useState([baseyr, curyear]);

  const author = {
    name: "Sarah J. Thompson",
    title: "Professor of Computer Science",
    institution: "Stanford University",
    department: "Department of Computer Science",
    email: "s.thompson@stanford.edu",
    website: "www.stanford.edu/~sthompson",
    expertise: [
      "Machine Learning",
      "Climate Change",
      "Artificial Intelligence",
      "Data Science",
      "Environmental Modeling"
    ],
    metrics: {
      hIndex: 32,
      citations: 4875,
      documentCount: 87,
      types: [
        {type:"journal", documents:45},
        {type:"conference", documents: 25}
      ],
      yearlyStats: [
        { year: 2019, citations: 450, publications: 8 },
        { year: 2020, citations: 680, publications: 12 },
        { year: 2021, citations: 890, publications: 10 },
        { year: 2022, citations: 1200, publications: 15 },
        { year: 2023, citations: 1655, publications: 18 }
      ],
      subjectWiseDocs: [
        { subject: "Machine Learning", documents: 25 },
        { subject: "Climate Change", documents: 18 },
        { subject: "Artificial Intelligence", documents: 20 },
        { subject: "Data Science", documents: 15 },
        { subject: "Environmental Modeling", documents: 9 }
      ]
    }
  };

  const COLORS = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)'
  ];

  const changeChart = (index, chart) => {
    let newfields = [...fields];
    newfields[index] = chart;
    setFields(newfields);
  };

  const filteredYearlyStats = author.metrics.yearlyStats.filter(stat => 
    stat.year >= yearRange[0] && stat.year <= yearRange[1]
  );













  

  return (
    <div className="container mx-auto px-4 py-4 ">
              {/* Metrics */}
        <div className='grid grid-cols-[5fr_2fr] gap-4'>

<div>
<div>
          <div className="grid grid-cols-4 gap-4">

            <div className="flex flex-row gap-2 items-center bg-white shadow-md rounded justify-start p-2 h-20">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h5 className="text-2xl font-bold text-gray-800">{author.metrics.hIndex}</h5>
              <p className="text-md text-gray-600">Projects</p>
            </div>


            
            <div className="flex flex-row gap-2 items-center bg-white shadow-md rounded justify-start p-2 h-20">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h5 className="text-2xl font-bold text-gray-800">{author.metrics.hIndex}</h5>
              <p className="text-md text-gray-600">Projects</p>
            </div>

            <div className="flex flex-row gap-2 items-center bg-white shadow-md rounded justify-start p-2 h-20">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h5 className="text-2xl font-bold text-gray-800">{author.metrics.hIndex}</h5>
              <p className="text-md text-gray-600">Projects</p>
            </div>

            <div className="flex flex-row gap-2 items-center bg-white shadow-md rounded justify-start p-2 h-20">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h5 className="text-2xl font-bold text-gray-800">{author.metrics.hIndex}</h5>
              <p className="text-md text-gray-600">Projects</p>
            </div>
          </div>

</div>

<ArticlesList />
</div>
<ArticleMetrics />

</div>

      </div>

    );
}


export default Documents;
