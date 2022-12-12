import { BiEdit, BiTrashAlt } from "react-icons/bi";

export default function Table() {
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
        <tr className="bg-gray-50 text-center">
          <td className="px-16 py-2 flex flex-row items-center">
            <img src="#" alt="" />
            <span className="text-center ml-2 font-semibold">
              Pavel Dovhomilja
            </span>
          </td>
          <td>pavel@dovhomilja.cz</td>
          <td>200.000CZK</td>
          <td>4.8.1981</td>
          <td>
            <button className="cursor">
              <span className="bg-green-500 text-white px-5 py-1 rounded-full">
                Aktivní
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
      </tbody>
    </table>
  );
}
