import React from "react";
import { useOutletContext } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import BookList from "../components/BookList";

export default function Home() {
  const { searchTerm } = useOutletContext();

  const url = searchTerm
    ? `http://localhost:3000/books?q=${encodeURIComponent(searchTerm)}`
    : "http://localhost:3000/books";

  return (
    <>
      <HeroSection />
      <BookList url={url} />
    </>
  );
}
