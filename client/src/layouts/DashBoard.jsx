import { Outlet } from "react-router-dom";
import Slidebar from "../components/Dashboard/Slidebar";

const DashBoard = () => {
  return (
    <div className="min-h-screen md:flex relative">
      <div>
        <Slidebar></Slidebar>
      </div>
      <div className="flex-1 ml-64">
        <div className="p-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
