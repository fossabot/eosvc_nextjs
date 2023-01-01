import Link from "next/link";
import { useSession } from "next-auth/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

function Header() {
  const { data: session } = useSession();
  //console.log(session, "Session");
  const user = useSelector((state) => state.user.userInfo);

  console.log(user, "User");
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
          {session.user.image ? (
            <img
              className="rounded-full w-8 h-8"
              src={session.user.image}
              alt="User img"
              referrerPolicy="no-referrer"
            />
          ) : (
            <img
              className="rounded-full w-8 h-8"
              src={"/assets/nouser.png"}
              alt="User img"
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col items-end ">
        <p className="text-gray-400 text-xs">
          Welcome, {user.name || session.user.name}
        </p>
        <p className="text-gray-900 text-xs">
          {user.email || session.user.email}
        </p>
      </div>
    </div>
  );
}

export default Header;
