import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CrmTable from "../../components/CRM/crmTable";
import CrmForm from "../../components/CRM/crmForm";
import { FiUserPlus } from "react-icons/fi";
import { toggleChangeActionAccount } from "../../redux/reducer";

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
      await deleteEmployee(deleteId);
      await queryclient.prefetchQuery("employee", getEmployees);
      await dispatch(deleteActionAccount(null));
    }
  };

  const canclehandler = async () => {
    console.log("cancel");
    await dispatch(deleteAction(null));
  };
  //console.log(visible);
  return (
    <main className="w-full h-full">
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl font-bold">CRM</h1>
        <div className="flex justify-between items-start w-full px-5">
          <div className="left flex gap-3">
            <button
              onClick={handler}
              className="bg-yellow-500 rounded-md justify-center items-center px-4 py-2 text-white text-sm font-bold flex flex-row gap-2"
            >
              Přidat Firmu <FiUserPlus />
            </button>
          </div>

          {deleteId ? DeleteComponent({ deletehandler, canclehandler }) : <></>}
        </div>
        {/* Collapsable form */}
        {visible ? <CrmForm /> : <></>}
        {/* Table with data */}
        <div className="containter">
          <CrmTable />
        </div>
      </div>
    </main>
  );
}
