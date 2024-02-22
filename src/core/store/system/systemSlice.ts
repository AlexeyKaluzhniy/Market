import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppThemeType, SystemInitialState, SystemState} from "./systemState";
import {REHYDRATE} from "redux-persist/es/constants";
import {RehydrateAppAction} from "~/types";
import {newState} from "~/common/utils/newState";
import {Languages, setLanguage} from "~/common/localization/localization";

function rehydrate(state: SystemState, rehydrateParams: RehydrateAppAction) {
  return newState(rehydrateParams.payload?.system || state, {isOnboardingVisited: rehydrateParams.payload != null});
}

const changeLang = createAsyncThunk<Languages, Languages>("menu/changeLanguage", async (language) => {
  await setLanguage(language);

  return language;
});

function setAppTheme(state: SystemState, {payload}: {payload: AppThemeType}) {
  return newState(state, {appTheme: payload});
}

function setIsOnboardingVisited(state: SystemState, {payload}: {payload: boolean | undefined}) {
  return newState(state, {isOnboardingVisited: payload});
}

function setDeviceTheme(state: SystemState, {payload}: {payload: AppThemeType | undefined}) {
  return newState(state, {deviceTheme: payload});
}

export const {reducer: SystemReducer, actions: SystemActions} = createSlice({
  name: "system",
  initialState: SystemInitialState,
  reducers: {
    setIsOnboardingVisited,
    setAppTheme,
    setDeviceTheme,
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, rehydrate);
    builder.addCase(changeLang.fulfilled, (state, action) => {
      state.language = action.payload;
    });
  },
});
