import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { getUserId } from "./getUserId";
import { useLayoutEffect, useState } from "react";

export default function Table() {
  //Fetch userdata from Session
  /*
  const { data: userId } = useSession();
  console.log(userId.user, "userId");
  //Get user email
  const userEmail = userId.user.email;
  console.log(userEmail, "userEmail");
  //console.log(userEmail);
  //Fetch and store userProfile data from MongoDB (ifExist)
  const { isLoading, isError, data, error } = useQuery(
    ["user", userEmail],
    async () => await getUserId(userEmail)
  );
  console.log(data, "data");
  console.log();
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  //console.log(data, "data");
  //Validatte if user has local profile in MongoDB (Google and Github user has just session data)
  let username;

  if (!data.username) {
    console.log("Create profile");
    username = "neexistuje";
  } else {
    console.log(data, "Has profile");
    username = data.username;
  }
  console.log(username);
*/
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: userId } = useSession();

  useLayoutEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const response = await fetch(`/api/user/userEmail/${userId.user.email}`);
      const data = await response.json();
      setUserData(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  console.log(userData);
  const onUpdate = () => {};

  return (
    <div className="flex flex-col p-5 gap-5 mx-auto justify-center items-center">
      <form className="flex flex-col border rounded-md w-full p-5 justify-between items-center">
        <div className="flex flex-row justify-between w-full items-start m-2 p-2">
          <div className="flex flex-col p-5 space-y-2 w-1/2">
            <input
              className="border rounded-md px-2 py-1 "
              type="text"
              name="name"
              placeholder="Jméno"
            />
            <input
              className="border rounded-md px-2 py-1 "
              type="text"
              name="username"
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
    </div>
  );
}
