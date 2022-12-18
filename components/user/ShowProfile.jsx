import { useSession } from "next-auth/react";
import { useEffect, useLayoutEffect, useState } from "react";

import { useQuery } from "react-query";

export default function Table() {
  const { data: userDataSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [userDataDb, setUserDataDb] = useState(null);

  console.log(userDataSession?.user.email);

  useEffect(() => {
    const x = new Promise((resolve, reject) => {
      if (userDataSession.user.email) {
        resolve(fetchAndValidateOAuthUser(userDataSession.user.email));
      } else {
        reject(new Error("Error fetching user"));
      }
    });
    x.then((data) => {
      setUserDataDb(data);
      console.log(x, "xxx");
    });
  }, []);

  /*
  useLayoutEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const response = await fetch(
        `/api/user/userEmail/${userDataSession.user.email}`
      );
      const data = await response.json();
      setUserDataDb(data);
      if (userDataDb === null) {
        console.log("Hello there is new OAuth user");
        try {
          registrIfNoExist(
            userDataSession.user.name,
            userDataSession.user.email
          );
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log("I have user email in MongoDB");
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);
*/
  //console.log(userDataSession, "userDataSession");
  //console.log(userDataDb, "userDataDb");

  let uname = !userDataDb ? userDataSession?.name : userDataDb?.name;
  let username = !userDataDb ? userDataSession?.username : userDataDb?.username;
  let email = !userDataDb ? userDataSession?.email : userDataDb?.email;

  const onUpdate = () => {};

  return (
    <div className="flex flex-col p-5 gap-5 mx-auto justify-center items-center">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <form className="flex flex-col border rounded-md w-full p-5 justify-between items-center">
          <div className="flex flex-row justify-between w-full items-start m-2 p-2">
            <div className="flex flex-col p-5 space-y-2 w-1/2">
              <input
                className="border rounded-md px-2 py-1 "
                type="text"
                name="name"
                defaultValue={uname}
                placeholder="Jméno"
              />
              <input
                className="border rounded-md px-2 py-1 "
                type="text"
                name="username"
                defaultValue={username}
                placeholder="Uživatelské jméno"
              />

              <input
                className="border rounded-md px-2 py-1 "
                type="text"
                name="account_name"
                placeholder="Společnost"
              />
            </div>
            <div className="flex flex-col p-5 space-y-2 w-1/2">
              <input
                className="border rounded-md px-2 py-1  "
                type="text"
                name="email"
                defaultValue={email}
                disabled={true}
              />
              <input
                className="border rounded-md px-2 py-1 "
                type="text"
                name="password"
                placeholder="Heslo"
              />
              <div className="px-2 space-x-2">
                <input
                  type="radio"
                  name="is_account_admin"
                  value="Správce firmy"
                  id="is_account_admin"
                />
                <label
                  htmlFor="radioDefault2"
                  className="inline-block text-gray-500"
                >
                  Správce firmy
                </label>
              </div>
              <div className="px-2 space-x-2">
                <input
                  type="radio"
                  name="is_admin"
                  value="Super Admin"
                  id="is_admin"
                />
                <label
                  htmlFor="radioDefault2"
                  className="inline-block text-gray-500"
                >
                  Super Admin
                </label>
              </div>
            </div>
          </div>
          <div>
            <button
              className="bg-gray-500 rounded-md text-white font-bold py-2 px-5"
              onClick={onUpdate}
            >
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

//Fetch user with Session email and validate with OAuth user. If user is not in local mongoDB, then create local profile
const fetchAndValidateOAuthUser = async (userEmailSession) => {
  try {
    const fetchUser = async (userEmail) => {
      try {
        const response = await fetch(`/api/user/userEmail/${userEmail}`);
        const data = await response.json();
        console.log(data, "middle");
        return data;
      } catch (err) {
        console.log(err);
      }
    };

    const userDataDbx = await fetchUser(userEmailSession);

    console.log(userDataDbx, "data");

    if (userDataDbx === null) {
      console.log("Hello there is new OAuth user");
      try {
        await registrIfNoExist(
          userDataSession.user.name,
          userDataSession.user.email
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("I have user email in MongoDB");
    }

    return await userDataDbx;
  } catch (err) {
    console.log(err);
  }
};

//If user not in local DB registr with OAuth credentials

async function registrIfNoExist(name, email) {
  try {
    const values = {
      name: name,
      username: email,
      email: email,
      password: process.env.USER_DEFAULT_PASS,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("/api/auth/signup", options)
      .then((res) => res.json())
      .then((data) => {});
    console.log("User added successfully!");
  } catch (err) {
    console.log(err);
  }
}
