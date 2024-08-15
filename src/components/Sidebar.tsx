import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path: string) => {
    if (location.pathname !== path) {
      toggleSidebar();
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <button
        className="p-4 focus:outline-none md:hidden"
        onClick={toggleSidebar}
      >
        <svg
          className="w-8 h-8"
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
          />
        </svg>
      </button>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-slate-100 text-customColor border-r-2 border-black shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:shadow-none transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col items-center py-6">
          <h1 className="text-3xl font-bold mb-6">SideBar</h1>
          <nav className="w-full">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/contacts"
                  className="block text-lg font-medium text-center hover:underline py-2 px-4"
                  onClick={() => handleLinkClick("/contacts")}
                >
                  Contacts
                </Link>
              </li>
              <li>
                <Link
                  to="/charts-and-maps"
                  className="block text-lg font-medium text-center hover:underline py-2 px-4"
                  onClick={() => handleLinkClick("/charts-and-maps")}
                >
                  Charts and Maps
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
