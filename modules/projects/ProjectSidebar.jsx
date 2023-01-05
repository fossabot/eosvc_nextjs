import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { update } from "../../redux/projects/boardSlice";

const ProjectSidebar = ({ boards }) => {
  const dispatch = useDispatch();

  const handleChange = (dispatch, board) => {
    console.log("dispatch");
    console.log(board, "board");
    dispatch(update(board));
  };

  return (
    <div className="flex  flex-col justify-start items-start space-y-1 py-1 px-1 bg-slate-300 w-full h-full">
      {boards?.map((board, i) => (
        <div
          key={i}
          className="bg-slate-600 border w-full text-gray-200 rounded-md py-2 font-bold p-2"
          onClick={() => handleChange(dispatch, board)}
        >
          <p>{board.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectSidebar;
