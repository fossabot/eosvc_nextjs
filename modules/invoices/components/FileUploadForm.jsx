import React from "react";

const FileUploadForm = () => {
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

  return (
    <div className="col-span-3">
      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
        <div className="space-y-5 text-center">
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
          <div
            className="flex text-sm text-gray-600 py-5"
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
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  );
};

export default FileUploadForm;

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
