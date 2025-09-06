import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaTimes,
  FaBars,
  FaPlus,
  FaUserCircle,
  FaHome,
  FaSun,
  FaMoon
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar({ searchTerm, handleSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  // Access the current theme and the toggle function from context
  const { theme, setTheme } = useContext(ThemeContext);

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(); // Toggle the theme via context
  };

  // Handle search form submission
  const onSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    
    if (searchValue.trim()) {
      handleSearch(searchValue);
      setIsSearchOpen(false);
      setIsMenuOpen(false);
      
      // Navigate to search page with the search term using React Router
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <>
      <nav className={`border border-b-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              onClick={closeMenu}
              className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} flex items-center gap-2`}
            >
              <FaHome className="text-2xl" />
              <span className="hidden sm:inline font-bold">Library</span>
            </Link>

            {/* Desktop Search */}
            <form
              onSubmit={onSearch}
              className={`hidden md:flex flex-grow max-w-sm items-center rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <input
                type="text"
                name="search"
                placeholder="Search books..."
                defaultValue={searchTerm}
                className={`px-4 py-2 w-full outline-none ${theme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800 placeholder-gray-500'}`}
              />
              <button
                type="submit"
                className={`px-4 py-2 ${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600'} text-white hover:bg-blue-700 transition-colors`}
              >
                <FaSearch />
              </button>
            </form>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  to="/create"
                  onClick={closeMenu}
                  className={`${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}
                >
                  <FaPlus className="text-lg" />
                </Link>
                <FaUserCircle className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} />

                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className={`${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} focus:outline-none`}
                >
                  {theme === "light" ? <FaMoon /> : <FaSun />}
                </button>
              </div>


              {/* Mobile Controls */}
              <div className="md:hidden flex items-center space-x-2">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  aria-label="Open search"
                  className={`${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} focus:outline-none`}
                >
                  <FaSearch />
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                  className={`${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} focus:outline-none`}
                >
                  {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className={`${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} focus:outline-none`}
                >
                  {theme === "light" ? <FaMoon /> : <FaSun />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-40" : "max-h-0"}`}
        >
          <div className="px-4 pb-4 space-y-2">
            <Link
              to="/create"
              onClick={closeMenu}
              className={`block ${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} py-2`}
            >
              <FaPlus className="inline mr-2" /> Create
            </Link>
            {/* Add more mobile links here */}
          </div>
        </div>
      </nav>

      {/* Mobile Search (Slide Down) */}
      <div
        className={`fixed top-0 left-0 w-full shadow-md z-40 transition-transform duration-300 ${isSearchOpen ? "translate-y-0" : "-translate-y-full"} ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className={`flex items-center justify-between px-4 py-3 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Search</h2>
          <button
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className={`${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}
          >
            <FaTimes />
          </button>
        </div>
        <form
          onSubmit={onSearch}
          className={`flex items-center rounded-full m-4 overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
        >
          <input
            type="text"
            name="search"
            placeholder="Search books..."
            defaultValue={searchTerm}
            className={`px-4 py-2 w-full outline-none ${theme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800 placeholder-gray-500'}`}
          />
          <button
            type="submit"
            className={`px-4 py-2 ${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600'} text-white hover:bg-blue-700 transition-colors`}
          >
            <FaSearch />
          </button>
        </form>
      </div>
    </>
  );
}
