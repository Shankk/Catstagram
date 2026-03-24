import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage, SignupPage} from "../components/content/Auth";
import Homepage from "../components/content/Homepage";
import ErrorPage from "../components/content/Errorpage";
import ProtectedRoute from "../components/utility/ProtectedRoute";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/log-in",
      element: <LoginPage/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/sign-up",
      element: <SignupPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Homepage />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/:path",
      element: (
        <ProtectedRoute>
          <Homepage />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/:path/:category",
      element: (
        <ProtectedRoute>
          <Homepage />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/:path/:category/:action",
      element: (
        <ProtectedRoute>
          <Homepage />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;