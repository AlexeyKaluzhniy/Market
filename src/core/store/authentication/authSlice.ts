import {createSlice} from "@reduxjs/toolkit";
import {AuthInitialState, IAuthState} from "~/core/store/authentication/authState";

function saveTokens(state: IAuthState, action: {payload: {accessToken: string; refreshToken: string}}) {
    return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
    };
}

export const {reducer: AuthReducer, actions: AuthActions} = createSlice({
    name: 'authentication',
    initialState: AuthInitialState,
    reducers: {
        saveToken: saveTokens
    }
});
