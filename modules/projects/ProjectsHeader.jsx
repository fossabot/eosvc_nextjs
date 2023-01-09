import { useState } from "react";
import { useSelector } from "react-redux";
import NewProjectForm from "./NewProjectForm";
import { createSection } from "./apiCalls/createSection";

function ProjectsHeader() {
  //State for chose actual project
  const activeBoard = useSelector((state) => state.activeBoard.value);
  //console.log(activeBoard, "activeBoard");

  //State for addProject Modal
  const [visible, setVisible] = useState(false);

  //Function for adding new section to project
  const addSection = () => {
    console.log(activeBoard._id, "board id");
    createSection(activeBoard._id);
  };

  const deleteProject = () => {
    console.log(activeBoard._id, "Delete board id");
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
        <button className="my-button" onClick={deleteProject}>
          Smazat aktuální projekt
        </button>
      </div>
      <NewProjectForm visible={visible} onFinish={() => setVisible(false)} />
    </div>
  );
}

export default ProjectsHeader;
