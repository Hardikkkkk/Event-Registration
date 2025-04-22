import { useRef, useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Calendar } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef();

  // Get token dynamically so it updates with login/logout
  const access_token = localStorage.getItem("access_token");

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Handle outside click to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
      scrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm py-4"
    } z-50`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo with animation */}
        <div className="flex items-center space-x-2 group">
          <Calendar className="h-6 w-6 text-purple-600 transition-transform duration-300 group-hover:rotate-12" />
          <Link to={"/"} className="font-bold text-xl text-gray-800 relative">
            Event<span className="text-purple-600">Hub</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link 
            to="/allEvents" 
            className={`relative py-2 transition-colors duration-200 ${
              isActive('/allEvents') 
                ? 'text-purple-600 font-medium' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            All Events
            <span className={`absolute bottom-0 left-0 h-0.5 bg-purple-600 transition-all duration-300 ${
              isActive('/allEvents') ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </Link>
          
          {access_token && (
            <Link 
              to="/profile" 
              className={`relative py-2 transition-colors duration-200 ${
                isActive('/profile') 
                  ? 'text-purple-600 font-medium' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              My Profile
              <span className={`absolute bottom-0 left-0 h-0.5 bg-purple-600 transition-all duration-300 ${
                isActive('/profile') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          )}
        </div>

        {/* Auth Button (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {access_token ? (
            <button
              onClick={logout}
              className="px-5 py-2 text-sm font-medium bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/30 transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-3">
              <Link
                to="/login"
                className="px-5 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-full hover:bg-purple-50 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-sm font-medium bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/30 transform hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-600 hover:text-purple-600 focus:outline-none transition-transform duration-200 hover:scale-110 p-2" 
          onClick={toggleSidebar}
          aria-label="Open menu"
        >
          <FaBars className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      />

      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        ref={navRef}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            <span className="font-bold text-lg text-gray-800">Event<span className="text-purple-600">Hub</span></span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 focus:outline-none transition-transform duration-200 hover:rotate-90 p-1"
            aria-label="Close menu"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col p-5 space-y-1">
          <Link 
            to="/allEvents"
            className={`py-3 px-3 rounded-lg transition-all duration-200 ${
              isActive('/allEvents') 
                ? 'bg-purple-100 text-purple-700 font-medium' 
                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
            }`}
            onClick={toggleSidebar}
          >
            All Events
          </Link>
          
          {access_token && (
            <Link 
              to="/profile"
              className={`py-3 px-3 rounded-lg transition-all duration-200 ${
                isActive('/profile') 
                  ? 'bg-purple-100 text-purple-700 font-medium' 
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
              onClick={toggleSidebar}
            >
              My Profile
            </Link>
          )}

          <div className="pt-6">
            {access_token ? (
              <button
                onClick={logout}
                className="w-full px-4 py-3 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 hover:shadow-lg"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/login"
                  className="w-full px-4 py-3 text-sm font-medium text-purple-600 border border-purple-600 text-center rounded-lg hover:bg-purple-50 transition-all duration-200"
                  onClick={toggleSidebar}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="w-full px-4 py-3 text-sm font-medium bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-all duration-300 hover:shadow-lg"
                  onClick={toggleSidebar}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Social media links - Optional */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-6 text-gray-400">
          <a href="#" className="hover:text-purple-600 transition-colors duration-200">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
          <a href="#" className="hover:text-purple-600 transition-colors duration-200">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" className="hover:text-purple-600 transition-colors duration-200">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;