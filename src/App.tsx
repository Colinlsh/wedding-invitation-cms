import React from "react";
import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Page404 from "./components/Page404";
import Dashboard from "./components/Dashboard";
import CountryBoard from "./components/CountryBoard";

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/:slug" element={<CountryBoard />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
