import React from "react";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Este es el home</div>,
  },
  {
    path: "form",
    element: <div>Este es el form</div>,
  },
]);

export default router;
