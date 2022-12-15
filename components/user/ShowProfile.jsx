import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getUsers } from "./getUsers";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "../../redux/reducer";

export default function Table() {
  //Fetch data from API and store in cache
  const { isLoading, isError, data, error } = useQuery("user", getUsers);
  console.log(data);

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error: {error}</div>;

  const onUpdate = () => {};

  const onDelete = () => {};

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-6 py-3 border-b border-gray-700">
            <img src="#" alt="" />
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">E-mail</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Heslo</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Akce</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        <tr>
          <td>{data[0].name}</td>
        </tr>
        <tr>
          <td>{data[0].email}</td>
        </tr>
        <tr>
          <td>{data[0].password}</td>
        </tr>
        <tr>
          <td className="px-16 py-2 justify-around gap-4">
            <button className="cursor px-2" onClick={onUpdate}>
              <BiEdit size={25} color="green" />
            </button>
            <button className="curso px-2" onClick={onDelete}>
              <BiTrashAlt size={25} color="red" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
