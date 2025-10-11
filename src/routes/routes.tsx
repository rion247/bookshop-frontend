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
import ProtectedRoute from "../components/layout/ProtectedRoute";
import HomePage from "../pages/HomePage/HomePage";
import BookDetails from "../pages/BookDetails/BookDetails";
import ViewAllBooks from "../pages/ViewAllBooks/ViewAllBooks";
import AllBlog from "../pages/AllBlog/AllBlog";
import BlogDetails from "../pages/AllBlog/BlogDetails";
import VerifyOrder from "../pages/VerifyOrder/VerifyOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "all-books",
        element: <ViewAllBooks />,
      },
      {
        path: "blog",
        element: <AllBlog />,
      },
      {
        path: "blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "book-details/:id",
        element: <BookDetails />,
      },
      {
        path: "order/verify-order",
        element: <VerifyOrder />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role={"admin"}>
        <DashBoardLayOut />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: routesGenerator(adminMainRoutes),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role={"user"}>
        <DashBoardLayOut />
      </ProtectedRoute>
    ),
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
