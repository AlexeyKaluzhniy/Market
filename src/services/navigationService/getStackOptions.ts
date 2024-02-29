import {TFuncKeyApp} from "../../common/localization/localization";
import {Options} from "react-native-navigation";
import {IGetOptions, IGetOptionsOptionalButtons, INavigationPage} from "../../types";
import {isIos} from "../../core/theme/commonConsts";

function getOptions({screenId, optionalButtons}: IGetOptions) {
    const options: Options = {
        topBar: {
            backButton: {
                visible: isIos,
            },
        },
    };

    return options;
}

export const getStackOptions = (
    i18nKey: TFuncKeyApp | null,
    screen: INavigationPage,
    optionalButtons?: IGetOptionsOptionalButtons,
) => (): Options => getOptions(
    {
        screenId: screen.id,
        optionalButtons,
    },
);
