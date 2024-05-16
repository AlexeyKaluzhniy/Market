import {EnumAuthGrantTypes} from "~/core/store/api/auth/authQuery";
import {IAuthParams} from "~/core/store/api/auth/authModels";
import {objectDataGetter} from "~/core/store/api/helpers/objectDataGetter";

export const provideLoginRequestBody = (args: IAuthParams)=> {
    return "phoneNumber" in args ? objectDataGetter({
        "client_Id": "ad.client",
        "client_secret": "C86F0AED-7DDC-432A-B3A4-868C2FCA5604",
        "grant_type": EnumAuthGrantTypes.password,
        "scope": "offline_access openid profile ad-api",
        "username": args.phoneNumber,
        "password": args.password,
    }) : objectDataGetter({
        "client_id": "ad.client",
        "client_secret":  "C86F0AED-7DDC-432A-B3A4-868C2FCA5604",
        "grant_type": EnumAuthGrantTypes.refresh_token,
        "refresh_token": args.refreshToken,
    });
};
