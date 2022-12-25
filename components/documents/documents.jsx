import React, { useState } from "react";
import { addImage } from "./images/addImage";

function DocumentsPage() {
  const [highlighted, setHighlighted] = useState(false);
  const [image, setImage] = useState(
    "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
  );

  const [postImage, setPostImage] = useState({ myFile: "" });

  const createPost = async (newImage) => {
    try {
      // await fetch("/api/documents/images");
      addImage(newImage);
      //await axios.post(url, newImage);
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

  return (
    <div className=" p-5">
      <div className="flex flex-col items-center justify-center p-5 space-y-5">
        <h1>File drop zone</h1>
        <div
          className={`border border-gray-600 p-10 ${
            highlighted ? "bg-green-500" : "bg-yellow-500"
          }`}
          onDragEnter={() => {
            setHighlighted(true);
          }}
          onDragLeave={() => {
            setHighlighted(false);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            setHighlighted(false);
            console.log(e.dataTransfer.files);
            Array.from(e.dataTransfer.files)
              .filter((file) => file.type === "image/jpeg" || "image/png")
              .forEach(async (file) => {
                const base64 = await convertToBase64(file);
                setPostImage({ ...postImage, myFile: base64 });
                console.log(base64, "file b64");
              });
          }}
        >
          File drop zone
        </div>
        <div>
          <img src={postImage.myFile || image} alt="" />
        </div>
        <div className="border border-black">
          <form
            className="flex flex-col justify-center items-center p-5 space-y-5"
            onSubmit={handleSubmit}
          >
            <label htmlFor="file-upload" className="">
              <img src={postImage.myFile || image} alt="" />
            </label>
            <input
              type="file"
              label="Image"
              name="myFile"
              id="file-upload"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleFileUpload(e)}
            />
            <h3>Test image upload</h3>
            <span>Designers</span>
            <button className="bg-gray-500  px-5 py-3 rounded-md text-white font-bold ">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DocumentsPage;

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
