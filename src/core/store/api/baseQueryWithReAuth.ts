import {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/dist/query/react";
import {baseAdvertiseQuery} from "~/core/store/api/baseQueries";
import {getSecureItem} from "~/core/securedStorage/securedStorage";
import {authorizationApi} from "~/core/store/api/auth/authQuery";
import {setAuthRoot} from "~/navigation/roots";

export const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseAdvertiseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshToken = await getSecureItem("refreshToken");
        if(refreshToken) {
            api.dispatch(authorizationApi.endpoints.login.initiate({refreshToken}))
                .then(async () => {
                    result = await baseAdvertiseQuery(args, api, extraOptions);
                })
                .catch(async () => {
                    api.dispatch(authorizationApi.endpoints.logout.initiate());
                    await setAuthRoot();
                });
        }
    }

    return result;
};
