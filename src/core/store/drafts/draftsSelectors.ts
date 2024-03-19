import {RootState} from "~/core/store/rootReducer";

export const selectDrafts = (state: RootState) => {
    return state.drafts;
};
