import {combineReducers} from "@reduxjs/toolkit";
import {SystemReducer} from "./system/systemSlice";
import {authorizationApi} from "~/core/store/api/auth/authQuery";
import {FilterReducer} from "./filter/filterSlice";
import {DraftsReducer} from "~/core/store/drafts/draftsSlice";
import {advertisementApi} from "~/core/store/api/ad/adQuery";
import {AuthReducer} from "~/core/store/authentication/authenticationSlice";

export const rootReducer = combineReducers({
    system: SystemReducer,
    filter: FilterReducer,
    drafts: DraftsReducer,
    auth: AuthReducer,
    [authorizationApi.reducerPath]: authorizationApi.reducer,
    [advertisementApi.reducerPath]: advertisementApi.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
