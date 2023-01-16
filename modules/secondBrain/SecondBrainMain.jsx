import { useDispatch, useSelector } from "react-redux";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { toggleView } from "../../redux/secondBrain/secondBrainSlice";
import { useEffect, useState } from "react";
import { getAllTodos } from "./apiCall/getAllTodos";

const SecondBrainMain = () => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.secondBrain.todo.toggleView);
  const { _id: userId } = useSelector((state) => state.session);
  const [todos, setTodos] = useState([]);
  console.log(todos, "todos");

  useEffect(() => {
    const getOneBoard = async () => {
      try {
        const res = await getAllTodos(userId);
        setTodos(res);
      } catch (err) {
        alert(err);
      } finally {
      }
    };
    getOneBoard();
    return () => {};
  }, []);

  return (
    <div className="space-y-2">
      <button
        className="my-button"
        onClickCapture={() => dispatch(toggleView(true))}
      >
        Add ToDo
      </button>
      {visible && <AddTodo />}
      <TodoList todos={todos} />
    </div>
  );
};

export default SecondBrainMain;
