import {TouchableOpacity} from "react-native";
import ConfirmIcon from "../../../resources/icons/confirm.svg";
import {Navigation} from "react-native-navigation";
import {Pages} from "~/navigation/pages";
import {useThemeColors} from "~/core/theme/hooks";

export function ConfirmButton() {
    const colors = useThemeColors();

    return (
        <TouchableOpacity onPress={() => Navigation.pop(Pages.tabs.id)}>
            <ConfirmIcon color={colors.outline}/>
        </TouchableOpacity>
    );
}
