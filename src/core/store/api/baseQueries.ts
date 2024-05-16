import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
// eslint-disable-next-line no-restricted-imports
import Config from "react-native-config";

export const baseAdvertiseQuery = fetchBaseQuery(
    {
        baseUrl: Config.AD_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        prepareHeaders: (headers, api) => {
            const state = api.getState();
            console.log(state);
            headers.set("accept", "application/json");
            headers.set("Authorization", `Bearer ${state.authorization.data.access_token}`);
        }
    }
);
