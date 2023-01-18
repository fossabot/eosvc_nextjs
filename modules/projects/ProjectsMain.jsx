import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProjectSidebar from "./ProjectSidebar";
import ProjectsHeader from "./ProjectsHeader";
import Kanban from "./Kanban";
import { useDispatch } from "react-redux";
import { getBoard } from "./apiCalls/getBoard";
import { createBoard } from "./apiCalls/createBoard";
import { updateBoardFavourite } from "./apiCalls/updateBoardFavourite";
import { setFavouriteList } from "../../redux/features/favouriteSlice";
import { toggleReloadMenu } from "../../redux/toggleProjects";
import { updateBoardVisibility } from "./apiCalls/updateBoardVisibility";
import NewProject from "../../components/emptyStates/NewProject";

const ProjectsMain = () => {
  const dispatch = useDispatch();
  const reloadMenu = useSelector((state) => state.projectState.menu.toggleMenu);
  //const [isLoading, setIsLoading] = useState(true);
  const isLoading = useSelector((state) => state.loading.value);
  //console.log(isLoading, "isLoading - ProjectsMain");
  const { _id: userId } = useSelector((state) => state.session);
  const boards = useSelector((state) => state.boards.value);
  const favouriteList = useSelector((state) => state.favourites.value);
  const activeBoard = useSelector((state) => state.activeBoard.value);
  //const activeBoard = false;
  console.log(activeBoard, "ActiveBoard - ProjectsMain");
  //console.log(activeBoard, "ActiveBoard - ProjectsMain");
  const boardId = activeBoard?._id;
  //console.log(boardId, "BoardId - ProjectsMain");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [sections, setSections] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [icon, setIcon] = useState("");
  const [newProject, setNewProject] = useState(false);

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
        //console.log("useEffect - getOneBoard");
        //console.log(boardId, "getOneBoard - ProjectsMain");
        const res = await getBoard(boardId);
        if (res) {
          console.log(res, "Res - ProjectsMain");
          setTitle(res?.title);
          setDescription(res?.description);
          setSections(res?.sections);
          setIsFavourite(res?.favourite);
          setPosition(res?.position);
          setVisibility(res?.visibility);
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

  //Done
  const addToFavourite = async () => {
    try {
      //const board = await boardApi.update(boardId, { favourite: !isFavourite });
      const board = await updateBoardFavourite(boardId, {
        favourite: !isFavourite,
      });
      let newFavouriteList = [...favouriteList];
      if (isFavourite) {
        newFavouriteList = newFavouriteList.filter((e) => e._id !== boardId);
      } else {
        newFavouriteList.unshift(board);
      }
      console.log(newFavouriteList, "newFavouriteList - ProjectsMain");
      dispatch(setFavouriteList(newFavouriteList));
      setIsFavourite(!isFavourite);
    } catch (err) {
      alert(err);
    }
  };

  const setBoardVisibility = async (visibility) => {
    console.log(visibility, "Visibility - ProjectsMain");
    try {
      await updateBoardVisibility(boardId, {
        visibility: visibility,
      });
      setVisibility(visibility);
      dispatch(toggleReloadMenu(!reloadMenu));
    } catch (err) {
      alert(err);
    }
  };

  if (!activeBoard)
    return (
      <div className="h-full ">
        <NewProject userId={userId} />
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
        <div className="flex flex-col w-full h-full overflow-hidden">
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
              <div className="flex justify-start mx-auto w-full">
                <div>
                  <h2 className="text-gray-300 p-2 font-bold bg-slate-900 ">
                    ID projektu:
                  </h2>
                </div>
                <div className="flex justify-center items-center pl-2">
                  {activeBoard._id}
                </div>
              </div>
              <div className="flex justify-start mx-auto w-full">
                <div>
                  <h2 className="text-gray-300 p-2 font-bold bg-slate-900 ">
                    Favourite( {isFavourite ? "true" : "false"}):
                  </h2>
                </div>
                <div className="flex justify-center items-center pl-2">
                  <button className="my-button-v2" onClick={addToFavourite}>
                    {isFavourite ? "disable" : "enable"}
                  </button>
                </div>
              </div>
              {userId === activeBoard.user && (
                <div className="flex justify-start mx-auto w-full">
                  <div>
                    <h2 className="text-gray-300 p-2 font-bold bg-slate-900 ">
                      Visibility({visibility}):
                    </h2>
                  </div>
                  <div className="flex justify-center items-center pl-2">
                    {visibility === "private" ? (
                      <button
                        className="my-button-v2"
                        onClick={() => setBoardVisibility("public")}
                      >
                        set public
                      </button>
                    ) : (
                      <button
                        className="my-button-v2"
                        onClick={() => setBoardVisibility("private")}
                      >
                        set private
                      </button>
                    )}
                  </div>
                </div>
              )}
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
