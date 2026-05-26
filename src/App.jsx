import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Organization from "./pages/Organization.jsx";
import Protocols from "./pages/RulesAndPolicies.jsx";
import Products from "./pages/Products.jsx";
import ComplianceEngine from "./pages/ComplianceEngine.jsx";
import Reports from "./pages/Reports.jsx";
import Register from "./pages/Register.jsx";
import SignIn from "./pages/auth/Signin.jsx";
import SignUp from "./pages/auth/Singup.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import Protected from "./pages/auth/Protected.jsx";
import Logout from "./pages/auth/Logout.jsx";
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
