import { Outlet } from "react-router";
import Navbar from "../component/common/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
