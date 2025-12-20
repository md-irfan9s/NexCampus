import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#020A0F] flex flex-col font-inter">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
