import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "react-query";
import { getUserId } from "./apiCalls/getUserId";
import { useDispatch } from "react-redux";
import { updateUser } from "./updateUser";
import { updateUserPass } from "./updateUserPass";
import { updateUserPhoto } from "./updateUserPhoto";
import { useReducer, useState } from "react";
import { update } from "../../redux/userSlice";
import { convertToBase64 } from "../../utils/convertToBase64";

export default function Table() {
  //Get user data from session
  const { data: session } = useSession();

  //Get user data from database if exists
  const { isLoading, data } = useQuery(["user", session.user.email], () =>
    getUserId(session.user.email)
  );

  const dispatch = useDispatch();

  //Update user data
  const mutation = useMutation((formData) => updateUser(data._id, formData));

  //Update user password
  const passMutation = useMutation((newPass) =>
    updateUserPass(data._id, newPass)
  );

  const formReducer = (state, event) => {
    return {
      ...state,
      [event.target.name]: event.target.value,
    };
  };

  const [password, setPassword] = useState("");

  const [formData, setFormData] = useReducer(formReducer, {});
  const [postImage, setPostImage] = useState({ myFile: null });

  console.log(formData, "formData");
  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center">
        <div> Loading...</div>
      </div>
    );

  //Prepare data from DB for update
  const {
    name,
    username,
    avatar,
    email,
    account_name,
    is_admin,
    is_account_admin,
  } = data;

  //Create new user if not exists in local database
  if (email !== session.user.email) {
    console.log("Create new user");
    (async () => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //how to specify the json to body?
        body: JSON.stringify({
          name: session.user.name,
          username: session.user.name,
          email: session.user.email,
          password: process.env.NEXT_PUBLIC_USER_DEFAULT_PASS,
        }),
      };

      await fetch("/api/auth/signup", options)
        .then((res) => res.json())
        .then((data) => {
          //if (data) router.push(process.env.NEXT_PUBLIC_APP_URL);
        });
    })();
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    let updated = Object.assign({}, data, formData);
    mutation.mutate(updated);
    dispatch(update(updated));
    console.log("User data updated");
  };

  const changePassword = (e) => {
    e.preventDefault();
    console.log(password, "password");
    passMutation.mutate(password);
    console.log("Password updated");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserPhoto(data._id, postImage);
    console.log(postImage, "postImage");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    await setPostImage({ ...postImage, myFile: base64 });
    console.log(base64, "file b64");
  };

  return (
    <div className="flex flex-col p-5 gap-5 mx-auto justify-center items-center">
      <div className="flex items-center justify-center ">
        <form
          className="flex flex-col justify-center items-center p-5 space-y-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="file-upload" className="">
            <img
              className="w-32 h-32 rounded-md"
              src={avatar || session.user.image || "/assets/nouser.png"}
              alt=""
            />
          </label>
          <input
            type="file"
            label="Image"
            name="myFile"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
          />
          <button className="bg-gray-500  px-5 py-3 rounded-md text-white font-bold ">
            Změnit prilové foto
          </button>
        </form>
      </div>
      <div>
        <h1>user ID: {data._id}</h1>
      </div>
      <form className="flex flex-col border rounded-md w-full p-5 justify-between items-center">
        <div className="flex flex-row justify-between w-full items-start m-2 p-2">
          <div className="flex flex-col p-5 space-y-2 w-1/2">
            <input
              className="border rounded-md px-2 py-1 "
              type="text"
              name="name"
              defaultValue={name || session.user.name}
              onChange={setFormData}
              placeholder="Jméno"
            />
            <input
              className="border rounded-md px-2 py-1 "
              type="text"
              name="username"
              defaultValue={username || data.username}
              onChange={setFormData}
              placeholder="Uživatelské jméno"
            />

            <input
              className="border rounded-md px-2 py-1 "
              type="text"
              name="account_name"
              placeholder="Společnost"
              onChange={setFormData}
              defaultValue={account_name || data.account_name}
            />
          </div>
          <div className="flex flex-col p-5 space-y-2 w-1/2">
            <input
              className="border rounded-md px-2 py-1  "
              type="text"
              name="email"
              defaultValue={email || session.user.email}
              onChange={setFormData}
              disabled={true}
            />

            <div className="px-2 space-x-2">
              <input
                type="radio"
                name="is_account_admin"
                value={!is_account_admin}
                onChange={setFormData}
                defaultChecked={is_account_admin}
                id="is_account_admin"
              />
              <label
                htmlFor="is_account_admin"
                className="inline-block text-gray-500"
              >
                Správce firmy
              </label>
            </div>
            <div className="px-2 space-x-2">
              <input
                type="radio"
                name="is_admin"
                value={is_admin}
                onChange={setFormData}
                defaultChecked={is_admin}
                id="is_admin"
              />
              <label htmlFor="is_admin" className="inline-block text-gray-500">
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
            Ulož změny
          </button>
        </div>
        {mutation.isSuccess && (
          <div className="text-red-500 ">Data uživatle úspěně změněna!</div>
        )}
      </form>
      <div className="flex flex-row space-x-2">
        <input
          type="text"
          className="border rounded-md px-2 py-1 "
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nové heslo"
        />
        <button
          className="bg-gray-500 rounded-md text-white font-bold py-2 px-5"
          onClick={changePassword}
        >
          Změň heslo
        </button>
      </div>
      {passMutation.isSuccess && (
        <div className="text-red-500 ">Heslo úspěně změněno!</div>
      )}
    </div>
  );
}
