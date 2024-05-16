import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ICheckOtp, ILogin, ILoginResponse, IRegister, ISendOtp} from "~/core/store/api/auth/authModels";
// eslint-disable-next-line no-restricted-imports
import Config from "react-native-config";

export const authorizationApi = createApi({
    reducerPath: 'authorization',
    tagTypes: ["register", "registerSendOtp", "registerCheckOtp"],
    baseQuery: fetchBaseQuery(
        {
            baseUrl: Config.API_URL,
            headers: {
                'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true'
            }
        }),
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILogin>({
            query: (args) => {
                const queryString = new URLSearchParams({
                    client_id: "ad.client",
                    client_secret: "C86F0AED-7DDC-432A-B3A4-868C2FCA5604",
                    grant_type: "password",
                    scope: "offline_access openid profile ad-api",
                    username: args.phoneNumber,
                    password: args.password
                });

                return {
                    url: 'identity/connect/token',
                    method: 'POST',
                    body: queryString,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
            },
        }),
        getSessionIdRegister: builder.query<string, IRegister>({
            query: (args) => {
                return {
                    url: 'profile/v1/Register/RegisterUser',
                    method: 'POST',
                    body: JSON.stringify({...args, phone: args.phoneNumber, otpCode: '0000', otpProviderType: 'Sms'})
                };
            },
            providesTags: ["register"],
        }),
        sendOtpCode: builder.query<boolean, ISendOtp>({
            query(args) {
                return {
                    url: 'profile/v1/Register/SendOtpCode',
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
                    url: `profile/v1/Register/CheckOtpCode?${queryString}`
                };
            },
            providesTags: ["registerCheckOtp"]
        })
    })
});

export const {
    useLoginMutation,
    useLazyGetSessionIdRegisterQuery,
    useLazySendOtpCodeQuery,
    useLazyCheckOtpCodeQuery
} = authorizationApi;
