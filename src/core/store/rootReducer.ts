import {combineReducers} from "@reduxjs/toolkit";
import {SystemReducer} from "./system/systemSlice";
import {authorizationApi} from "./auth/authQuery";

export const rootReducer = combineReducers({
  system: SystemReducer,
  [authorizationApi.reducerPath]: authorizationApi.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
