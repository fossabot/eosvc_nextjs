import React from "react";
import { useSelector } from "react-redux";
import { createBoard } from "./apiCalls/createBoard";

const NewProjectForm = () => {
  const { id } = useSelector((state) => state.user.userInfo);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  console.log(id, "id", title, "title", description, "description");

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("create");
    await createBoard(id, title, description);
  };
  return (
    <div className="flex justify-center w-full ">
      <div className="border border-black w-1/2">
        <form action="" className="flex flex-col p-2 m-5 gap-2 space-y-1">
          <div className="flex flex-row mx-auto">
            <p className="text-gray-500">Název projektu:</p>
            <input
              className=""
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </div>
          <div className="flex flex-row">
            <p>Popis projektu: </p>
            <input
              className="rounded-md border-gray-900"
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </div>
          <button onClick={handleCreate} className="my-button">
            Přídat projekt
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProjectForm;
