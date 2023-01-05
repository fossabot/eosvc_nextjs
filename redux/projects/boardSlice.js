import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardInfo: {
    id: "1",
    title: "neco",
    description: "neco",
  },
  pending: false,
  error: false,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateStart: (state) => {
      state.pending = true;
    },
    updateSuccess: (state, action) => {
      state.pending = false;
      state.boardInfo = action.payload;
    },
    updateError: (state) => {
      state.error = true;
      state.pending = false;
    },
    update: (state, action) => {
      state.boardInfo.id = action.payload.id;
      state.boardInfo.title = action.payload.title;
      state.boardInfo.description = action.payload.description;
    },
  },
});

export const { update, updateStart, updateSuccess, updateError } =
  boardSlice.actions;

export default boardSlice.reducer;
