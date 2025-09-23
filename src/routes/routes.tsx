import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LogInPage from "../pages/LogInPage/LogInPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  //   {
  //     path: "/",
  //     element: <App />,
  //     errorElement: <ErrorPage />,
  //     children: [
  //       {
  //         path: "contacts/:contactId",
  //         element: <Contact />,
  //       },
  //     ],
  //   },
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
