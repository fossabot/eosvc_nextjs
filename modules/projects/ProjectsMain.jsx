import { useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/loadings/LoadingSpinner";
import { getAllBoards } from "./apiCalls/getAllBoards";
import Projects from "./Projects";
import ProjectSidebar from "./ProjectSidebar";
import ProjectsHeader from "./ProjectsHeader";
import { update } from "../../redux/projects/boardSlice";
import { createBoard } from "./apiCalls/createBoard";

const ProjectsMain = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user.userInfo);
  console.log(_id, "user id ProjectMain");

  const boardState = useSelector((state) => state.board.value);

  const { isLoading: isLoadingBoards, data: boards } = useQuery(
    "boards",
    () => getAllBoards(_id),

    {
      onSuccess: (data) => {
        dispatch(update(data[0]));
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  if (isLoadingBoards) {
    return <LoadingSpinner message={"Připravuji projekty"} />;
  }

  if (boards.length === 0) return <div>Žádné projekty</div>;

  return (
    <div>
      <ProjectsHeader id={_id} />
      <div className="flex flex-row p-2">
        <div className="flex flex-col items-start justify-center text-gray-100 text-xs bg-slate-600 rounded-md w-40">
          <h1 className="mx-auto py-2">Projekty</h1>
          <ProjectSidebar boards={boards} />
        </div>
        <div className="flex flex-col justify-center mx-auto overflow-x-auto w-full p-5">
          <div className="flex justify-start mx-auto w-full border">
            <div>
              <h2 className="text-gray-300 p-2 font-bold bg-slate-900 ">
                Projekt:
              </h2>
            </div>
            <div className="flex justify-center items-center pl-2">
              {
                /*boards ? boards[0].title :*/ !boardState
                  ? "Není vybraný žádný projekt"
                  : boardState.title
              }
            </div>
          </div>
          {!boardState ? (
            <div>
              <h1>Vyber projekt z menu v levo!</h1>
            </div>
          ) : (
            <Projects />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsMain;
