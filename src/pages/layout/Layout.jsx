import React, { useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles.css';
import Navbar from "../../components/Navbar"

export default function Layout() {
  const location = useLocation();
  const nodeRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const hideNavBar = location.pathname.startsWith("/books/");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
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
