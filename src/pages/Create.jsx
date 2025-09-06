import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { db } from "../firebase/index"; // make sure firebase.js exports db
import { collection, addDoc } from "firebase/firestore";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const addCategory = () => {
    if (!newCategory.trim()) return; 
    setCategories((prev) => [newCategory.trim(), ...prev]);
    setNewCategory("");
  };

  const removeCategory = (cat) => {
    setCategories((prev) => prev.filter((c) => c !== cat));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      title: title.trim(),
      description: description.trim(),
      categories,
      createdAt: new Date()
    };

    try {
      setLoading(true);
      await addDoc(collection(db, "books"), data);
      setShowSuccess(true);

      // Reset form
      setTitle("");
      setDescription("");
      setCategories([]);

      // Hide success after 3s
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Error adding book:", err);
      alert("Failed to add book. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

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
        className={`w-full max-w-lg mx-auto mt-20 p-4 sm:p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow rounded-lg`}
      >
        {/* Book Title */}
        <div className="mb-6">
          <label
            htmlFor="book-title"
            className={`block uppercase tracking-wide ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            } text-xs font-bold mb-2`}
          >
            Book Title
          </label>
          <input
            id="book-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Book Title"
            className={`appearance-none block w-full ${
              theme === "dark"
                ? "bg-gray-700 text-white border-gray-600 focus:bg-gray-600"
                : "bg-gray-100 text-gray-700 focus:bg-white"
            } border rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500`}
          />
        </div>

        {/* Book Description */}
        <div className="mb-6">
          <label
            htmlFor="book-description"
            className={`block uppercase tracking-wide ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            } text-xs font-bold mb-2`}
          >
            Book Description
          </label>
          <textarea
            id="book-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Book Description"
            className={`appearance-none block w-full ${
              theme === "dark"
                ? "bg-gray-700 text-white border-gray-600 focus:bg-gray-600"
                : "bg-gray-100 text-gray-700 focus:bg-white"
            } border rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500 resize-none`}
            rows="4"
          />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <label
            htmlFor="book-category"
            className={`block uppercase tracking-wide ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            } text-xs font-bold mb-2`}
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
              className={`flex-1 ${
                theme === "dark"
                  ? "bg-gray-700 text-white border-gray-600 focus:bg-gray-600"
                  : "bg-gray-100 text-gray-700 focus:bg-white"
              } border rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500`}
            />
            <button
              type="button"
              onClick={addCategory}
              className={`${
                theme === "dark"
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white px-3 py-2 rounded-lg flex items-center justify-center`}
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap mt-3">
            {categories.map((c) => (
              <span
                key={c}
                className={`flex items-center mx-1 my-1 text-white ${
                  theme === "dark" ? "bg-blue-700" : "bg-blue-600"
                } rounded-full px-3 py-1 text-sm`}
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
          className={`w-full text-white ${
            theme === "dark"
              ? "bg-blue-700 hover:bg-blue-800"
              : "bg-blue-600 hover:bg-blue-700"
          } px-3 py-2 rounded-lg flex justify-center items-center gap-2 transition-colors ${
            loading ? "bg-gray-400 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Create Book"}
        </button>

        {/* Return to Home Button */}
        <button
          onClick={() => navigate("/")}
          type="button"
          className={`flex items-center gap-2 mt-4 px-4 py-2 ${
            theme === "dark" ? "bg-blue-700" : "bg-blue-500"
          } text-white rounded shadow-md hover:bg-blue-600 transition-all w-fit`}
        >
          Return Home
        </button>
      </form>
    </>
  );
}

