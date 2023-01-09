import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

function Header() {
  const session = useSelector((state) => state.session);
  console.log(session, "session Header");

  return (
    <div className="flex bg-gray-100 h-full mx-auto px-5 space-x-5 border-b w-full items-center justify-end">
      <div className="flex flex-auto justify-center items-center">
        <div className="flex flex-row gap-2">
          <MagnifyingGlassIcon className="text-gray-600 w-5" />
          <input
            className="rounded-md px-2 py-2 mx-auto"
            placeholder="Vyhledej ..."
          />
        </div>
      </div>

      <div className="w-10">
        <Link href="/profile">
          <img
            className="rounded-full w-8 h-8"
            src={session.avatar || "/assets/nouser.png"}
            alt="User img"
            referrerPolicy="no-referrer"
          />
          {}
        </Link>
      </div>
      <div className="flex flex-col items-end ">
        <p className="text-gray-400 text-xs">Welcome, {session.name}</p>
        <p className="text-gray-900 text-xs">{session.email}</p>
        <p className="text-gray-400 text-xs">uId: {session._id}</p>
      </div>
    </div>
  );
}

export default Header;
