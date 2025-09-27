import AdminDashBoard from "../pages/admin/AdminDashBoard";
import ViewAllOrders from "../pages/admin/OrderManagement/ViewAllOrders";
import AddNewProduct from "../pages/admin/ProductManagement/AddNewProduct";
import ViewAllProducts from "../pages/admin/ProductManagement/ViewAllProducts";
import ChangeUserStatus from "../pages/admin/UserManagement/ChangeUserStatus";

const adminMainRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashBoard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Change User Status",
        path: "change-user-status",
        element: <ChangeUserStatus />,
      },
    ],
  },
  {
    name: "Product Management",
    children: [
      {
        name: "Add New Product",
        path: "add-new-product",
        element: <AddNewProduct />,
      },
      {
        name: "View All Product",
        path: "view-all-product",
        element: <ViewAllProducts />,
      },
    ],
  },
  {
    name: "Order Management",
    children: [
      {
        name: "View All Order",
        path: "view-all-order",
        element: <ViewAllOrders />,
      },
    ],
  },
];

export default adminMainRoutes;
