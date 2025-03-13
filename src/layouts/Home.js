import React from "react";
import { Routes, Route } from "react-router-dom";
import Authors from "../pages/Authors";
import AuthorProfile from "../components/Authors/AuthorsView";
import ArticlesList from "../components/Articles/ArticleList";
import ArticleView from "../components/Articles/ArticlesView";
import Documents from "../pages/Documents";
import Patents from "../pages/Patents";
import Projects from "../pages/Projects";
import OverAllDashboard from "../pages/Overall";



const Home = ({setOpen}) => {

    return (
    <div>
      <OverAllDashboard id={"dashboard"} />
      <Authors id={"authors"} />
      <Documents id={"documents"} />
      <Patents setOpen={setOpen} id={"patents"} />
      <Projects id={"projects"} /> 
    </div>
    );

};

export default Home;