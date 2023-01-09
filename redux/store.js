import { configureStore } from "@reduxjs/toolkit";
//Redux Slices
import Reducer from "./reducer";
import boardReducer from "./features/boardSlice";
import activeBoardReducer from "./projects/activeBoardSlice";
import favouriteReducer from "./features/favouriteSlice";
import userReducer from "./userSlice";
import sessionReducer from "./sessionSlice";
import loadingReducer from "./loadingSlice";
//Redux Middleware
import listenerMiddleware from "./listener";

export const store = configureStore({
  reducer: {
    app: Reducer,
    boards: boardReducer,
    activeBoard: activeBoardReducer,
    favourites: favouriteReducer,
    user: userReducer,
    session: sessionReducer,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
