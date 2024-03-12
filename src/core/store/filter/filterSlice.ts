import {createSlice} from "@reduxjs/toolkit";

interface IFilterState {
    cities: string[];
    priceFrom: string;
    priceTo: string;
}

const initialState: IFilterState = {
    cities: [],
    priceFrom: '',
    priceTo: ''
};

export const {reducer: FilterReducer, actions} = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        selectCity: (state, action) => {
            return {...state, cities: [...state.cities, action.payload]};
        },
        deselectCity: (state, action) => {
            return {...state, cities: state.cities.filter(city => city !== action.payload)};
        },
        deselectAll: (state) => {
            return {...state, cities: []};
        },
        setPriceFrom: (state, action) => {
            return {...state, priceFrom: action.payload};
        },
        setPriceTo: (state, action) => {
            return {...state, priceTo: action.payload};
        },
    }
});
