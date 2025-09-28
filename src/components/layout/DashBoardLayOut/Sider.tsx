import { Layout, Menu } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import {
  selectCurrentToken,
  type TUserforJWT,
} from "../../../redux/features/auth/authSlice";
import verifyJWTtoken from "../../../utilis/verifyJWTtoken";
import adminMainRoutes from "../../../routes/admin.routes";
import sideBarItemsGenerator from "../../../utilis/sideBarItemsGenerator";
import userMainRoutes from "../../../routes/user.routes";
import type { ItemType } from "antd/es/menu/interface";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const UserRoleForSideBarItem = {
  ADMIN: "admin",
  USER: "user",
};

const SiderContent = () => {
  const token = useAppSelector(selectCurrentToken);

  let user;
  if (token) {
    user = verifyJWTtoken(token);
  }

  const role = (user as TUserforJWT)?.role;

  let items;
  switch (role) {
    case UserRoleForSideBarItem?.ADMIN:
      items = sideBarItemsGenerator(adminMainRoutes, "admin");
      break;
    case UserRoleForSideBarItem?.USER:
      items = sideBarItemsGenerator(userMainRoutes, "user");
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{
        height: "100vh",
        position: "sticky",
        top: "0",
        left: "0",
      }}
    >
      <div
        className="demo-logo-vertical"
        style={{
          color: "white",
          fontSize: "22px",
          textAlign: "center",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "4rem",
          fontFamily: "Poppins",
          fontWeight: "bold",
        }}
      >
        <Link to={"/"}>
          <span className="text-white">eBookNest</span>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={items as ItemType[]}
      />
    </Sider>
  );
};

export default SiderContent;
