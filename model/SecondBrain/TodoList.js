import { Schema, models, model } from "mongoose";

const todoListSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    createdAt: {
      type: Date,
    },
    title: {
      type: String,
    },
    url: {
      type: String,
    },
    description: {
      type: String,
    },
    position: {
      type: Number,
    },
    private: {
      type: Boolean,
      default: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "TodoList" }
);

const TodoList = models.TodoList || model("TodoList", todoListSchema);
export default TodoList;
