import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getAccounts } from "./Accounts/getAccounts";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleChangeActionAccount,
  updateAction,
  deleteAction,
} from "../../redux/reducer";

export default function CrmTable() {
  //Fetch data from API and store in cache
  //const { isLoading, isError, data, error } = useQuery("accounts", getAccounts);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
  });

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error: {error}</div>;

  //console.log(data);
  return (
    <table className="min-w-full table-auto text-sm">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-8 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-8 py-2">
            <span className="text-gray-200">E-mail</span>
          </th>
          <th className="px-8 py-2">
            <span className="text-gray-200">IČO</span>
          </th>
          <th className="px-8 py-2">
            <span className="text-gray-200">Mobil</span>
          </th>
          <th className="px-8 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-8 py-2">
            <span className="text-gray-200">Akce</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data && data.map((item, i) => <Tr {...item} key={i} />)}
      </tbody>
    </table>
  );
}

function Tr({ _id, name, company_id, email, office_phone, status }) {
  const visible = useSelector((state) => state.app.client.toggleShowAccount);
  //console.log(visible, "Table out of function");
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeActionAccount(_id));
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
    <tr className="bg-gray-50 text-center hover:bg-gray-200">
      <td className="px-2 py-2 flex flex-row items-center">
        <span className="text-center ml-2 font-semibold">
          {name || "Neznámé"}
        </span>
      </td>
      <td>{email || "Neznámé"}</td>
      <td>{company_id || "Neznámé"}</td>
      <td>{office_phone || "Neznámé"}</td>
      <td className="">
        <button
          className={`cursor w-full ${
            status === "Active" ? "bg-green-500" : "bg-red-500"
          } rounded-md  border`}
          onClick={onUpdate}
        >
          <span
            className={`${
              status === "Active" ? "bg-green-500" : "bg-red-500"
            } text-white text-xs px-2 rounded-md `}
          >
            {status || "Neznámé"}
          </span>
        </button>
      </td>
      <td className="px-16 py-2 justify-around gap-4">
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
