import { Schema, models, model } from "mongoose";
import { schemaOptions } from "./modelOptions";

const boardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
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
      default: `Add description here
    🟢 You can add multiline description
    🟢 Let's start...`,
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

const Boards = models.boards || model("boards", boardSchema);
export default Boards;
