import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ICheckOtp, ILogin, IRegister, ISendOtp} from "~/core/store/auth/authModels";
import Config from "react-native-config";

export const authorizationApi = createApi({
    reducerPath: 'authorization',
    tagTypes: ["register", "registerSendOtp", "registerCheckOtp"],
    baseQuery: fetchBaseQuery(
        {
            baseUrl: Config.REGISTER_URL,
            headers: {
                'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true'
            }
        }),
    endpoints: (builder) => ({
        getSessionIdLogin: builder.query<string, ILogin>({
            query: (args) => {
                return {
                    url: '/RegisterUser',
                    method: 'POST',
                    body: JSON.stringify(args)
                };
            },
        }),
        getSessionIdRegister: builder.query<string, IRegister>({
            query: (args) => {
                return {
                    url: '/RegisterUser',
                    method: 'POST',
                    body: JSON.stringify({...args, phone: args.phoneNumber, otpCode: '0000', otpProviderType: 'Sms'})
                };
            },
            providesTags: ["register"],
        }),
        sendOtpCode: builder.query<boolean, ISendOtp>({
            query(args) {
                return {
                    url: '/SendOtpCode',
                    method: 'POST',
                    body: JSON.stringify({
                        phoneNumber: args.phoneNumber,
                        otpProviderType: 'Sms',
                        otpCodeReason: 'ResetPassword'
                    })
                };
            },
            providesTags: ["registerSendOtp"]
        }),
        checkOtpCode: builder.query<string, ICheckOtp>({
            query({phoneNumber, otpCode, otpCodeReason}) {
                const queryString = new URLSearchParams({
                    phone: phoneNumber,
                    otpCodeReason: otpCodeReason,
                    otpProviderType: "Sms",
                    otpCode: otpCode
                }).toString();

                return {
                    url: `/CheckOtpCode?${queryString}`
                };
            },
            providesTags: ["registerCheckOtp"]
        })
    })
});

export const {
    useLazyGetSessionIdLoginQuery,
    useLazyGetSessionIdRegisterQuery,
    useLazySendOtpCodeQuery,
    useLazyCheckOtpCodeQuery
} = authorizationApi;
