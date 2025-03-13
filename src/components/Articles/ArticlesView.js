import React, { useEffect } from "react";

const ArticleView = ({id}) => {
  const paper = {
    title: "Slurry Erosion Resistance of Cold-Sprayed WC-17Co Coatings on CA6NM Steel Substrates: Experimental and Artificial Neural Network Modeling Analysis",
    authors: [
      { name: "Sarah J. Thompson", id: "0000-0002-1825-0097", dept: "Department of Mechanical Engineering, Chennai Institute of Technology", email: "ansm@gmail.com" },
      { name: "John Doe", id: "0000-0002-1825-0097", dept: "Department of Mechanical Engineering, Chennai Institute of Technology", email: "jdskm@gmail.com" },
      { name: "Jane Doe", id: "0000-0002-1825-0097", dept: "Department of Mechanical Engineering, Chennai Institute of Technology", email: "kjds@gmail.com" },
      { name: "John Smith", id: "0000-0002-1825-0097", dept: "Department of Mechanical Engineering, Chennai Institute of Technology", email: "kdjsnsskja@gmail.com" }
    ],
    institution: "Chennai Institute of Technology, Department of Mechanical Engineering",
    journal: "Nature Climate Change",
    year: "2024",
    doi: "10.1038/s41558-024-01234-5",
    citations: 127,
    downloads: 3420,
    abstract: "This systematic review examines the application of machine learning techniques in climate change research over the past decade. We analyze 500 peer-reviewed studies to identify emerging trends, challenges, and opportunities in utilizing AI for climate science. Our findings suggest a significant increase in deep learning applications for climate modeling, with particular emphasis on improving prediction accuracy and computational efficiency.",
    keywords: ["Machine Learning", "Climate Change", "Systematic Review", "Deep Learning", "Climate Modeling"],
    metrics: {
      fieldCitationRatio: 2.1,
      impactFactor: 4.8,
      hIndex: 12,
    },
  };



  useEffect(() => {
    const element = document.getElementById("articleview");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  

  return (
    <div className="container mx-auto p-4" id={id}>
      {/* Paper Title and Keywords */}
      <div className="mb-6">
        <h1 className="text-xl font-bold  mb-4">{paper.title}</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {paper.keywords.map((keyword) => (
            <span key={keyword} className="bg-purple-200  px-2 py-1 rounded-md text-sm">{keyword}</span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button className="bg-purple-900 text-white px-4 py-2 rounded-md flex items-center gap-2">Download PDF</button>
        <button className="border border-purple-300  px-4 py-2 rounded-md flex items-center gap-2">Save</button>
        <button className="border border-purple-300  px-4 py-2 rounded-md flex items-center gap-2">Share</button>
      </div>

      {/* Authors */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        {paper.authors.map((author) => (
          <div key={author.id} className="">
            <span className="text-md font-medium">{author.name}</span> - <span className="text-sm">{author.dept}</span> (<a href={`mailto:${author.email}`} className="text-purple-500 text-sm">{author.email}</a>)
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-md p-4 text-center rounded-lg">
          <p className="text-lg font-semibold text-purple-900">{paper.citations}</p>
          <p className="text-purple-500 text-lg font-bold">Citations</p>
        </div>
        <div className="bg-white shadow-md p-4 text-center rounded-lg">
          <p className="text-lg font-semibold text-purple-900">{paper.downloads}</p>
          <p className="text-purple-500 text-lg font-bold">Downloads</p>
        </div>
        <div className="bg-white shadow-md p-4 text-center rounded-lg">
          <p className="text-lg font-semibold text-purple-900">{paper.metrics.fieldCitationRatio}</p>
          <p className="text-purple-500 text-lg font-bold">Field Citation Ratio</p>
        </div>
      </div>

      {/* Abstract */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Abstract</h2>
        <p>{paper.abstract}</p>
      </div>

      {/* Publication Information */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-purple-900 mb-2">Publication Information</h2>
        <ul className="">
          <li className="flex justify-between border-b py-2"><span>Journal:</span><span>{paper.journal}</span></li>
          <li className="flex justify-between border-b py-2"><span>Year:</span><span>{paper.year}</span></li>
          <li className="flex justify-between border-b py-2"><span>DOI:</span><a href={`https://doi.org/${paper.doi}`} className="text-purple-500">{paper.doi}</a></li>
          <li className="flex justify-between border-b py-2"><span>Impact Factor:</span><span>{paper.metrics.impactFactor}</span></li>
          <li className="flex justify-between py-2"><span>h-index:</span><span>{paper.metrics.hIndex}</span></li>
        </ul>
      </div>
    </div>
  );
};

export default ArticleView;
