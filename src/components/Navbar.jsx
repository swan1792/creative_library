import React, { useState } from "react";

import { Link } from "react-router-dom";
import {
  FaSearch,
  FaTimes,
  FaBars,
  FaPlus,
  FaUserCircle,
  FaHome,
} from "react-icons/fa";

export default function Navbar({ searchTerm, handleSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const onSearch = (e) => {
    e.preventDefault();
    handleSearch(e.target.elements.search.value);
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              onClick={closeMenu}
              className="text-blue-600 flex items-center gap-2"
            >
              <FaHome className="text-2xl" />
              <span className="hidden sm:inline font-bold">Library</span>
            </Link>

            {/* Desktop Search */}
            <form
              onSubmit={onSearch}
              className="hidden md:flex flex-grow max-w-sm items-center bg-gray-100 rounded-full overflow-hidden"
            >
              <input
                type="text"
                name="search"
                placeholder="Search books..."
                defaultValue={searchTerm}
                className="px-4 py-2 w-full outline-none bg-gray-100 placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
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
                  className="hover:text-blue-600"
                >
                  <FaPlus className="text-lg" />
                </Link>
                <FaUserCircle className="text-lg text-gray-700" />
              </div>

              {/* Mobile Controls */}
              <div className="md:hidden flex items-center space-x-2">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  aria-label="Open search"
                  className="text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  <FaSearch />
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                  className="text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-40" : "max-h-0"
          }`}
        >
          <div className="px-4 pb-4 space-y-2">
            <Link
              to="/create"
              onClick={closeMenu}
              className="block text-gray-700 hover:text-blue-600 py-2"
            >
              <FaPlus className="inline mr-2" /> Create
            </Link>
            {/* Add more mobile links here */}
          </div>
        </div>
      </nav>

      {/* Mobile Search (Slide Down) */}
      <div
        className={`fixed top-0 left-0 w-full bg-white shadow-md z-40 transition-transform duration-300 ${
          isSearchOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-bold">Search</h2>
          <button
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="text-gray-700 hover:text-blue-600"
          >
            <FaTimes />
          </button>
        </div>
        <form
          onSubmit={onSearch}
          className="flex items-center bg-gray-100 rounded-full m-4 overflow-hidden"
        >
          <input
            type="text"
            name="search"
            placeholder="Search books..."
            defaultValue={searchTerm}
            className="px-4 py-2 w-full outline-none bg-gray-100 placeholder-gray-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <FaSearch />
          </button>
        </form>
      </div>
    </>
  );
}
