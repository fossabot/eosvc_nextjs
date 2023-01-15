import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: {
    toggleMenu: false,
  },
};

export const projectStateSlice = createSlice({
  name: "projectState",
  initialState,
  reducers: {
    toggleReloadMenu: (state) => {
      state.menu.toggleMenu = !state.menu.toggleMenu;
    },
  },
});

export const { toggleReloadMenu } = projectStateSlice.actions;

export default projectStateSlice.reducer;
