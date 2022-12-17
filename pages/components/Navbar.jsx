import { useSession } from "next-auth/react";
import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  WrenchScrewdriverIcon,
  ArrowRightOnRectangleIcon,
  ServerIcon,
  UserIcon,
  UserGroupIcon,
  DocumentIcon,
  DocumentChartBarIcon,
  DocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  //Sign Out function
  const { data: session } = useSession();
  //Sign Out function
  function handleSignOut() {
    signOut();
  }
  return (
    <nav className="flex flex-col p-2 w-50 bg-slate-200 items-center border-l-2 shadow-md">
      <div className="text-gray-700 font-bold p-5">Navbar Menu</div>
      <div className="flex flex-grow flex-col items-start w-full text-gray-600">
        <div className="flex flex-row p-2 gap-2 w-full border-white border-b border-t">
          <UserGroupIcon className="w-6 h-6" />
          <Link href="/crm">CRM</Link>
        </div>
        <div className="flex flex-row p-2 gap-2 w-full border-white border-b border-t">
          <ServerIcon className="w-6 h-6" />
          <Link href="/projects">Projekty</Link>
        </div>
        <div className="flex flex-row p-2 gap-2 w-full border-white border-b border-t">
          <UserIcon className="w-6 h-6" />
          <Link href="/employees">Zaměstnanci</Link>
        </div>
        <div className="flex flex-row p-2 gap-2 w-full border-white border-b border-t">
          <DocumentCheckIcon className="w-6 h-6" />
          <Link href="/invoice">Fakturace</Link>
        </div>
        <div className="flex flex-row p-2 gap-2 w-full border-white border-b border-t">
          <DocumentChartBarIcon className="w-6 h-6" />
          <Link href="/reports">Reporty</Link>
        </div>
        <div className="flex flex-row p-2 gap-2 w-full border-white border-b border-t">
          <DocumentIcon className="w-6 h-6" />
          <Link href="/documents">Dokumenty</Link>
        </div>
        <div className="flex flex-row p-2 gap-2 w-full border-white border-b border-t">
          <ClipboardDocumentListIcon className="w-6 h-6" />
          <Link href="/databox">Datá schránka</Link>
        </div>
        <div className="flex flex-row p-2 gap-2 w-full border-white border-b border-t">
          <ClipboardDocumentListIcon className="w-6 h-6" />
          <Link href="/setup">Číselníky</Link>
        </div>
      </div>

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
