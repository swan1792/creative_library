import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function HeroSection() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <section className={`${theme === 'dark' ? 'bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'} flex flex-col items-center justify-center gap-4 text-center px-4 sm:px-6 lg:px-8 h-40 sm:h-56 lg:h-72 my-8 mx-4 rounded-xl shadow-lg`}>
      <h3 className="text-white text-2xl sm:text-3xl lg:text-5xl font-bold drop-shadow-lg">
        Welcome to My Library
      </h3>
      <h3 className="text-white text-lg sm:text-xl lg:text-2xl italic drop-shadow">
        Book is the Gate of Knowledge Bank
      </h3>
    </section>
  );
}
