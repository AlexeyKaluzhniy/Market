import {TouchableOpacity} from "react-native";
import ConfirmIcon from "../../../resources/icons/confirm.svg";
import {Navigation} from "react-native-navigation";
import {Pages} from "~/navigation/pages";
import {useThemeColors} from "~/core/theme/hooks";

interface IProps {
    onPress?: () => void;
}

export function ConfirmButton({onPress}: IProps) {
    const colors = useThemeColors();

    const handleConfirm = () => {
        Navigation.pop(Pages.tabs.id);
        onPress && onPress();
    };

    return (
        <TouchableOpacity onPress={handleConfirm}>
            <ConfirmIcon color={colors.outline}/>
        </TouchableOpacity>
    );
}
