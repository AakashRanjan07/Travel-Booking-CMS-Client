import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PackageList from "./components/PackageList.jsx";
import PackageForm from "./components/PackageForm.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./App.jsx";
import Register from "./components/register.jsx";
import AddBookingForm from "./components/AddBooking.jsx";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/packages",
    element: <PackageList />,
  },
  {
    path: "/packages/new",
    element: <PackageForm />,
  },
  {
    path: "/packages/edit/:id",
    element: <PackageForm />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/bookings",
    element: <AddBookingForm />,
  },
  {
    path: "/packages/view/:id",
    element: <PackageList />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
);
