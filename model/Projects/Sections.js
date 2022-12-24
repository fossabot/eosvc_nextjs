import { Schema, models, model } from "mongoose";
import { schemaOptions } from "./modelOptions";

const sectionSchema = new Schema(
  {
    board: {
      type: Schema.Types.ObjectId,
      ref: "Boards",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  { collection: "Sections" },
  schemaOptions
);

const Sections = models.secitions || model("sections", sectionSchema);
export default Sections;
