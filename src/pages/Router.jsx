import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../components/content/Auth"
import Homepage from "../components/content/Homepage"
import ErrorPage from "../components/content/Errorpage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:path",
      element: <Homepage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:path/:category",
      element: <Homepage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:path/:category/:action",
      element: <Homepage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;