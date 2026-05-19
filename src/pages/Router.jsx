import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage, SignupPage} from "../components/content/Auth";
import Homepage from "../components/content/Home";
import ErrorPage from "../components/content/Errorpage";
import ProtectedRoute from "../components/utility/ProtectedRoute";
import ProfilePage from "../components/content/Profile";
import MessagePage from "../components/content/Messages";
import Layout from "../components/content/Layout";
import SettingsPage from "../components/content/Settings";
import GuestRoute from "../components/utility/GuestRoute";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/log-in",
      element: (
        <GuestRoute>
          <LoginPage/>
        </GuestRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/sign-up",
      element: ( 
        <GuestRoute>
          <SignupPage />
        </GuestRoute> 
      ) ,
      errorElement: <ErrorPage />,
    },
    {
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Homepage /> },
        { path: "/profile/:username", element: <ProfilePage /> },
        { path: "/direct", element: <MessagePage /> },
        { path: "/settings", element: <SettingsPage /> },
      ],
      errorElement: <ErrorPage />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;