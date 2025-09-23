import { createBrowserRouter } from "react-router";
import Home from "../app/Home";
import RootLayout from "../layout/RootLayout";
import ProductDetails from "../app/ProductDetails";
import AllProducts from "../app/AllProducts";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import Profile from "../component/Dashboard/Profile";
import CreateProductPage from "../component/Dashboard/CreateProductPage";
import CartPage from "../app/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "products",
        element: <AllProducts />,
      },
      {
        path: "product/:id",
        Component: ProductDetails,
      },
      {
        path: "cart",
        Component: CartPage,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "admin/add-product",
        Component: CreateProductPage,
      },
    ],
  },
]);

export default router;
