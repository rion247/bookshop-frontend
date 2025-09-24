import { Outlet } from "react-router-dom";

const MainLayOut = () => {
  return (
    <div>
      <h1>Main LayOut Page</h1>
      <Outlet />
    </div>
  );
};

export default MainLayOut;
