import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: {
    toggleView: false,
    todoList: [{}],
  },
};

export const secondBrainSlice = createSlice({
  name: "secondBrain",
  initialState,
  reducers: {
    toggleView: (state) => {
      state.todo.toggleView = !state.todo.toggleView;
    },
    addTodo: (state, action) => {
      const newTodo = {
        id: Math.random().toString(),
        title: action.payload.title,
        description: action.payload.description,
        date: Date.now(),
        completed: false,
      };
      console.log(newTodo);
      state.todo.todoList.push(newTodo);
    },
  },
});

export const { toggleView, addTodo } = secondBrainSlice.actions;
export default secondBrainSlice.reducer;
