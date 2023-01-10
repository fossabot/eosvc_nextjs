import { configureStore } from "@reduxjs/toolkit";
//Redux Slices
import demoReducer from "./demoSlice";
import Reducer from "./reducer";
import boardReducer from "./features/boardSlice";
import sectionReducer from "./projects/sectionSlice";
import activeBoardReducer from "./projects/activeBoardSlice";
import favouriteReducer from "./features/favouriteSlice";
import userReducer from "./userSlice";
import secondBrainReducer from "./secondBrain/secondBrainSlice";
import sessionReducer from "./sessionSlice";
import loadingReducer from "./loadingSlice";
//Redux Middleware
import listenerMiddleware from "./listener";

export const store = configureStore({
  reducer: {
    app: Reducer,
    boards: boardReducer,
    demo: demoReducer,
    section: sectionReducer,
    activeBoard: activeBoardReducer,
    favourites: favouriteReducer,
    user: userReducer,
    secondBrain: secondBrainReducer,
    session: sessionReducer,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
