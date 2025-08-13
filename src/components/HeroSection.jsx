import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 flex flex-col items-center justify-center gap-4 text-center px-4 sm:px-6 lg:px-8 h-40 sm:h-56 lg:h-72 my-8 mx-4 rounded-xl shadow-lg">
      <h1 className="text-white text-2xl sm:text-3xl lg:text-5xl font-bold drop-shadow-lg">
        Welcome to My Library
      </h1>
      <h2 className="text-white text-lg sm:text-xl lg:text-2xl italic drop-shadow">
        Book is the Gate of Knowledge Bank
      </h2>
    </section>
  );
}
