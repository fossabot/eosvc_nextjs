import FileUploadForm from "./components/FileUploadForm";
import InvoiceTable from "./components/InvoiceTable";

function InvoicesMain() {
  return (
    <div className=" w-full px-5">
      <FileUploadForm />

      <InvoiceTable />
    </div>
  );
}

export default InvoicesMain;
