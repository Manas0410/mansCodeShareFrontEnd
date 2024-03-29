import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import CodeSharePage from "./components/CodeSharePage";
import Login from "./components/login/Login";
import { UserAuthContextProvider } from "./components/AuthContext/UserAuthContext";
import TBD from "./tobedeleted/tbd";
import IsEditable from "./components/isEditable/ISEditable";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/code",
    element: <CodeSharePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserAuthContextProvider>
    <RouterProvider router={router} />
  </UserAuthContextProvider>
);
