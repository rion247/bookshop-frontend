import { Outlet } from "react-router-dom";
import NavBar from "../../../pages/SharedComponent/NavBar";

const MainLayOut = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayOut;
