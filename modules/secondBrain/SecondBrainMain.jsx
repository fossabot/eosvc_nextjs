import { useDispatch, useSelector } from "react-redux";

import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { toggleView } from "../../redux/secondBrain/secondBrainSlice";

const SecondBrainMain = () => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.secondBrain.todo.toggleView);
  console.log(visible, "toggleView");
  return (
    <div className="space-y-2">
      <button
        className="my-button"
        onClickCapture={() => dispatch(toggleView(true))}
      >
        Add ToDo
      </button>
      {visible && <AddTodo />}
      <TodoList />
    </div>
  );
};

export default SecondBrainMain;
