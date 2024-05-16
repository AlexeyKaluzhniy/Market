import {setSecureItem} from "~/core/securedStorage/securedStorage";

interface ITokenResponse {
    access_token: string;
    expires_in: string;
    token_type: string;
    refresh_token: string;
    scope: string;
}

export interface IAuthData {
    accessToken: string;
    expiresIn: string;
    scope: string;
    tokenType: string;
}

export const authTokenTransformer = async (res: ITokenResponse): Promise<IAuthData> => {
    await setSecureItem("refreshToken", res.refresh_token);

    return {
        accessToken: res.access_token,
        expiresIn: res.expires_in,
        tokenType: res.token_type,
        scope: res.scope,
    };
};
