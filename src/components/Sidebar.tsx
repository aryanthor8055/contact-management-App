import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
 return (
 <div className="w-64 bg-gray-800 text-white h-full">
 <nav className="mt-10 ml-2">
 <ul>
 <li className="mb-5">
 <Link
 to="/contacts"
 className="text-lg font-medium hover:underline"
 >
 Contacts
 </Link>
 </li>
 <li className="mb-2">
 <Link
 to="/charts-and-maps"
 className="text-lg font-medium hover:underline"
 >
 Charts and Maps
 </Link>
 </li>
 </ul>
 </nav>
 </div>
 );
};

export default Sidebar;