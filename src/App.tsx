import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ContactPage from "./pages/ContactPage";
import ChartsAndMaps from "./pages/ChartsandMaps";
import "leaflet/dist/leaflet.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen bg-slate-100">
        <Sidebar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/charts-and-maps" element={<ChartsAndMaps />} />
            <Route path="/" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
