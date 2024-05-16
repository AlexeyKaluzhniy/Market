import {createSlice} from "@reduxjs/toolkit";
import {AuthInitialState, IAuthState} from "~/core/store/authentication/authenticationState";

function saveToken(state: IAuthState, action: {payload: string}) {
    return {
        ...state,
        accessToken: action.payload,
    };
}

export const {reducer: AuthReducer, actions: AuthActions} = createSlice({
    name: 'authentication',
    initialState: AuthInitialState,
    reducers: {
        saveToken: saveToken
    }
});
