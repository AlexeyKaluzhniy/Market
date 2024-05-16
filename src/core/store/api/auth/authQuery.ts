import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    IAuthParams,
    ICheckOtp, ILoginResponse,
    IRegister,
    ISendOtp
} from "~/core/store/api/auth/authModels";
// eslint-disable-next-line no-restricted-imports
import Config from "react-native-config";
import {setSecureItem} from "~/core/securedStorage/securedStorage";
import {provideLoginRequestBody} from "~/core/store/api/helpers/provideLoginRequestBody";
import {authTokenTransformer, IAuthData} from "~/core/store/api/helpers/authTokenTransformer";

export const enum EnumAuthGrantTypes {
    password = "password",
    refresh_token = "refresh_token",
}

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
        login: builder.mutation<IAuthData, IAuthParams>({
            query: (args) => {
                return {
                    url: 'identity/connect/token',
                    method: 'POST',
                    body: provideLoginRequestBody(args),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
            },
            transformResponse: authTokenTransformer
        }),
        loginFn: builder.mutation<ILoginResponse, ILoginResponse>({
            queryFn: async (data) => {
                await setSecureItem("refreshToken", data.refresh_token);

                return {data};
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
        }),
        logout: builder.mutation<null, void>({
            queryFn: async () => {
                await setSecureItem("refreshToken", undefined);

                return {data: null};
            },
        }),
    })
});

export const {
    useLoginMutation,
    useLazyGetSessionIdRegisterQuery,
    useLazySendOtpCodeQuery,
    useLazyCheckOtpCodeQuery
} = authorizationApi;
