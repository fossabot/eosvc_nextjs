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

const ProjectsMain = () => {
  const dispatch = useDispatch();
  //const [isLoading, setIsLoading] = useState(true);
  const isLoading = useSelector((state) => state.loading.value);
  //console.log(isLoading, "isLoading - ProjectsMain");
  const { _id: userId } = useSelector((state) => state.session);
  const boards = useSelector((state) => state.boards.value);
  const activeBoard = useSelector((state) => state.activeBoard.value);
  console.log(activeBoard, "ActiveBoard - ProjectsMain");
  const boardId = activeBoard._id;
  console.log(boardId, "BoardId - ProjectsMain");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [sections, setSections] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [icon, setIcon] = useState("");
  // return console.log("stop");
  useEffect(() => {
    const getOneBoard = async (boardId) => {
      try {
        console.log("useEffect - getOneBoard");
        console.log(boardId, "getOneBoard - ProjectsMain");
        const res = await getBoard(boardId);
        console.log(res, "Res - ProjectsMain");
        setTitle(res.title);
        setDescription(res.description);
        setSections(res.sections);
        setIsFavourite(res.favourite);
        setPosition(res.position);
        setIcon(res.icon);
      } catch (err) {
        alert(err);
      }
    };
    getOneBoard(boardId);
  }, [boardId]);
  /*
  useEffect(() => {
    try {
      //setIsLoading(true);
      const fetchBoards = async (userId) => {
        console.log("Start fetchBoards");
        const response = await fetch(`/api/projects/boards/${userId}`);
        const data = await response.json();
        console.log(userId, "UserId - ProjectsMain");
        //const allUserBoards = await getAllBoards(userId);
        dispatch(setBoards(data));
      };
      const fetchActiveBoard = async (userId) => {
        console.log("Start fetchActiveBoard");
        const response = await fetch(`/api/projects/boards/${userId}`);
        const data = await response.json();
        console.log(data[0], "Data[0] - ProjectsMain");
        dispatch(setActiveBoard(data[0]));
      };
      fetchBoards(userId);
      fetchActiveBoard(userId);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loadingState(false));
    }
  }, []);
*/
  //if (isLoading) return <LoadingSpinner message={"Loading Projects ...."} />;
  //console.log(activeBoard, "ActiveBoard - ProjectsMain");
  //return console.log("stop");
  return (
    <div>
      <ProjectsHeader />
      <div className="flex flex-row p-2">
        <div className="flex flex-col items-start justify-center text-gray-100 text-xs bg-slate-600 rounded-md w-80">
          <h1 className="mx-auto py-2">Projekty</h1>
          <ProjectSidebar boards={boards} />
        </div>
        <div className="flex flex-col justify-start items-start px-2 border overflow-x-auto">
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
          <div className="flex justify-start mx-auto w-full border">
            <div>
              <h2 className="text-gray-300 p-2 font-bold bg-slate-900 ">
                Projekt ID:
              </h2>
            </div>
            <div className="flex justify-center items-center pl-2">
              {activeBoard._id}
            </div>
          </div>
          <div className="flex justify-start mx-auto w-full border">
            <div>
              <h2 className="text-gray-300 p-2 font-bold bg-slate-900 ">
                Popis projektu:
              </h2>
            </div>
            <div className="flex justify-center items-center pl-2">
              {activeBoard.description}
            </div>
          </div>
          <div className="flex justify-start mx-auto w-full border">
            <div>
              <h2 className="text-gray-300 p-2 font-bold bg-slate-900 ">
                Position:
              </h2>
            </div>
            <div className="flex justify-center items-center pl-2">
              {activeBoard.position}
            </div>
          </div>
          <div className="pt-2 ">
            {<Kanban data={sections} boardId={activeBoard._id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsMain;
