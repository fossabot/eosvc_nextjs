import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CrmTable from "../CRM/crmTable";
import CrmForm from "../CRM/crmForm";
import { FiUserPlus } from "react-icons/fi";
import { BiX, BiCheck } from "react-icons/bi";
import { deleteAccount } from "../CRM/Accounts/deleteAccount";
import { toggleChangeActionAccount, deleteAction } from "../../redux/reducer";
import { getAccounts } from "../CRM/Accounts/getAccounts";

export default function CRM() {
  //Get state from Global redux store /redux/store
  const visible = useSelector((state) => state.app.client.toggleShowAccount);
  //const visible = true;
  const deleteId = useSelector((state) => state.app.client.deleteId);

  const queryclient = useQueryClient();
  const dispatch = useDispatch();

  //Change onClick global state of visible variable to show add Account form
  const handler = () => {
    dispatch(toggleChangeActionAccount());
  };

  const deletehandler = async () => {
    if (deleteId) {
      await deleteAccount(deleteId);
      await queryclient.prefetchQuery("accounts", getAccounts);
      await dispatch(deleteAction(null));
    }
  };

  const canclehandler = async () => {
    console.log("cancel");
    await dispatch(deleteAction(null));
  };
  //console.log(visible);
  return (
    <main className="w-full px-5 space-y-5">
      <div className="flex justify-between items-start w-full pt-5">
        <div className="flex">
          <button
            onClick={handler}
            className="bg-yellow-500 rounded-md justify-center items-center px-4 py-2 text-white text-sm font-bold flex flex-row gap-2"
          >
            Přidat Firmu <FiUserPlus />
          </button>
        </div>

        {deleteId ? DeleteComponent({ deletehandler, canclehandler }) : <></>}
      </div>
      <div>
        {/* Collapsable form */}
        {visible ? <CrmForm /> : <></>}
        {/* Table with data */}
      </div>

      <div className="">
        <CrmTable />
      </div>
    </main>
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
