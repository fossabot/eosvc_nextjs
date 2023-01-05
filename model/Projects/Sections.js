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

const Sections = models.Sections || model("Sections", sectionSchema);
export default Sections;
