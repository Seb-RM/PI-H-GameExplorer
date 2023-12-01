/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage.jsx";
// import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound"

function App() {
  return (
    <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        {/* <Route path="/home" component={HomePage} /> */}
        <Route element={<NotFound/>} />
    </Routes>
  );
}

export default App;
