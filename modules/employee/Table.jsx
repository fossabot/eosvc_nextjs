import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getEmployees } from "./getEmployees";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "../../redux/reducer";

export default function Table() {
  //Fetch data from API and store in cache
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["employee"],
    queryFn: getEmployees,
  });

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error: {error}</div>;

  return (
    <div className="mt-8 flex flex-col text-xs">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-2 py-2">
                    <span className="text-gray-200">Name</span>
                  </th>
                  <th className="px-2 py-2">
                    <span className="text-gray-200">E-mail</span>
                  </th>
                  <th className="px-2 py-2">
                    <span className="text-gray-200">Plat</span>
                  </th>
                  <th className="px-2 py-2">
                    <span className="text-gray-200">Narozeniny</span>
                  </th>
                  <th className="px-2 py-2">
                    <span className="text-gray-200">Status</span>
                  </th>
                  <th className="px-2 py-2">
                    <span className="text-gray-200">Akce</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-200 text-sm">
                {data.map((item, i) => (
                  <Tr {...item} key={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tr({ _id, name, avatar, email, salary, date, status }) {
  const visible = useSelector((state) => state.app.client.toggleForm);
  //console.log(visible, "Table out of function");
  const dispatch = useDispatch();

  const onUpdate = () => {
    console.log(_id, "Update action");
    dispatch(toggleChangeAction(_id));
    console.log(visible, "Table");
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  const onDelete = () => {
    console.log("Delete action");
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };

  return (
    <tr className="bg-gray-50 text-center text-xs">
      <td className="px-2 py-2 flex flex-row items-center">
        <img
          src={avatar || "#"}
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-center ml-2 font-semibold">
          {name || "Neznámé"}
        </span>
      </td>
      <td>{email || "Neznámé"}</td>
      <td>{salary || "Neznámé"}</td>
      <td>{date || "Neznámé"}</td>
      <td>
        <button className="cursor">
          <span
            className={`${
              status === "Active" ? "bg-green-500" : "bg-red-500"
            } text-white px-2 py-1 rounded-sm`}
          >
            {status || "Neznámé"}
          </span>
        </button>
      </td>
      <td className="px-2 py-2 justify-around gap-4">
        <button className="cursor px-2" onClick={onUpdate}>
          <BiEdit size={15} color="green" />
        </button>
        <button className="curso px-2" onClick={onDelete}>
          <BiTrashAlt size={15} color="red" />
        </button>
      </td>
    </tr>
  );
}
