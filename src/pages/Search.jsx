import React, { useContext, useEffect } from 'react';
import { useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import BookList from '../components/BookList';
import { ThemeContext } from '../context/ThemeContext';

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const query = params.get('q');
  const { searchTerm } = useOutletContext();
  const { theme } = useContext(ThemeContext);
  
  // Use query from URL if available, otherwise use searchTerm from context
  const searchQuery = query || searchTerm;
  
  // If no search query is available, redirect to home
  useEffect(() => {
    if (!searchQuery) {
      navigate('/');
    }
  }, [searchQuery, navigate]);

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} p-4`}>
      {searchQuery ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h1>
          <BookList url={`http://localhost:3000/books?q=${encodeURIComponent(searchQuery)}`} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
