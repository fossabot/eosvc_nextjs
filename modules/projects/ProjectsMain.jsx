import { useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/loadings/LoadingSpinner";
import { getUserId } from "../user/apiCalls/getUserId";
import { getAllBoards } from "./apiCalls/getAllBoards";
import Projects from "./Projects";
import ProjectSidebar from "./ProjectSidebar";
import ProjectsHeader from "./ProjectsHeader";
import { update } from "../../redux/projects/boardSlice";

const ProjectsMain = () => {
  const { data: session } = useSession();
  const { isLoading, data } = useQuery("user", () =>
    getUserId(session.user.email)
  );
  const { id } = useSelector((state) => state.user.userInfo);
  const boardState = useSelector((state) => state.board.boardInfo);

  const { isLoading: isLoadingBoards, data: boards } = useQuery("boards", () =>
    getAllBoards(data._id)
  );

  if (isLoading && isLoadingBoards)
    return <LoadingSpinner message={"Načítám seznam projektů ..."} />;

  console.log(id, "id");
  console.log(boards, "boards");
  console.log(boardState, "boardState");
  return (
    <div>
      <ProjectsHeader id={id} />
      <div className="flex flex-row p-2">
        <div className="flex flex-col items-start justify-center text-gray-100 text-xs bg-slate-600 rounded-md w-40">
          <h1 className="mx-auto py-2">Projekty</h1>
          <ProjectSidebar boards={boards} />
        </div>
        <div className="flex flex-col justify-center mx-auto overflow-x-auto">
          <div className="flex justify-start mx-auto w-full border">
            <div>
              <h2 className="text-gray-300 p-2 font-bold bg-slate-900 ">
                Projekt:
              </h2>
            </div>
            <div className="flex justify-center items-center pl-2">
              {
                /*boards ? boards[0].title :*/ boardState.title ||
                  "Zatím žádný projekt"
              }
            </div>
          </div>
          <Projects />
        </div>
      </div>
    </div>
  );
};

export default ProjectsMain;
