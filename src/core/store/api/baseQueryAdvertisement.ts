import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import Config from "react-native-config";
import {RootState} from "~/core/store/rootReducer";

export const baseQueryAdvertisement = () => {
    return fetchBaseQuery(
        {
            baseUrl: Config.AD_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            prepareHeaders: (headers, api) => {
                const state = api.getState() as RootState;
                headers.set("accept", "application/json");
                headers.set("Authorization", `Bearer ${state.auth.accessToken}`);
            }
        });
};
