import SideMenu from "./components/mui/SideMenu";
import Header from "./components/mui/Header";
import { CssBaseline } from "@mui/material";
import Employees from "./components/mui/Employee/Employees";

export default function Mui() {
  return (
    <div className="flex flex-row h-screen mx-auto my-auto">
      <SideMenu />
      <div className="w-full space-y-1">
        <div>
          <Header />
        </div>
        <div className="">
          <Employees />
        </div>
      </div>
      <CssBaseline />
    </div>
  );
}
