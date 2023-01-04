import { Schema, models, model } from "mongoose";
import { schemaOptions } from "./modelOptions";

const boardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    visibility: {
      type: String,
      default: "public",
    },
    icon: {
      type: String,
      default: "📃",
    },
    title: {
      type: String,
      default: "Untitled",
    },
    description: {
      type: String,
      default: `Popis projektu`,
    },
    position: {
      type: Number,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    favouritePosition: {
      type: Number,
      default: 0,
    },
  },
  { collection: "Boards" },
  schemaOptions
);

const Boards = models.Boards || model("Boards", boardSchema);
export default Boards;
