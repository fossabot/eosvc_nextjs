import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    demo: "demo",
  },
};

export const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    demoState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { demoState } = demoSlice.actions;
export default demoSlice.reducer;
