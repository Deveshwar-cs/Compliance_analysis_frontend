import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Organization from "./pages/Organization";
import Protocols from "./pages/RulesAndPolicies";
import Products from "./pages/Products";
import ComplianceEngine from "./pages/ComplianceEngine";
import Reports from "./pages/Reports";
import Register from "./pages/Register";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import {AuthProvider} from "./context/AuthContext";
import Protected from "./pages/auth/Protected";
import Logout from "./pages/auth/Logout";
import {ToastContainer} from "react-toastify";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          element: <Protected />,
          children: [
            {
              path: "/",
              element: <Dashboard />,
            },
            {
              path: "/organization",
              element: <Organization />,
            },
            {
              path: "/rules-and-policies",
              element: <Protocols />,
            },
            {
              path: "/products",
              element: <Products />,
            },
            {
              path: "/compliance-engine",
              element: <ComplianceEngine />,
            },
            {
              path: "/reports",
              element: <Reports />,
            },
          ],
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer position="top-center" autoClose={2000} />
    </AuthProvider>
  );
};

export default App;
