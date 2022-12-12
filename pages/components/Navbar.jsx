import { useSession } from "next-auth/react";
import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  WrenchScrewdriverIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  //Sign Out function
  const { data: session } = useSession();
  //Sign Out function
  function handleSignOut() {
    signOut();
  }
  return (
    <nav className="flex flex-col p-5 w-50 bg-slate-200 items-center">
      <div className="">Navbar Menu</div>
      <div className="flex flex-grow"></div>

      <div className="flex flex-row">
        <Link
          href={"/profile"}
          className="mt-5 px-10 py-1 rounded-sm text-gray-600"
        >
          <WrenchScrewdriverIcon className="w-6 h-6" />
        </Link>
        <button
          onClick={handleSignOut}
          className="mt-5 px-10 py-1 text-gray-600"
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
