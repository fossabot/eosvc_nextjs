import React from "react";
import Template from "../layout/template";
import TableUi from "../components/tables/TableUi";
import Test from "../components/modals/test";
import DocumentsPage from "../modules/documents/documents";

function Demo() {
  return (
    <Template>
      <div className="p-2 space-y-5">
        {/* <DocumentsPage /> <Test /> */}

        {/* <DocumentsPage />*/}
        <TableUi />
      </div>
    </Template>
  );
}

export default Demo;
