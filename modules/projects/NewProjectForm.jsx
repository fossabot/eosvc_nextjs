import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createBoard } from "./apiCalls/createBoard";

const NewProjectForm = ({ visible, onFinish }) => {
  const { _id } = useSelector((state) => state.session);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateBoard = async (e) => {
    try {
      e.preventDefault();
      console.log(
        "id:",
        _id,
        "title:",
        title,
        "descrition:",
        description,
        "handleCreateBoard - inside NewProjectFrom"
      );
      await createBoard(_id, title, description);
      onFinish();
    } catch (error) {
      console.log(errors);
    }
  };
  if (!visible) return null;
  return (
    <div className="flex justify-center w-full">
      <div className="">
        <form action="" className="flex flex-col p-2 m-5 gap-2 space-y-1">
          <div className="flex flex-row mx-auto px-2 space-x-2">
            <p className="text-gray-500">Název projektu:</p>
            <input
              className="border border-slate-500 rounded-md"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </div>
          <div className="flex flex-row mx-auto px-2 space-x-2">
            <p>Popis projektu: </p>
            <input
              className="border border-slate-500 rounded-md"
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </div>
          <button onClick={handleCreateBoard} className="my-button">
            Přídat projekt
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProjectForm;
