// import React, { useContext, useState, useEffect } from "react";
// import trashIcon from "../assets/trash.png";
// import bookCover from "../assets/books/book-cover.png";
// import { Link } from "react-router-dom";
// import { ThemeContext } from "../context/ThemeContext";
// import { db } from '../firebase/index';
// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

// export default function BookList() {
//   const searchTerm = null;
//   const [allBooks, setAllBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { theme } = useContext(ThemeContext);

//   useEffect(() => {
//     const booksCollection = collection(db, "books");
//     // console.log("Collection reference:", booksCollection);

//     getDocs(booksCollection)
//       .then(snapshot => {
//         // console.log("Snapshot size:", snapshot.size);
//         snapshot.docs.forEach(doc => {
//           // console.log("Document ID:", doc.id, "Data:", doc.data());
//         });

//         const booksList = snapshot.docs.map(doc => {
//           const data = doc.data();

//           // Convert categories string to array if needed
//           let categories = data.categories;
//           if (typeof categories === "string") {
//             categories = categories
//               .replace(/^\[|\]$/g, '') // remove [ and ]
//               .split(',')
//               .map(cat => cat.trim());
//           }

//           return { id: doc.id, ...data, categories };
//         });

//         // console.log("booksList array:", booksList);

//         setAllBooks(booksList);
//         setLoading(false);
//       })
//       .catch(err => {
//         // console.error("Firestore error:", err);
//         setError("Failed to fetch books from database.");
//         setLoading(false);
//       });
//   }, []);

//   // Filter books based on searchTerm
//   useEffect(() => {
//     if (!allBooks) return;

//     if (!searchTerm) {
//       setFilteredBooks(allBooks);
//       return;
//     }

//     const term = searchTerm.toLowerCase();
//     const filtered = allBooks.filter(book => {
//       if (book.title && book.title.toLowerCase().includes(term)) return true;
//       if (book.description && book.description.toLowerCase().includes(term)) return true;
//       if (book.categories && Array.isArray(book.categories)) {
//         return book.categories.some(category => category.toLowerCase().includes(term));
//       }
//       return false;
//     });

//     setFilteredBooks(filtered);
//   }, [allBooks, searchTerm]);

//   if (loading) return <p>Loading ...</p>;
//   if (error) return <p>{error}</p>;

//   const handleDelete = async (e, id) => {
//     e.preventDefault();
//     const ref = doc(db, 'books', id);
//     console.log(ref);
//     await deleteDoc(ref);
//     setAllBooks(prev => prev.filter(b => b.id !== id));

//   }

//   return (
//     <div className={`max-h-[400px] overflow-y-auto border rounded-lg shadow p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
//       {filteredBooks && filteredBooks.length > 0 ? (
//         <div className="container px-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
//             {filteredBooks.map((b) => (
//               <Link
//                 to={`/books/${b.id}`}
//                 key={b.id}
//                 className={`${theme === 'dark' ? 'bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900' : 'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100'} rounded-lg shadow-md flex p-4 items-center transform transition duration-300 ease-in-out hover:scale-105`}
//               >
//                 <div className="w-24 h-36 flex-shrink-0 mr-4 overflow-hidden rounded-l-lg">
//                   <img
//                     src={b.image || bookCover}
//                     alt={b.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className={`font-bold text-lg mb-2 text-left ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
//                     {b.title}
//                   </h3>
//                   <p className={`text-sm text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
//                     {b.description}
//                   </p>
//                   <div className="relative mt-2 justify-between ">
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {b.categories && b.categories.map(category => (
//                         <button
//                           key={category}
//                           className={`${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} text-xs font-medium px-3 py-1 rounded-full transition-all duration-300 ease-in-out hover:bg-sky-500 hover:text-white hover:shadow-md`}
//                         >
//                           {category}
//                         </button>
//                       ))}
//                     </div>

//                     {/* delete icon */}
//                     <div
//                       className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600"
//                       onClick={(e)=>{handleDelete(e, b.id)}}
//                     >
//                       <img src={trashIcon} alt="Delete" className="w-4 h-4" />
//                     </div>

//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p className="text-center py-4">No books found.</p>
//       )}
//     </div>
//   );
// }


import React, { useContext, useState, useEffect } from "react";
import trashIcon from "../assets/trash.png";
import bookCover from "../assets/books/book-cover.png";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { db } from "../firebase/index";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function BookList() {
  const searchTerm = null; // You can add search input later
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollection = collection(db, "books");
        const snapshot = await getDocs(booksCollection);

        const booksList = snapshot.docs.map(doc => {
          const data = doc.data();
          let categories = data.categories;
          if (typeof categories === "string") {
            categories = categories
              .replace(/^\[|\]$/g, "")
              .split(",")
              .map(cat => cat.trim());
          }
          return { id: doc.id, ...data, categories };
        });

        setAllBooks(booksList);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch books from database.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books
  useEffect(() => {
    if (!allBooks) return;
    if (!searchTerm) {
      setFilteredBooks(allBooks);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = allBooks.filter(book => {
      if (book.title?.toLowerCase().includes(term)) return true;
      if (book.description?.toLowerCase().includes(term)) return true;
      if (Array.isArray(book.categories)) {
        return book.categories.some(cat => cat.toLowerCase().includes(term));
      }
      return false;
    });

    setFilteredBooks(filtered);
  }, [allBooks, searchTerm]);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const ref = doc(db, "books", id);
    await deleteDoc(ref);
    setAllBooks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className={`max-h-[600px] overflow-y-auto border rounded-lg shadow p-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}>
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((b) => (
            <div
              key={b.id}
              className={`relative flex flex-col rounded-lg shadow-md overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 ${theme === "dark"
                ? "bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900"
                : "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100"
                }`}
            >
              {/* Book Link */}
              <Link to={`/books/${b.id}`} className="flex p-4 gap-4 flex-1">
                <div className="w-24 h-36 flex-shrink-0 overflow-hidden rounded">
                  <img
                    src={b.image || bookCover}
                    alt={b.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className={`font-bold text-lg mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {b.title}
                  </h3>
                  <p className={`text-sm flex-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {b.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {b.categories?.map(category => (
                      <span
                        key={category}
                        className={`text-xs font-medium px-3 py-1 rounded-full ${theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-700"
                          }`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>

              {/* Delete Button */}
              <button
                onClick={(e) => handleDelete(e, b.id)}
                className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors duration-200
                ${theme === 'dark'
                    ? 'bg-teal-500 hover:bg-blue-500'  // Dark mode colors
                    : 'bg-cyan-600 hover:bg-amber-100'  // Light mode colors
                  }`}
              >
                <img src={trashIcon} alt="Delete" className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-4">No books found.</p>
      )}
    </div>
  );
}

