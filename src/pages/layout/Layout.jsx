import React, { useRef, useState, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles.css';
import Navbar from '../../components/Navbar';
import { ThemeContext } from '../../context/ThemeContext';

export default function Layout() {
  const location = useLocation();
  const nodeRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Access theme and toggle function from context
  const { theme } = useContext(ThemeContext);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const hideNavBar = location.pathname.startsWith("/books/");

  return (
    <div className={`flex flex-col min-h-screen font-sans text-gray-800 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Conditionally hide Navbar */}
      {!hideNavBar && <Navbar searchTerm={searchTerm} handleSearch={handleSearch} />}

      <TransitionGroup className="flex-grow">
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={500}
          nodeRef={nodeRef}
        >
          <div ref={nodeRef} className="absolute w-full h-full top-0 left-0">
            <Outlet context={{ searchTerm }} />
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

