import React,{useState} from "react";
import logoImage from "../assets/logo.svg";
const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
      <img src={logoImage} alt="Logo" className="w-8 h-8 cursor-pointer" />
      <div className="ml-10">
        <button className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700">
          Team
        </button>
        <button className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700">
          Add User
        </button>
      </div>
      <div className="ml-auto relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer"
        >
          <img
            src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
            alt=""
          />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md">
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white">
              Profile
            </button>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
