import React from "react";
import Template from "../layout/template";
import TableUi from "../components/tables/TableUi";
import Test from "../components/modals/test";
import DocumentsPage from "../components/documents/documents";

function Demo() {
  return (
    <Template>
      <div className="border border-blue-500 p-5 space-y-5">
        <Test />
        {/* <DocumentsPage />*/}
        <TableUi />
      </div>
    </Template>
  );
}

export default Demo;
