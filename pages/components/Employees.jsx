import Table from "../../components/Table";
import { FiUserPlus } from "react-icons/fi";
import Form from "../../components/employee/form";

function Crm() {
  return (
    <main className="w-full h-full">
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl font-bold">Zaměstnanci</h1>
        <div className="items-start w-full px-5">
          <button className="bg-yellow-500 rounded-md justify-center items-center px-4 py-2 text-white text-sm font-bold flex flex-row gap-2">
            Přidat zamětnance <FiUserPlus />
          </button>
        </div>
        {/* Collapsable form */}
        <div className="containter w-full px-16">
          <Form />
        </div>
        {/* Table with data */}
        <div className="containter">
          <Table />
        </div>
      </div>
    </main>
  );
}

export default Crm;
