import {isRejectedWithValue, Middleware, MiddlewareAPI} from "@reduxjs/toolkit";
import {showToast} from "~/services/navigationService/showToast";
import {CommonSizes} from "~/core/theme/commonSizes";
import {TFuncKeyApp} from "~/common/localization/localization";

export const authErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        showToast({
            location: "top",
            text: action.payload.data.type as TFuncKeyApp,
            textStyle: {fontSize: CommonSizes.font.smallPlus}
        });
    }

    return next(action);
};
