import Table from "../Table";
import { FiUserPlus } from "react-icons/fi";
import Form from "../employee/form";
import { BiX, BiCheck } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, deleteAction } from "../../redux/reducer";
import { useQueryClient } from "react-query";
import { deleteEmployee } from "../employee/deleteEmployee";
import { getEmployees } from "../employee/getEmployees";

export default function Employees() {
  //Get state from Global redux store /redux/store
  const visible = useSelector((state) => state.app.client.toggleForm);

  const deleteId = useSelector((state) => state.app.client.deleteId);
  const queryclient = useQueryClient();

  const dispatch = useDispatch();

  const handler = () => {
    dispatch(toggleChangeAction());
  };

  const deletehandler = async () => {
    if (deleteId) {
      await deleteEmployee(deleteId);
      await queryclient.prefetchQuery("employee", getEmployees);
      await dispatch(deleteAction(null));
    }
  };

  const canclehandler = async () => {
    console.log("cancel");
    await dispatch(deleteAction(null));
  };

  return (
    <container className="w-full h-full">
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex justify-between items-start w-full px-5">
          <div className="left flex gap-3">
            <button
              onClick={handler}
              className="bg-gray-500 rounded-md justify-center items-center px-4 py-2 text-white text-sm font-bold flex flex-row gap-2"
            >
              Přidat zamětnance <FiUserPlus />
            </button>
          </div>

          {deleteId ? DeleteComponent({ deletehandler, canclehandler }) : <></>}
        </div>
        {/* Collapsable form */}
        {visible ? <Form /> : <></>}
        {/* Table with data */}
        <div className="containter w-full px-2">
          <Table />
        </div>
      </div>
    </container>
  );
}

function DeleteComponent({ deletehandler, canclehandler }) {
  return (
    <div className="flex gap-5">
      <button>Are you sure?</button>
      <button
        onClick={deletehandler}
        className="flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50"
      >
        Yes
        <span className="px-1">
          <BiX color="rgb(255 255 255)" size={25} />
        </span>
      </button>
      <button
        onClick={canclehandler}
        className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gree-500 hover:border-green-500 hover:text-gray-50"
      >
        No
        <span className="px-1">
          <BiCheck color="rgb(255 255 255)" size={25} />
        </span>
      </button>
    </div>
  );
}
