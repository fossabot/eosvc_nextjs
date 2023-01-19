import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleView } from "../../redux/secondBrain/secondBrainSlice";
import { addTodos } from "./apiCalls/addTodos";

const AddTodo = () => {
  const { _id: userId } = useSelector((state) => state.session);
  console.log(userId, "addTodo userId");
  // return console.log("stop");
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e, "Submitted");
    dispatch(
      addTodos({
        userId: userId,
        title: title,
        description: description,
      })
    );
    dispatch(toggleView(false));
  };
  return (
    <div className="bg-gray-400 w-full rounded-md p-2">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Nový úkol"
          value={title}
          className="border border-slate-900 p-2"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="desctiption"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          cols="15"
          rows="5"
        ></textarea>
        <button type="submit" className="my-button">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
