import {RootState} from "~/core/store/rootReducer";

export const selectCities = (state: RootState) => {
    return state.filter.cities;
};

export const selectPriceFrom = (state: RootState) => {
    return state.filter.priceFrom;
};

export const selectPriceTo = (state: RootState) => {
    return state.filter.priceTo;
};
