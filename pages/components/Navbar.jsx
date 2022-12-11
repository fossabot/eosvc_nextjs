import { useSession } from "next-auth/react";
import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

function Navbar() {
  //Sign Out function
  const { data: session } = useSession();
  //Sign Out function
  function handleSignOut() {
    signOut();
  }
  return (
    <nav className="w-[300px] bg-slate-200">
      <div>Navbar Menu</div>
      <div className="flex justify-center ">
        <Link
          href={"/profile"}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
        >
          Profile Page
        </Link>
      </div>
      <div>
        <div className="flex justify-center">
          <button
            onClick={handleSignOut}
            className="mt-5 px-10 py-1 rounded-sm bg-indigo-500"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
