import React from "react";
import { useSelector } from "react-redux";
import ProjectSidebar from "./ProjectSidebar";
import ProjectsHeader from "./ProjectsHeader";
import Kanban from "./Kanban";

const ProjectsMain = () => {
  const sessionRedux = useSelector((state) => state.session);
  //console.log(sessionRedux, "sessionRedux - Project Main");
  const boards = useSelector((state) => state.boards.value);
  const activeBoard = useSelector((state) => state.activeBoard.value);
  console.log(boards, "boards - Project Main");
  console.log(activeBoard, "activeBoard - Project Main");

  //if (isLoading) return <LoadingSpinner message="Načítám data..." />;
  //return console.log("stop");

  return (
    <div>
      <ProjectsHeader />
      <div className="flex flex-row p-2">
        <div className="flex flex-col items-start justify-center text-gray-100 text-xs bg-slate-600 rounded-md w-40">
          <h1 className="mx-auto py-2">Projekty</h1>
          <ProjectSidebar boards={boards} />
        </div>
        <div className="flex flex-col justify-start items-start overflow-x-auto w-full px-2 border">
          <div className="flex justify-start mx-auto w-full border">
            <div>
              <h2 className="text-gray-300 p-2 font-bold bg-slate-900 ">
                Projekt:
              </h2>
            </div>
            <div className="flex justify-center items-center pl-2">
              {activeBoard.title}
            </div>
          </div>
          <div>
            <h2>Popis projektu: {activeBoard.description}</h2>
          </div>
          <div className="flex w-full border border-black p-2">
            <Kanban activeBoard={activeBoard} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsMain;
