import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from "./routes/index.jsx";
import './index.css';
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import './App.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
      <RouterProvider router={router} />,
  </ThemeContextProvider>
);
