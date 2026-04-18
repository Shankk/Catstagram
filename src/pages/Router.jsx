import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage, SignupPage} from "../components/content/Auth";
import Homepage from "../components/content/Home";
import ErrorPage from "../components/content/Errorpage";
import ProtectedRoute from "../components/utility/ProtectedRoute";
import ProfilePage from "../components/content/Profile";
import Layout from "../components/content/Layout";

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
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile/:username",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ),
        }
      ],
      errorElement: <ErrorPage />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;