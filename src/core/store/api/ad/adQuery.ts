import {createApi} from "@reduxjs/toolkit/query/react";
import {IAdvertisement} from "~/core/store/api/ad/adModels";
import {baseQueryAdvertisement} from "~/core/store/api/baseQueryAdvertisement";

export const advertisementApi = createApi({
    reducerPath: 'advertisement',
    baseQuery: baseQueryAdvertisement(),
    endpoints: (builder) => ({
        getAds: builder.query<IAdvertisement[], void>({
            query: () => {
                return {
                    url: 'GetAd'
                };
            }
        })
    })
});

export const {
    useLazyGetAdsQuery
} = advertisementApi;
