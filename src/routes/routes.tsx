import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LogInPage from "../pages/LogInPage/LogInPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import About from "../pages/About/About";
import DashBoardLayOut from "../components/layout/DashBoardLayOut/DashBoardLayOut";
import routesGenerator from "../utilis/routesGenerator";
import adminMainRoutes from "./admin.routes";
import userMainRoutes from "./user.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/admin",
    element: <DashBoardLayOut />,
    errorElement: <ErrorPage />,
    children: routesGenerator(adminMainRoutes),
  },
  {
    path: "/user",
    element: <DashBoardLayOut />,
    errorElement: <ErrorPage />,
    children: routesGenerator(userMainRoutes),
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
