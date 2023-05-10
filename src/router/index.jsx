import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "form",
    element: <div>Este es el form</div>,
  },
]);

export default router;
