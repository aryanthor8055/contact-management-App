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
 <div className="flex h-screen">
 <div className="flex">
 <Sidebar />
 <main className="p-4">
 <Routes>
 <Route path="/contacts" element={<ContactPage />} />
 <Route path="/charts-and-maps" element={<ChartsAndMaps />} />
 <Route path="/" element={<ContactPage />} />
 </Routes>
 </main>
 </div>
 </div>
 </Router>
 );
};

export default App;