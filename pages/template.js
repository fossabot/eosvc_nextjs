import { useEffect, useRef, useState } from "react";
import Template from "../layout/template";
import TableUi from "../components/tables/TableUi";
import Test from "../components/modals/test";
import DocumentsPage from "../modules/documents/documents";

function Demo() {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  function handleBlur() {
    console.log("Input value changed to:", inputRef.current.value);
    setInputValue(""); // Clear the input field
  }

  return (
    <Template>
      <div className="p-2 space-y-5">
        {/* <DocumentsPage /> <Test /> */}
        <div>
          <form>
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onBlur={handleBlur}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        </div>
        {/* <DocumentsPage />*/}
        <TableUi />
      </div>
    </Template>
  );
}

export default Demo;
