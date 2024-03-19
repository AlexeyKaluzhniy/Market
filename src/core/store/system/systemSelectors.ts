import {RootState} from "~/core/store/rootReducer";

export const selectAppTheme = (state: RootState) => {
    return state.system.appTheme;
};

export const selectAppLanguage = (state: RootState) => {
    return state.system.language;
};
