import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../redux/userSlice";

export default function Table() {
  //New solution with Redux
  const user = useSelector((state) => state.user.userInfo);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [accountName, setAccountName] = useState(user.accountName);

  const dispatch = useDispatch();
  /*
  useEffect(() => {
    const fetchUserData = new Promise((resolve, reject) => {
      if (email && name) {
        resolve(fetchAndValidateOAuthUser(name, email));
      } else {
        reject(new Error("Error fetching user"));
      }
    });
    fetchUserData.then((data) => {
      setUserDataDb(data);
    });
  }, []);
*/
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Update");
    dispatch(update({ name, email, accountName }));
  };

  return (
    <div className="flex flex-col p-5 gap-5 mx-auto justify-center items-center">
      <form className="flex flex-col border rounded-md w-full p-5 justify-between items-center">
        <div className="flex flex-row justify-between w-full items-start m-2 p-2">
          <div className="flex flex-col p-5 space-y-2 w-1/2">
            <input
              className="border rounded-md px-2 py-1 "
              type="text"
              name="name"
              defaultValue={user.name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jméno"
            />
            <input
              className="border rounded-md px-2 py-1 "
              type="text"
              name="username"
              defaultValue={user.username}
              onChange={(e) => setUname(e.target.value)}
              placeholder="Uživatelské jméno"
            />

            <input
              className="border rounded-md px-2 py-1 "
              type="text"
              name="account_name"
              placeholder="Společnost"
              onChange={(e) => setAccountName(e.target.value)}
              defaultValue={user.accountName}
            />
          </div>
          <div className="flex flex-col p-5 space-y-2 w-1/2">
            <input
              className="border rounded-md px-2 py-1  "
              type="text"
              name="email"
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

//Fetch user with Session email and validate with OAuth user. If user is not in local mongoDB, then create local profile
const fetchAndValidateOAuthUser = async (userEmailSession, userNameSession) => {
  console.log(userEmailSession, userNameSession, "inside");
  try {
    const fetchUser = async (userEmail) => {
      console.log(userEmail, "userEmail");
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
        await registrIfNoExist(userNameSession, userEmailSession);
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
    console.log(process.env.USER_DEFAULT_PASS, "def pass");
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
