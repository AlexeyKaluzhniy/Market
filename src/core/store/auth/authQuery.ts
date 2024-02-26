import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const authorizationApi = createApi({
    reducerPath: 'authorization',
    tagTypes: ["authorization"],
    baseQuery: fetchBaseQuery(
        {
            baseUrl: `http://cafe.prox2.dex-it.ru/api/User`,
        }),
    endpoints: (builder) => ({
        getSessionIdLogin: builder.query<string, { email: string; password: string }>({
            query: (args) => {
                return {
                    url: '/Authorization',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf8',
                    },
                    body: JSON.stringify(args)
                };
            },
            providesTags: ["authorization"],
        }),
        getSessionIdRegister: builder.query<string, { email: string; password: string }>({
            query: (args) => {
                return {
                    url: '/Register',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf8',
                    },
                    body: JSON.stringify(args)
                };
            },
            providesTags: ["authorization"],
        })
    })
});

export const {
    useLazyGetSessionIdLoginQuery,
    useLazyGetSessionIdRegisterQuery
} = authorizationApi;
