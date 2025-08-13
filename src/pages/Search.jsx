import React from 'react';
import { useLocation } from 'react-router-dom';
import BookList from '../components/BookList';

export default function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('q');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      <BookList url={`http://localhost:3000/books?q=${query}`} />
    </div>
  );
}
