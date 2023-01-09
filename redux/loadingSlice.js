import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    loadingState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loadingState } = loadingSlice.actions;
export default loadingSlice.reducer;
