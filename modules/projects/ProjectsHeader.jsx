import { useState } from "react";
import { useSelector } from "react-redux";
import NewProjectForm from "./NewProjectForm";
import { createSection } from "./apiCalls/createSection";

function ProjectsHeader() {
  const board = useSelector((state) => state.board.value);
  console.log(board, "board in header");

  const [visible, setVisible] = useState(false);

  const addSection = () => {
    console.log(board._id, "board id");
    createSection(board._id);
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto pt-2">
      <div className="flex flex-row gap-2 rounded-md py-2 px-2 w-full">
        <button className="my-button" onClick={() => setVisible(!visible)}>
          Přidat projekt
        </button>
        <button className="my-button" onClick={addSection}>
          Přidat sekci do projektu
        </button>
      </div>
      {visible && <NewProjectForm />}
    </div>
  );
}

export default ProjectsHeader;
