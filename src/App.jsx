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

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/organizations",
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
          path: "/complianceEngine",
          element: <ComplianceEngine />,
        },
        {
          path: "/reports",
          element: <Reports />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
