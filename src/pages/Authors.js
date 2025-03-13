import React from "react";
import AuthorsList from "../components/Authors/AuthorsList";
import { authors } from "../sampledata";

const Authors = ({id}) => {

    return (
    <div className="p-4 grid grid-cols-[9fr_2fr] gap-4" id={id}>
            <AuthorsList authors={authors} />
            <div>
                            <h2 className="text-xl font-semibold mb-4">Overall Metrics</h2>
                            <div className="grid grid-cols-1 gap-4">
                              <div className="bg-green-50 p-4 rounded-lg shadow-[0_0px_10px_rgba(0,0,0,0.2)]">
                                <h4 className="text-md font-medium text-green-800">Authors</h4>
                                <p className="text-2xl font-bold">500</p>
                                <p className="text-sm text-gray-600">Active and passive</p>
                              </div>
                              <div className="bg-blue-50 p-4 rounded-lg shadow-[0_0px_10px_rgba(1,1,1,0.2)]">
                                <h4 className="text-md font-medium text-blue-800">Patents</h4>
                                <p className="text-2xl font-bold">1020</p>
                                <span className="text-sm text-gray-600">Research and Invention</span>
                              </div>
                              <div className="bg-purple-50 p-4 rounded-lg shadow-[0_0px_10px_rgba(0,0,0,0.2)]">
                                <h4 className="text-md font-medium text-purple-800">Articles</h4>
                                <p className="text-2xl font-bold">3036</p>
                                <p className="text-sm text-gray-600">Top percentile</p>
                              </div>
                            </div>
                          </div>
    </div>
    );

}

export default Authors;