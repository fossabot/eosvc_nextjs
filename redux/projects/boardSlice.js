import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

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
      state.value = action.payload;
    },
  },
});

export const { update, updateStart, updateSuccess, updateError } =
  boardSlice.actions;

export default boardSlice.reducer;
