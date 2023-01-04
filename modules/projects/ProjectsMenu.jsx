import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { createBoard } from "./apiCalls/createBoard";
import LoadingSpinner from "../../components/loadings/LoadingSpinner";
import { getUserId } from "../user/apiCalls/getUserId";

function ProjectsMenu() {
  const { data: session } = useSession();
  const { isLoading, data } = useQuery("user", () =>
    getUserId(session.user.email)
  );

  const { id } = useSelector((state) => state.user.userInfo);
  console.log(id, "id");
  if (isLoading)
    return <LoadingSpinner message={"Čekám na Id uživatele ..."} />;

  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <div>
        <h1> Projects menu</h1>
      </div>
      <div className="border border-gray-500 rounded-md py-2 px-2 w-full">
        <button
          className="my-button"
          onClick={async () => await createBoard(data._id)}
        >
          Přidat projekt
        </button>
      </div>
    </div>
  );
}

export default ProjectsMenu;
