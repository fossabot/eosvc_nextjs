import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProjectSidebar from "./ProjectSidebar";
import ProjectsHeader from "./ProjectsHeader";
import Kanban from "./Kanban";
import { loadingState } from "../../redux/loadingSlice";
import { useDispatch } from "react-redux";
import { setBoards } from "../../redux/features/boardSlice";
import { setActiveBoard } from "../../redux/projects/activeBoardSlice";
import LoadingSpinner from "../../components/loadings/LoadingSpinner";
import { getAllBoards } from "./apiCalls/getAllBoards";
import { getBoard } from "./apiCalls/getBoard";
import { createBoard } from "./apiCalls/createBoard";

const ProjectsMain = () => {
  const dispatch = useDispatch();
  //const [isLoading, setIsLoading] = useState(true);
  const isLoading = useSelector((state) => state.loading.value);
  //console.log(isLoading, "isLoading - ProjectsMain");
  const { _id: userId } = useSelector((state) => state.session);
  const boards = useSelector((state) => state.boards.value);
  const activeBoard = useSelector((state) => state.activeBoard.value);
  console.log(activeBoard, "ActiveBoard - ProjectsMain");
  const boardId = activeBoard?._id;
  console.log(boardId, "BoardId - ProjectsMain");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [sections, setSections] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [icon, setIcon] = useState("");
  const [newProject, setNewProject] = useState(false);
  // return console.log("stop");
  const handleDefaultProject = async () => {
    console.log("Creating Default Project");
    try {
      const _id = userId;
      const title = "Nový projekt";
      const description = "Popis projektu";
      await createBoard(_id, title, description);
      setNewProject(true);
    } catch (error) {
      console.log(errors);
    }
  };

  useEffect(() => {
    const getOneBoard = async (boardId) => {
      try {
        console.log("useEffect - getOneBoard");
        console.log(boardId, "getOneBoard - ProjectsMain");
        const res = await getBoard(boardId);
        if (res) {
          console.log(res, "Res - ProjectsMain");
          setTitle(res?.title);
          setDescription(res?.description);
          setSections(res?.sections);
          setIsFavourite(res?.favourite);
          setPosition(res?.position);
          setIcon(res?.icon);
        } else {
          console.log("No res - ProjectsMain");
        }
      } catch (err) {
        alert(err);
      } finally {
        setNewProject(false);
      }
    };
    getOneBoard(boardId);
  }, [boardId, setNewProject, activeBoard]);

  if (!activeBoard)
    return (
      <div className="h-full ">
        <div>
          <ProjectsHeader />
        </div>
        <div className="flex justify-center items-center pt-5">
          <button className="my-button-v2" onClick={handleDefaultProject}>
            Založ první projekt ze šablony
          </button>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col h-full">
      <ProjectsHeader />
      <div className="flex flex-row h-full ">
        <div className="flex flex-col items-start justify-center text-gray-100 text-xs bg-slate-600 rounded-md w-80">
          <h1 className="mx-auto py-2">Projekty</h1>
          <ProjectSidebar boards={boards} />
        </div>
        <div className="flex flex-col w-full h-full">
          <div className="text-xs">
            <div className="flex flex-col justify-start items-start px-2">
              <div className="flex justify-start items-center w-full h-full mx-auto">
                <h2 className="text-gray-300 p-2 font-bold bg-slate-900">
                  Projekt:
                </h2>
                <p className="flex justify-center items-center pl-2">
                  {activeBoard.title}
                </p>
              </div>

              <div className="flex justify-start mx-auto w-full">
                <div>
                  <h2 className="text-gray-300 p-2 font-bold bg-slate-900 ">
                    Popis projektu:
                  </h2>
                </div>
                <div className="flex justify-center items-center pl-2">
                  {activeBoard.description}
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-full">
            <div className="pt-2 w-full h-full ">
              {<Kanban data={sections} boardId={activeBoard._id} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsMain;
