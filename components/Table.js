import { BiEdit, BiTrashAlt } from "react-icons/bi";
//import data from "../database/data.json";
import { getEmployee } from "./employee/fetchEmployee";
import { useQuery } from "react-query";

export default function Table() {
  //getEmployee().then((res) => console.log(res));
  const { isLoading, isError, data, error } = useQuery("employee", getEmployee);
  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error: {error}</div>;

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">E-mail</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Plat</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Narozeniny</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Akce</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data.map((item, i) => (
          <Tr {...item} key={i} />
        ))}
      </tbody>
    </table>
  );
}

function Tr({ id, name, avatar, email, salary, date, status }) {
  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
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
              status === active ? "bg-green-500" : "bg-red-500"
            } text-white px-5 py-1 rounded-full`}
          >
            {status || "Neznámé"}
          </span>
        </button>
      </td>
      <td className="px-16 py-2 justify-around gap-4">
        <button className="cursor px-2">
          <BiEdit size={25} color="green" />
        </button>
        <button className="curso px-2">
          <BiTrashAlt size={25} color="red" />
        </button>
      </td>
    </tr>
  );
}
