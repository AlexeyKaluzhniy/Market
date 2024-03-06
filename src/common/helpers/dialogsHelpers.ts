import {isAndroid, isIos} from "~/core/theme/commonConsts";
import {ActionSheetIOS, ActionSheetIOSOptions, Alert, AlertButton, AlertOptions} from "react-native";
import ActionSheet from 'react-native-action-sheet';
import {i18next} from "../localization/localization";

export function showActionSheet(options: ActionSheetIOSOptions, onOptionSelected: (optionIndex: number) => void) {
    if (isIos) {
        ActionSheetIOS.showActionSheetWithOptions(options, onOptionSelected);
    } else if (isAndroid) {
        ActionSheet.showActionSheetWithOptions(options, onOptionSelected);
    }
}

export function showAlert(title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) {
    Alert.alert(title, message, buttons, options || {cancelable: true});
}

export function showCommonDialog(title: string, message: string, onAcceptPress: () => void) {
    Alert.alert(
        title,
        message,
        [
            {
                text: i18next.t("common.yes"),
                onPress: onAcceptPress,
                style: "default",
            },
            {
                text: i18next.t("common.no"),
                style: "default",
            },
        ],
        {
            cancelable: true,
        },
    );
}
