import { useState } from "react";
import { useSelector } from "react-redux";
import { createBoard } from "./apiCalls/createBoard";
import NewProjectForm from "./NewProjectForm";

function ProjectsHeader() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center mx-auto pt-2">
      <div className="rounded-md py-2 px-2 w-full">
        <button className="my-button" onClick={() => setVisible(!visible)}>
          Přidat projekt
        </button>
      </div>
      {visible && <NewProjectForm />}
    </div>
  );
}

export default ProjectsHeader;
