import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      name: "",
      username: "",
      email: "",
      avatar: "/assets/nouser.png",
      password: "",
      accountName: "",
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
      state.userInfo.id = action.payload.id;
      state.userInfo.name = action.payload.name;
      state.userInfo.username = action.payload.username;
      state.userInfo.email = action.payload.email;
      state.userInfo.avatar = action.payload.avatar;
      state.userInfo.password = action.payload.password;
      state.userInfo.accountName = action.payload.accountName;
      state.userInfo.is_account_admin = action.payload.is_account_admin;
      state.userInfo.is_admin = action.payload.is_admin;
    },
  },
});

export const { update, updateStart, updateSuccess, updateError } =
  userSlice.actions;
export default userSlice.reducer;
