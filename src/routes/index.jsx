import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "../pages/layout/Layout";
import Home from "../pages/Home";
import Create from "../pages/Create";
import Search from "../pages/Search";
import BookDetails from "../pages/BookDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/books/:id",
        element: <BookDetails/>
      },

      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

export default router;
