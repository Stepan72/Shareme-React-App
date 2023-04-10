import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./container/Home";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "/*",
    element: <Home />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
