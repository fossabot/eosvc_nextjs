import { Schema, models, model } from "mongoose";

const imageUploadSchema = new Schema(
  {
    myFile: {
      type: String,
      required: true,
    },
  },
  { collection: "ImageUpload" }
);

const ImageUpload =
  models.imageUpload || model("imageUpload", imageUploadSchema);

export default ImageUpload;
