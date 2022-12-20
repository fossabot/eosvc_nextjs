import { makeStyles, withStyles } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function SideMenu() {
  return (
    <div className="flex flex-col items-center w-10 md:w-80 h-full bg-blue-900">
      <MenuOutlinedIcon className="text-white mt-2 md:hidden" />
      SideMenu
    </div>
  );
}
