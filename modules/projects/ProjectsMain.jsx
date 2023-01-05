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
import ProjectsMenu from "./ProjectsMenu";

const ProjectsMain = () => {
  const { data: session } = useSession();
  const { isLoading, data } = useQuery("user", () =>
    getUserId(session.user.email)
  );
  const { id } = useSelector((state) => state.user.userInfo);
  const { isLoading: isLoadingBoards, data: boards } = useQuery("boards", () =>
    getAllBoards(data._id)
  );

  if (isLoading)
    return <LoadingSpinner message={"Načítám seznam projektů ..."} />;
  console.log(id, "id");
  console.log(boards, "boards");
  return (
    <div>
      <ProjectsMenu id={id} />
      <div className="flex flex-row p-5">
        <div className="flex  items-start justify-center text-gray-600 text-xs pt-2 bg-gray-300 rounded-md w-32">
          <ProjectSidebar boards={boards} />
        </div>
        <div className="flex flex-col justify-center mx-auto overflow-x-auto">
          <div className="flex justify-center mx-auto ">
            Projekt: {boards ? boards[0].title : "Zatím žádný projekt"}
          </div>
          <Projects />
        </div>
      </div>
    </div>
  );
};

export default ProjectsMain;
