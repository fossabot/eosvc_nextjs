import React, { useState } from "react";
import { addImage } from "./apiCalls/addImage";
import useSWR from "swr";
import { convertToBase64 } from "../../utils/convertToBase64";
import FileUploadForm from "./components/FileUploadForm";
import InvoiceTable from "./components/InvoiceTable";
import LoadingSpinner from "../../components/loadings/LoadingSpinner";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

function InvoicesMain() {
  const [highlighted, setHighlighted] = useState(false);
  const [image, setImage] = useState(
    "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
  );
  const [postImage, setPostImage] = useState({ myFile: "" });

  const { data, error } = useSWR("/api/documents/images", fetcher);

  if (error) return <div>Some error happened:{error}</div>;
  if (!data) {
    return <LoadingSpinner message={"Načítá data ..."} />;
  } else {
    return (
      <div className=" p-5 overflow-auto">
        <FileUploadForm />
        <InvoiceTable />
      </div>
    );
  }
}

export default InvoicesMain;
