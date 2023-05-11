import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Form from "../components/Form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "form",
    element: <Form />,
  },
  {
    path: "form/:id",
    element: <Form />,
  },
]);

export default router;
