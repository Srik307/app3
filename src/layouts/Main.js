import React from "react";
import { Routes, Route } from "react-router-dom";
import Overall from "../pages/Overall";
import Authors from "../pages/Authors";
import AuthorProfile from "../components/Authors/AuthorsView";
import ArticlesList from "../components/Articles/ArticleList";
import ArticleView from "../components/Articles/ArticlesView";
import Documents from "../pages/Documents";
import Patents from "../pages/Patents";
import Projects from "../pages/Projects";



const Main = ({setOpen}) => {

    return (
    <main className="p-4 h-screen">
    <Routes>
        <Route path="/" element={<></>} />
        <Route path="/overall" element={<Overall />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/author/:id" element={<AuthorProfile />} />
        <Route path="/papers/:id" element={<ArticleView />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/patents" element={<Patents setOpen={setOpen} />} />
        <Route path="/projects" element={<Projects/>} />
      </Routes>
    </main>
    );

};

export default Main;