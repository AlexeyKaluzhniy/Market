import {createSlice} from "@reduxjs/toolkit";
import {ImageOrVideo} from "react-native-image-crop-picker";
import {RootState} from "~/core/store/rootReducer";

interface IDraftsState {
    id: string;
    title: string;
    price: string;
    priceType: string;
    city: string;
    description: string;
    images: ImageOrVideo[];
}

const initialState: IDraftsState[] = [];

export const {reducer: DraftsReducer, actions} = createSlice({
    name: 'drafts',
    initialState,
    reducers: {
        addDraft: (state, action) => {
            const newDraft = {
                id: state.length !== 0 ? state[state.length - 1].id + 1 : 1,
                ...action.payload
            };

            return [...state, newDraft];
        },
        removeDraft: (state, action) => {
            return [...state.filter(el => el.id !== action.payload.id)];
        },
        updateDraft: (state, action) => {
            return state.map(draft => {
                if (draft.id == action.payload.id) {
                    return {
                        ...draft,
                        ...action.payload
                    };
                }

                return draft;
            });
        }
    }
});

export const selectDrafts = (state: RootState) => {
    return state.drafts;
};
