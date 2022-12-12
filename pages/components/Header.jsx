import { useSession } from "next-auth/react";
import React from "react";

function Header() {
  const { data: session } = useSession();
  console.log(session, "Session");
  return (
    <header className="flex flex-row bg-blue-400 h-22 w-full p-5">
      <div className="mx-auto">1</div>
      <div className="flex items-center  ">
        {session && (
          <>
            <div className="flex flex-col items-end text-sm font-bold text-white p-2">
              <p>{session.user.name}</p>
              <p>{session.user.email}</p>
            </div>
            <div>
              {" "}
              {session.user.image ? (
                <img
                  className="rounded-full w-16 h-16"
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
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
