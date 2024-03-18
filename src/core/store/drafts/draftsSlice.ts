import {createSlice} from "@reduxjs/toolkit";
import {ImageOrVideo} from "react-native-image-crop-picker";

interface IDraftsState {
    title: string | undefined;
    price: string | undefined;
    city: string | undefined;
    description: string | undefined;
    images: ImageOrVideo[] | undefined;
}

const initialState: IDraftsState[] = [];

export const {reducer: DraftsReducer, actions} = createSlice({
    name: 'drafts',
    initialState,
    reducers: {
        addDraft: (state, action) => {
            return [...state, action.payload];
        },
        removeDraft: (state, action) => {
            return [...state.filter(el => el !== action.payload)];
        }
    }
});
