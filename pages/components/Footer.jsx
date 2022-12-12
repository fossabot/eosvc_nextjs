import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="flex flex-row bg-blue-400 h-16 justify-end items-center w-full text-white p-5">
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
