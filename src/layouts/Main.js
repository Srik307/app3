import React from "react";
import { Routes, Route } from "react-router-dom";
import Authors from "../pages/Authors";
import AuthorProfile from "../components/Authors/AuthorsView";
import ArticlesList from "../components/Articles/ArticleList";
import ArticleView from "../components/Articles/ArticlesView";
import Documents from "../pages/Documents";
import Patents from "../pages/Patents";
import Projects from "../pages/Projects";
import Home from "./Home";



const Main = ({setOpen}) => {

    return (
    <main className="p-4 h-screen">
     <Routes>
        <Route path="/" element={<></>} />
        <Route path="/home" element={<Home setOpen={setOpen} />} />
        <Route path="/author/:id" element={<AuthorProfile id={"profile"} setOpen={setOpen} />} />
        <Route path="/papers/:id" element={<ArticleView id={"articleview"}/>} />
      </Routes> 
    </main>
    );

};

export default Main;