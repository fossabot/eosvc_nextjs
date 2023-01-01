import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      name: "John",
      username: "jdow",
      email: "john@dow.com",
      avatar: "https://i.pravatar.cc/150?img=3",
      password: "Unknown",
      accountName: "Unknown",
      is_account_admin: "false",
      is_admin: "false",
    },
    pending: false,
    error: false,
  },
  reducers: {
    updateStart: (state) => {
      state.pending = true;
    },
    updateSuccess: (state, action) => {
      state.pending = false;
      state.userInfo = action.payload;
    },
    updateError: (state) => {
      state.error = true;
      state.pending = false;
    },
    update: (state, action) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.password = action.payload.password;
      state.accountName = action.payload.accountName;
      state.is_account_admin = action.payload.is_account_admin;
      state.is_admin = action.payload.is_admin;
    },
  },
});

export const { update, updateStart, updateSuccess, updateError } =
  userSlice.actions;
export default userSlice.reducer;
