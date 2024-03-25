import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ICheckOtp, IRegister, ISendOtp} from "~/core/store/auth/authModels";

export const authorizationApi = createApi({
    reducerPath: 'authorization',
    tagTypes: ["authorization"],
    baseQuery: fetchBaseQuery(
        {
            baseUrl: `https://mobile.prox3.dex-it.ru/profile/v1/`,
        }),
    endpoints: (builder) => ({
        getSessionIdLogin: builder.query<string, { email: string; password: string }>({
            query: (args) => {
                return {
                    url: 'Register/RegisterUser',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf8',
                    },
                    body: JSON.stringify(args)
                };
            },
            providesTags: ["authorization"],
        }),
        getSessionIdRegister: builder.query<string, IRegister>({
            query: (args) => {
                return {
                    url: 'Register/RegisterUser',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf8',
                    },
                    body: JSON.stringify({...args, otpCode: '0000', otpProviderType: 'Sms'})
                };
            },
            providesTags: ["authorization"],
        }),
        sendOtpCode: builder.query<boolean, ISendOtp>({
            query(args) {
                return {
                    url: 'Register/SendOtpCode',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf8',
                    },
                    body: JSON.stringify({
                        phoneNumber: args.phoneNumber,
                        otpProviderType: 'Sms',
                        otpCodeReason: 'ResetPassword'
                    })
                };
            },
        }),
        checkOtpCode: builder.query<string, ICheckOtp>({
            query({phoneNumber, otpCode, otpCodeReason, otpProviderType}) {
                const queryString = new URLSearchParams({
                    phone: phoneNumber,
                    otpCodeReason: otpCodeReason,
                    otpProviderType: otpProviderType,
                    otpCode: otpCode
                }).toString();

                return {
                    url: `Register/CheckOtpCode?${queryString}`
                };
            }
        })
    })
});

export const {
    useLazyGetSessionIdLoginQuery,
    useLazyGetSessionIdRegisterQuery,
    useLazySendOtpCodeQuery,
    useLazyCheckOtpCodeQuery
} = authorizationApi;
