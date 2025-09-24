import UserDashBoard from "./../pages/user/UserDashBoard";

const userMainRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashBoard />,
  },
];

export default userMainRoutes;

// {
//     name: "User Management",
//     children: [
//       {
//         name: "Create Admin",
//         path: "create-admin",
//         element: <CreateAdmin />,
//       },

//     ],
//   },
