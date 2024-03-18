import {combineReducers} from "@reduxjs/toolkit";
import {SystemReducer} from "./system/systemSlice";
import {authorizationApi} from "./auth/authQuery";
import {FilterReducer} from "./filter/filterSlice";
import {DraftsReducer} from "~/core/store/drafts/draftsSlice";

export const rootReducer = combineReducers({
    system: SystemReducer,
    filter: FilterReducer,
    drafts: DraftsReducer,
    [authorizationApi.reducerPath]: authorizationApi.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
