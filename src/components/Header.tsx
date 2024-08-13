import React from "react";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
 const location = useLocation();
 const getTitle = () => {
 switch (location.pathname) {
 case "/contacts":
 return "Contact Page";
 case "/charts-and-maps":
 return "Charts and Maps";
 default:
 return "Contacts";
 }
 };

 return (
 <header className="py-6 border-b-2 border-gray-200">
 <h1 className="text-2xl text-center">{getTitle()}</h1>
 </header>
 );
};

export default Header;