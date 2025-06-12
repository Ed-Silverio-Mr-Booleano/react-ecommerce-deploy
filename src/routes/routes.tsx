import { useRoutes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home } from "../Pages/Home";
import { Cart } from "../Pages/Cart";

export default function Routes() {
  let routes = useRoutes([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
  ]);
  return routes;
}
