import {createApi} from "@reduxjs/toolkit/query/react";
import {IAdvertisement} from "~/core/store/api/ad/adModels";
import {baseQueryWithReAuth} from "~/core/store/api/baseQueryWithReAuth";

export const advertisementApi = createApi({
    reducerPath: 'advertisement',
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        getAds: builder.query<IAdvertisement[], void>({
            query: () => ({
                url: 'GetAd'
            })
        })
    })
});

export const {
    useLazyGetAdsQuery
} = advertisementApi;
