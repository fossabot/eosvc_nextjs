import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: {
    toggleForm: false,
    toggleShowAccount: false,
    formId: undefined,
    deleteId: null,
  },
};

export const ReducerSlice = createSlice({
  name: "crudapp",
  initialState,
  reducers: {
    toggleChangeAction: (state) => {
      state.client.toggleForm = !state.client.toggleForm;
    },
    toggleChangeActionAccount: (state) => {
      state.client.toggleShowAccount = !state.client.toggleShowAccount;
    },
    updateAction: (state, action) => {
      state.client.formId = action.payload;
    },
    deleteAction: (state, action) => {
      state.client.deleteId = action.payload;
    },
  },
});

export const {
  toggleChangeAction,
  toggleChangeActionAccount,
  updateAction,
  deleteAction,
} = ReducerSlice.actions;

export default ReducerSlice.reducer;
