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
        <Route path="/sg" element={<CountryBoard country="sg" />} />
        <Route path="/my" element={<CountryBoard country="my" />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
