import { useState } from "react";
import { useSelector } from "react-redux";
import NewProjectForm from "./NewProjectForm";
import { deleteProject } from "./apiCalls/deleteProject";
import { toggleReloadMenu } from "../../redux/toggleProjects";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../../components/loadings/LoadingSpinner";

function ProjectsHeader() {
  //State for chose actual project
  const dispatch = useDispatch();
  const activeBoard = useSelector((state) => state.activeBoard.value);
  const reloadMenu = useSelector((state) => state.projectState.menu.toggleMenu);
  const [isLoading, setIsLoading] = useState(false);

  //State for addProject Modal
  const [visible, setVisible] = useState(false);

  const handleDeleteProject = async () => {
    console.log(activeBoard._id, "Delete board id");
    try {
      setIsLoading(true);
      await deleteProject(activeBoard._id);
      dispatch(toggleReloadMenu(!reloadMenu));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <LoadingSpinner message="Mažu projekt ..." />;
  return (
    <div className="flex flex-col justify-center items-center mx-auto pt-2">
      <div className="flex flex-row gap-2 rounded-md py-2 px-2 w-full">
        <button className="my-button" onClick={() => setVisible(!visible)}>
          Přidat projekt
        </button>
        <button className="my-button" onClick={handleDeleteProject}>
          Smazat aktuální projekt
        </button>
      </div>
      <NewProjectForm visible={visible} onFinish={() => setVisible(false)} />
    </div>
  );
}

export default ProjectsHeader;
