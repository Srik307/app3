import React, { useEffect } from 'react'

const AuthorDetails = ({ author }) => {

  const links = [
    "Google Scholar",
    "Scopus",
    "Researcher ID",
    "Orcid ID",
    "Extract Profile",
  ];

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);
  
  


  return (
    <div className="p-2">
      <div className="grid grid-cols-[5fr_4fr] items-start gap-4">
        {/* Avatar */}
    
      <div >
        <div className='flex items-start gap-4'>

        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="purple" viewBox="0 0 24 24" stroke="purple">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{author.name}</h2>
          <p className="text-lg text-gray-600 mb-2">{author.title}</p>
          
          <div className="space-y-1 text-gray-700">
            <p className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {author.institution}, {author.department}
            </p>
            
            <p className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href={`mailto:${author.email}`} className="text-blue-600 hover:underline">{author.email}</a>
            </p>
            
            <p className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <a href={`https://${author.website}`} className="text-blue-600 hover:underline">{author.website}</a>
            </p>

            <p className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-gray-600">Joined on {author.joined}</span>
            </p>
          </div>
        </div>
        </div>
        <div className='mt-5'>
        <div className="flex flex-wrap gap-2 p-4">
      {links.map((link, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-md text-gray-700 ${
            link === "Extract Profile"
              ? "bg-purple-400"
              : "bg-white border border-purple hover:bg-purple-200"
          }`}
        >
          {link}
        </button>
      ))}
    </div>
        </div>





        </div>

        {/* Metrics */}
        <div>
        <div className="bg-gray-50 rounded-lg p-4 shadow-lg">


          <div className="grid grid-cols-4 gap-4">

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h5 className="text-xl font-bold text-gray-800">{author.metrics.hIndex}</h5>
              <p className="text-sm text-gray-600">Projects</p>
            </div>


            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.348.347a3.469 3.469 0 00-1 2.455V19a2 2 0 01-2 2h-1.586a1 1 0 01-.707-.293l-1.414-1.414a1 1 0 00-.707-.293H9a1 1 0 01-1-1v-1a1 1 0 00-1-1H6a2 2 0 01-2-2v-1.586a1 1 0 01.293-.707l.707-.707z" />
                </svg>
              </div>
              <h5 className="text-xl font-bold text-gray-800">{author.metrics.citations}</h5>
              <p className="text-sm text-gray-600">Total Publications</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h5 className="text-xl font-bold text-gray-800">{author.metrics.documentCount}</h5>
              <p className="text-sm text-gray-600">Books</p>
            </div>

            <div className="text-center bg-gray-100">
              <div className="flex items-center justify-center mb-2">
                <img className='w-8 h-8' src='/icons/patent.png' />
              </div>
              <h5 className="text-xl font-bold text-gray-800">{author.metrics.documentCount}</h5>
              <p className="text-sm text-gray-600">Patents</p>
            </div>
          </div>


          
    {/* Expertise */}
    <div className="p-1 mt-8">
        <h6 className="text-md mb-3">Topics worked on</h6>
        <div className="flex flex-wrap gap-2">
            {author.expertise.map((skill) => (
            <span
                key={skill}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {skill}
            </span>
            ))}
        </div>
    </div>
        </div>

</div>

</div>


    </div>
  )
}

export default AuthorDetails;