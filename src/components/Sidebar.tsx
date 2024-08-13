import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
 return (
 <div className="w-64 bg-white-800 text-customColor h-full border-solid border-black border-2" style={{width:'15vw'}}>
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