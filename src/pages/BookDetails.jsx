import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import bookImage from "../assets/books/book-cover.png";

export default function BookDetails() {
  let { id } = useParams();
  let {
    data: book,
    loading,
    error,
  } = useFetch(`http://localhost:3000/books/${id}`);

  const navigate = useNavigate();

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-gray-500">Loading...</p>}
      {book && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column: Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 rounded-lg shadow-md p-4 sm:p-6">
                <img
                  src={bookImage}
                  alt={book.title}
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="flex flex-col">
              <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-4">
                {book.title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {book.description}
              </p>

              {/* Categories */}
              {book.categories && book.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {book.categories.map((category) => (
                    <button
                      key={category}
                      className="bg-gray-200 text-gray-700 text-xs sm:text-sm font-medium px-3 py-1 rounded-full 
                        transition-all duration-300 ease-in-out 
                        hover:bg-sky-500 hover:text-white hover:shadow-md"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {/* Return to Home Button */}
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition-all w-fit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
                Return Home
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
