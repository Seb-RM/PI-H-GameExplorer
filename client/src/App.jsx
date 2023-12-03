/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import HomePage from "./components/HomePage.jsx";
import NotFound from "./components/NotFound";
import DetailPage from "./components/DetailPage/DetailPage.jsx";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route element={<NotFound />} />
    </Routes>
  );
}

export default App;
