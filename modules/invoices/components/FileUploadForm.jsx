import React, { useState } from "react";
import { convertToBase64 } from "../../../utils/convertToBase64";
import { addInvoice } from "../apiCalls/addInvoice";
import { FileUpload } from "primereact/fileupload";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";

const FileUploadForm = () => {
  const [postInvoice, setPostInvoice] = useState({ invoice_file: "" });

  //S3
  const [file, setFile] = useState();
  const [progress, setProgress] = useState();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const createPost = async (newInvoice) => {
    console.log(newInvoice, "createPost");
    try {
      addInvoice(newInvoice);
    } catch (error) {
      console.log(error);
    }
  };

  /*   const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postInvoice);
    console.log(postInvoice, "handelSubmit createPost");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
    console.log(base64, "file b64");
  }; */
  const handelChange = async (e) => {
    setFile(e.target.files[0]);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log("handelSubmit");

    if (!file) return;
    setSubmitting(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    const option = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentComplete =
          Math.round(progress.loaded * 100) / progress.total;
      },
    };

    try {
      const res = await fetch("/api/s3", option);
      const data = await res.json();
      console.log(data, "res data");
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setSubmitting(false);
      setProgress(0);
    }
  };

  return (
    <div className="flex flex-row w-full  items-center justify-center gap-2">
      <div className="w-1/2">
        <FileUpload
          name="invoice"
          mode="advanced"
          url="/api/digitalOcean"
          emptyTemplate={"Drag & Drop a file here or click to choose a file."}
          headerStyle={{ textAlign: "center" }}
          auto={true}
        ></FileUpload>
      </div>
      {/*  <div>
        {error && <div className="error">{error}</div>}
        {submitting && <div className="progress">{progress}</div>}
        <form onSubmit={handelSubmit}>
          <input type="file" onChange={handelChange} />
          <button className="my-button-v2" type="submit">
            Odeslat soubor do AWS S3
          </button>
        </form>
      </div> */}
      {/*     <div className="w-1/2">
        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
          <div className="space-y-5 text-center">
            <div
              className="flex text-sm text-gray-600 py-5"
              onDragEnter={() => {
                //setHighlighted(true);
              }}
              onDragLeave={() => {
                //setHighlighted(false);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                //setHighlighted(false);
                console.log(e.dataTransfer.files);
                Array.from(e.dataTransfer.files)
                  .filter(
                    (file) =>
                      file.type === "image/jpeg" || "image/png" || "file/pdf"
                  )
                  .forEach(async (file) => {
                    const base64 = await convertToBase64(file);
                    setPostInvoice({ ...postInvoice, invoice_file: base64 });
                    //console.log(base64, "file b64");
                  });
                createPost(postInvoice);
              }}
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PDF, PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default FileUploadForm;
