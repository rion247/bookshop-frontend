import React from "react";

import { Button, Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import SiderContent from "./Sider";
import { useAppDispatch } from "../../../redux/hooks";
import { logOut } from "../../../redux/features/auth/authSlice";
import ProtectedRoute from "../ProtectedRoute";

const { Header, Content, Footer } = Layout;

const DashBoardLayOut: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOutButton = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <ProtectedRoute role={undefined}>
      <Layout style={{ height: "100%" }}>
        <SiderContent />
        <Layout>
          <Header
            style={{
              paddingRight: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleLogOutButton}>Logout</Button>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Copyright ©{new Date().getFullYear()} All rights reserved by Vivian
            Rion Marandi.
          </Footer>
        </Layout>
      </Layout>
    </ProtectedRoute>
  );
};

export default DashBoardLayOut;
