import MyOrders from "../pages/user/OrderManagement/MyOrders";
import ChangePassword from "../pages/user/ProfileManagement/ChangePassword";
import EditPersonalInfo from "../pages/user/ProfileManagement/EditPersonalInfo";
import UserDashBoard from "./../pages/user/UserDashBoard";

const userMainRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashBoard />,
  },
  {
    name: "Profile Management",
    children: [
      {
        name: "Edit Personal Info",
        path: "edit-personal-info",
        element: <EditPersonalInfo />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    name: "Order Management",
    children: [
      {
        name: "My Order",
        path: "view-my-order",
        element: <MyOrders />,
      },
    ],
  },
];

export default userMainRoutes;
