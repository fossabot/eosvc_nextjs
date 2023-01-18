import React, { useState } from "react";
import { addImage } from "./images/addImage";
import useSWR from "swr";
import { convertToBase64 } from "../../utils/convertToBase64";
import FileUploadForm from "./components/FileUploadForm";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

function InvoicesMain() {
  const [highlighted, setHighlighted] = useState(false);
  const [image, setImage] = useState(
    "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
  );
  const [postImage, setPostImage] = useState({ myFile: "" });

  const { data, error } = useSWR("/api/documents/images", fetcher);

  const createPost = async (newImage) => {
    try {
      addImage(newImage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
    console.log(postImage, "postImage");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
    console.log(base64, "file b64");
  };

  if (error) return <div>Some error happened:{error}</div>;
  if (!data) {
    return <div>Loading ...</div>;
  } else {
    return (
      <div className=" p-5 overflow-auto">
        <FileUploadForm />
      </div>
    );
  }
}

export default InvoicesMain;
/*
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
*/
