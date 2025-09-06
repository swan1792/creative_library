import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import BookList from "../components/BookList";
import { ThemeContext } from "../context/ThemeContext";


export default function Home() {
  const { searchTerm } = useOutletContext();
  const {theme} = useContext(ThemeContext);

  // const url = searchTerm
  //   ? `http://localhost:3000/books?q=${encodeURIComponent(searchTerm)}`
  //   : "http://localhost:3000/books";

  return (

    <div className={` ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <HeroSection />
      <BookList />
    </div>

  );
}
