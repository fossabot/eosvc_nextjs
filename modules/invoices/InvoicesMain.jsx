import FileUploadForm from "./components/FileUploadForm";
import InvoiceTable from "./components/InvoiceTable";

function InvoicesMain() {
  return (
    <div className=" p-5 overflow-auto">
      <FileUploadForm />
      <InvoiceTable />
    </div>
  );
}

export default InvoicesMain;
