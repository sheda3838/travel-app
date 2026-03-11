import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="font-extrabold text-2xl text-primary tracking-tight">
            Travel<span className="text-gray-800">App</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary font-medium transition">Home</Link>

            {user ? (
              <>
                <Link to="/my-experiences" className="text-gray-600 hover:text-primary font-medium transition">My Experiences</Link>
                <Link to="/create" className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-lg font-medium transition shadow-sm">Create</Link>
                <button onClick={logout} className="text-gray-600 hover:text-red-500 font-medium transition">Logout</button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition">Login</Link>
                <Link to="/register" className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-lg font-medium transition shadow-sm">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2 shadow-lg w-full absolute left-0 right-0">
          <Link 
            to="/" 
            className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-md font-medium"
            onClick={toggleMenu}
          >
            Home
          </Link>

          {user ? (
            <>
              <Link 
                to="/my-experiences" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-md font-medium"
                onClick={toggleMenu}
              >
                My Experiences
              </Link>
              <Link 
                to="/create" 
                className="block px-3 py-2 text-primary font-bold hover:bg-gray-50 rounded-md"
                onClick={toggleMenu}
              >
                Create Experience
              </Link>
              <button 
                onClick={() => { logout(); toggleMenu(); }} 
                className="block w-full text-left px-3 py-2 text-red-500 hover:bg-red-50 rounded-md font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-md font-medium"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="block px-3 py-2 bg-primary text-white rounded-md font-medium text-center mt-4 shadow-sm"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
