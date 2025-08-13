// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useFetch from "../hooks/useFetch";

// export default function Create() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [newCategory, setNewCategory] = useState("");
//   const [categories, setCategories] = useState([]);

//   let { setPostData , data: book } = useFetch(
//     "http://localhost:3000/books",
//     "POST"
//   );
//   const addCategory = () => {
//     if (!newCategory.trim()) return; // prevent empty
//     setCategories((prev) => [newCategory.trim(), ...prev]);
//     setNewCategory("");
//   };

//   const removeCategory = (cat) => {
//     setCategories((prev) => prev.filter((c) => c !== cat));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let data = { title, description, categories };
//     console.log(data);
//     setPostData(data);
//     // console.log({ title, description, categories });
//     // Your book creation logic here...
//   };

//   const navigate = useNavigate();

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-lg mx-auto mt-20 p-4 sm:p-6 bg-white shadow rounded-lg"
//     >
//       {/* Book Title */}
//       <div className="mb-6">
//         <label
//           htmlFor="book-title"
//           className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//         >
//           Book Title
//         </label>
//         <input
//           id="book-title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           type="text"
//           placeholder="Book Title"
//           className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//         />
//       </div>

//       {/* Book Description */}
//       <div className="mb-6">
//         <label
//           htmlFor="book-description"
//           className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//         >
//           Book Description
//         </label>
//         <textarea
//           id="book-description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Book Description"
//           className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
//           rows="4"
//         />
//         <p className="text-gray-600 text-xs italic mt-1">
//           Make it as long and as creative as you’d like.
//         </p>
//       </div>

//       {/* Categories */}
//       <div className="mb-6">
//         <label
//           htmlFor="book-category"
//           className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//         >
//           Categories
//         </label>
//         <div className="flex flex-col sm:flex-row gap-2">
//           <input
//             id="book-category"
//             value={newCategory}
//             onChange={(e) => setNewCategory(e.target.value)}
//             type="text"
//             placeholder="Book Category"
//             className="flex-1 bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//           />
//           <button
//             type="button"
//             onClick={addCategory}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-center"
//           >
//             +
//           </button>
//         </div>
//         {/* Category List */}
//         <div className="flex flex-wrap mt-3">
//           {categories.map((c) => (
//             <span
//               key={c}
//               className="flex items-center mx-1 my-1 text-white bg-blue-600 rounded-full px-3 py-1 text-sm"
//             >
//               {c}
//               <button
//                 type="button"
//                 onClick={() => removeCategory(c)}
//                 className="ml-2 text-white hover:text-red-200"
//               >
//                 ✕
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Create Book Button */}
//       <button
//         type="submit"
//         className="w-full text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg flex justify-center items-center gap-2 transition-colors"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-6 h-6"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//           />
//         </svg>
//         <span>Create Book</span>
//       </button>
//       {/* Return to Home Button */}
//       <button
//         onClick={() => navigate("/")}
//         className="flex items-center gap-2 mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition-all w-fit"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-5 h-5"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
//           />
//         </svg>
//         Return Home
//       </button>
//     </form>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    setPostData,
    data: book,
    loading,
    error,
  } = useFetch("http://localhost:3000/books", "POST");

  const addCategory = () => {
    if (!newCategory.trim()) return; // prevent empty
    setCategories((prev) => [newCategory.trim(), ...prev]);
    setNewCategory("");
  };

  const removeCategory = (cat) => {
    setCategories((prev) => prev.filter((c) => c !== cat));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      title: title.trim(),
      description: description.trim(),
      categories,
    };
    setPostData(data);
  };

  useEffect(() => {
    if (book && !loading && !error) {
      setShowSuccess(true);
      // Hide success message after 3 seconds
      const timer = setTimeout(() => setShowSuccess(false), 3000);

      // Optional: reset form inputs
      setTitle("");
      setDescription("");
      setCategories([]);

      return () => clearTimeout(timer);
    }
  }, [book, loading, error]);

  const navigate = useNavigate();

  return (
    <>
      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          Book added successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto mt-20 p-4 sm:p-6 bg-white shadow rounded-lg"
      >
        {/* Book Title */}
        <div className="mb-6">
          <label
            htmlFor="book-title"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Book Title
          </label>
          <input
            id="book-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Book Title"
            className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>

        {/* Book Description */}
        <div className="mb-6">
          <label
            htmlFor="book-description"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Book Description
          </label>
          <textarea
            id="book-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Book Description"
            className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
            rows="4"
          />
          <p className="text-gray-600 text-xs italic mt-1">
            Make it as long and as creative as you’d like.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <label
            htmlFor="book-category"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Categories
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="book-category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              type="text"
              placeholder="Book Category"
              className="flex-1 bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <button
              type="button"
              onClick={addCategory}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-center"
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap mt-3">
            {categories.map((c) => (
              <span
                key={c}
                className="flex items-center mx-1 my-1 text-white bg-blue-600 rounded-full px-3 py-1 text-sm"
              >
                {c}
                <button
                  type="button"
                  onClick={() => removeCategory(c)}
                  className="ml-2 text-white hover:text-red-200"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Create Book Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg flex justify-center items-center gap-2 transition-colors ${
            loading ? "bg-gray-400 cursor-not-allowed" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>Create Book</span>
        </button>

        {/* Return to Home Button */}
        <button
          onClick={() => navigate("/")}
          type="button"
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
      </form>
    </>
  );
}
