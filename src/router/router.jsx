import { createBrowserRouter } from "react-router";
import Home from "../app/Home";
import RootLayout from "../layout/RootLayout";
import ProductDetails from "../app/ProductDetails";
import CategoryProducts from "../app/CategoryProducts";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: ":category",
        Component: CategoryProducts
      },
      {
        path: ":category/:id",
        Component: ProductDetails
      }
    ]
  },
]);

export default router;