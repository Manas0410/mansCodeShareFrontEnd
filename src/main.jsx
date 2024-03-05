import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import CodeSharePage from "./components/CodeSharePage";
import Login from "./components/login/Login";
import { UserAuthContextProvider } from "./components/AuthContext/UserAuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/code",
    element: <CodeSharePage />,
  },
  {
    path: "/test",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserAuthContextProvider>
    <RouterProvider router={router} />
  </UserAuthContextProvider>
);
