import { Outlet } from "react-router-dom";
import NavBar from "../../../pages/SharedComponent/NavBar";
import Footer from "../../../pages/SharedComponent/Footer";

const MainLayOut = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayOut;
