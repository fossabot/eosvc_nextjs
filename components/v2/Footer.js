import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="flex flex-row bg-gray-100 h-8 justify-end items-center w-full text-xs text-gray-500 p-5">
      <div className="pr-5">
        <Link href="/">
          <h1 className="text-gray-600"> eOSVC - v.0.0.1</h1>
        </Link>
      </div>
      <div className="space-x-2 pr-2">
        powered by Next.js{" "}
        <span className="bg-black rounded-md text-white px-1">13</span> hosted
        by:
        <span className="text-bold underline">
          <Link href="https://www.vercel.com">Vercel</Link>
        </span>
      </div>
      <div className="space-x-2">
        Supported by:
        <Link className="pl-1 font-bold" href="https://www.softbase.cz">
          SoftBase s.r.o.
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
