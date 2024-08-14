import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:flex">
      {/* Hamburger Menu Button */}
      <button
        className="md:hidden p-4 focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`w-56 bg-slate-100 text-customColor border-r-2 border-black flex flex-col items-center py-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h1 className="text-3xl mb-6">SideBar</h1>
        <nav className="w-full">
          <ul className="space-y-4">
            <li className="text-center">
              <Link
                to="/contacts"
                className="text-xl font-medium hover:underline"
              >
                Contacts
              </Link>
            </li>
            <li className="text-center">
              <Link
                to="/charts-and-maps"
                className="text-xl font-medium hover:underline"
              >
                Charts and Maps
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
