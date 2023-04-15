import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Home from "./container/Home";
import Login from "./components/Login";
import { fetchUser } from "./utils/fetchUser";

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
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
