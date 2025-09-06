import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/index";
import bookCover from "../assets/books/book-cover.png";
import { ThemeContext } from "../context/ThemeContext";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setLoading(true);
    const ref = doc(db, "books", id);

    getDoc(ref)
      .then((docSnap) => {
        if (docSnap.exists()) {
          let data = docSnap.data();

          // Convert categories string to array if needed
          if (typeof data.categories === "string") {
            data.categories = data.categories
              .replace(/^\[|\]$/g, "") // remove [ and ]
              .split(",")
              .map((cat) => cat.trim());
          }

          setBook({ id: docSnap.id, ...data });
        } else {
          setError("Book not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Firestore error:", err);
        setError("Failed to fetch book from database.");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
      Loading...</p>;

  if (error)
    return <p className="text-red-500">{error}</p>;

//   import { doc, deleteDoc } from "firebase/firestore";

// await deleteDoc(doc(db, "cities", "DC"));

const handleDelete = () => {
  console.log("Delete")
}

  return (
    <>
      {book && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column: Image */}
            <div className="flex justify-center">
              <div
                className={`w-full max-w-xs sm:max-w-sm md:max-w-md ${theme === "dark"
                  ? "bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900"
                  : "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100"
                  } rounded-lg shadow-md p-4 sm:p-6`}
              >
                <img
                  src={book.image || bookCover}
                  alt={book.title}
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="flex flex-col">
              <h3
                className={`font-bold text-xl sm:text-2xl lg:text-3xl mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
              >
                {book.title}
              </h3>
              <p
                className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"
                  } text-sm sm:text-base leading-relaxed`}
              >
                {book.description}
              </p>

              {/* Categories */}
              {book.categories && book.categories.length > 0 && (
                <div>
                                  <div className="flex flex-wrap gap-2 mt-4">
                  {book.categories.map((category) => (
                    <button
                      key={category}
                      className={`${theme === "dark"
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-200 text-gray-700"
                        } text-xs sm:text-sm font-medium px-3 py-1 rounded-full 
                        transition-all duration-300 ease-in-out 
                        hover:bg-sky-500 hover:text-white hover:shadow-md`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                </div>
              )}

              {/* Return to Home Button */}
              <button
                onClick={() => navigate("/")}
                className={`flex items-center gap-2 mt-4 px-4 py-2 ${theme === "dark" ? "bg-blue-700" : "bg-blue-500"
                  } text-white rounded shadow-md hover:bg-blue-600 transition-all w-fit`}
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
