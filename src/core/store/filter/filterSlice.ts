import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "~/core/store/rootReducer";

interface IFilterState {
    cities: string[];
    priceFrom: string;
    priceTo: string;
    searchStr: string;
    filters: {
        cities: string[];
        priceFrom: string;
        priceTo: string;
    };
}

const initialState: IFilterState = {
    cities: [],
    priceFrom: '',
    priceTo: '',
    searchStr: '',
    filters: {
        cities: [],
        priceFrom: '',
        priceTo: ''
    },
};

export const {reducer: FilterReducer, actions} = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        selectCity: (state, action) => {
            return {...state, cities: [...state.cities, action.payload]};
        },
        resetCity: (state, action) => {
            return {...state, cities: state.cities.filter(city => city !== action.payload)};
        },
        resetAll: (state) => {
            return {...state, cities: []};
        },
        setPriceFrom: (state, action) => {
            return {...state, priceFrom: action.payload};
        },
        setPriceTo: (state, action) => {
            return {...state, priceTo: action.payload};
        },
        applyFilters: (state, action) => {
            return {...state, filters: action.payload};
        },
        setSearchStr: (state, action) => {
            return {...state, searchStr: action.payload};
        }
    }
});


export const selectCities = (state: RootState) => {
    return state.filter.cities;
};

export const selectPriceFrom = (state: RootState) => {
    return state.filter.priceFrom;
};

export const selectPriceTo = (state: RootState) => {
    return state.filter.priceTo;
};

export const selectFilters = (state: RootState) => {
    return state.filter.filters;
};

export const selectSearchStr = (state: RootState) => {
  return state.filter.searchStr
};
