import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Watched } from "./pages/Watched";
import { Watchlist } from "./pages/Watchlist";
import { Navbar } from "./components/Navbar";
import { useEffect } from "react";
import { getUser } from "./services/api";
import Cookies from "js-cookie";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/watchlist",
    element: <Watchlist></Watchlist>,
  },
  {
    path: "/watch-history",
    element: <Watched></Watched>,
  },
]);

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
