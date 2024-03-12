import {combineReducers} from "@reduxjs/toolkit";
import {SystemReducer} from "./system/systemSlice";
import {authorizationApi} from "./auth/authQuery";
import {FilterReducer} from "./filter/filterSlice";

export const rootReducer = combineReducers({
  system: SystemReducer,
  filter: FilterReducer,
  [authorizationApi.reducerPath]: authorizationApi.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
