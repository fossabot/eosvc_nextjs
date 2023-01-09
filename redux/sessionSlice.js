import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSessionAsync = createAsyncThunk(
  "session/getSessionAsync",
  async (userEmail) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/user/userEmail/${userEmail}`
      );
      const session = await response.json();
      //console.log(session, "session response");
      return { session };
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  _id: "0",
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    updateSession: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: {
    [getSessionAsync.fulfilled]: (state, action) => {
      return action.payload.session;
    },
  },
});

export const { updateSession } = sessionSlice.actions;
export default sessionSlice.reducer;
