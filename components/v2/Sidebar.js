import Link from "next/link";
import React, { useState } from "react";
import {
  ArrowRightOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import MenuItem from "../../utils/MenuItem";
import { signOut, useSession } from "next-auth/react";

function Sidebar() {
  const [open, setOpen] = useState(false);
  //console.log(open);
  //Sign Out function
  const { data: session } = useSession();
  //Sign Out function
  function handleSignOut() {
    signOut();
  }
  return (
    <nav
      className={`bg-slate-900  justify-between h-full ${
        open ? "w-80" : "w-20"
      }`}
    >
      <div
        className={`flex items-center ${
          open ? "justify-end pr-5 " : "justify-center"
        } pt-2`}
      >
        <p
          className="text-white"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? (
            <ChevronLeftIcon className="w-6" />
          ) : (
            <ChevronRightIcon className="w-6" />
          )}
        </p>
      </div>
      <div
        className={`flex ${
          open
            ? "justify-start items-start gap-2  pl-5 flex-col"
            : "justify-center items-center gap-2 flex-col"
        } p-2 text-gray-400`}
      >
        {/* Menu Item Start */}

        <MenuItem
          icon="userGroup"
          open={open}
          route={"/crm"}
          menuItem={"CRM"}
        />
        <MenuItem
          icon="server"
          open={open}
          route={"/projects"}
          menuItem={"Projekty"}
        />
        <MenuItem
          icon="user"
          open={open}
          route={"/employees"}
          menuItem={"Zaměstnanci"}
        />

        <MenuItem
          icon="documentCheck"
          open={open}
          route={"/invoice"}
          menuItem={"Fakturace"}
        />
        <MenuItem
          icon="documentChart"
          open={open}
          route={"/reports"}
          menuItem={"Reporty"}
        />
        <MenuItem
          icon="document"
          open={open}
          route={"/documents"}
          menuItem={"Documenty"}
        />
        <MenuItem
          icon="clipBoardDocument"
          open={open}
          route={"/databox"}
          menuItem={"Datová schránka"}
        />
        <MenuItem
          icon="clipBoardDocument"
          open={open}
          route={"/setup"}
          menuItem={"Číselníky"}
        />
        {/* Menu Item End */}
      </div>
      <div
        className={`flex ${
          open
            ? "justify-start items-start gap-2  pl-5 flex-col"
            : "justify-center items-center gap-2 flex-col"
        } p-2 text-gray-400`}
      >
        <div onClick={handleSignOut}>
          <div className="flex flex-row items-center gap-2">
            <div className="hover:bg-slate-700 hover:text-gray-200 hover:transition hover:duration-150 rounded-md p-5">
              {" "}
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
            </div>
            {open && <div>Odhlásit</div>}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
