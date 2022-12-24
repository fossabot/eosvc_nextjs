import { Schema, models, model } from "mongoose";
import { schemaOptions } from "./modelOptions";

const taskSchema = new Schema(
  {
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    position: {
      type: Number,
    },
  },
  { collection: "Tasks" },
  schemaOptions
);

const Tasks = models.tasks || model("tasks", taskSchema);
export default Tasks;
