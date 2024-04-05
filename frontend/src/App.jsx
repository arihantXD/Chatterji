import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, Home, Layout, Login, Register, Testing } from "./pages";
import "./App.css";

import { loader as dashboardLoader } from "./pages/Dashboard";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import context from "./context/context";
import { useEffect, useState } from "react";

export const myContext = context;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/testing",
        element: <Testing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
    ],
  },
]);

function App() {
  const [selectedCat, setSelectedCat] = useState(false);
  const [user, setUser] = useState("");
  const [chats, setChats] = useState(false);

  return (
    <div className="max-w-[1300px] mx-auto max-h-[1000px]">
      <myContext.Provider
        value={{
          selectedCat,
          setSelectedCat,
          user,
          setUser,
          chats,
          setChats,
        }}
      >
        <RouterProvider router={router} />
      </myContext.Provider>
    </div>
  );
}

export default App;
