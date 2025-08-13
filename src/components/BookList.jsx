import React from "react";
import bookCover from "../assets/books/book-cover.png";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function BookList({ url }) {
  let { data: books, loading, error } = useFetch(url);

  if (error) return <p>{error}</p>;

  return (
    <div className="max-h-[400px] overflow-y-auto border rounded-lg shadow p-4 bg-white">
      {loading && <p>Loading ...</p>}
      {books && (
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
            {books.map((b) => (
              <Link
                to={`/books/${b.id}`}
                key={b.id}
                className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 rounded-lg shadow-md flex p-4 items-center transform transition duration-300 ease-in-out hover:scale-105"
              >
                <div className="w-24 h-36 flex-shrink-0 mr-4 overflow-hidden rounded-l-lg">
                  <img
                    src={b.image || bookCover}
                    alt={b.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-left">
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-700 text-left">
                    {b.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Array.isArray(b.categories) &&
                      b.categories.map((category) => (
                        <button
                          key={category}
                          className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full transition-all duration-300 ease-in-out hover:bg-sky-500 hover:text-white hover:shadow-md"
                        >
                          {category}
                        </button>
                      ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
