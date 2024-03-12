import {TouchableOpacity} from "react-native";
import ConfirmIcon from "../../../resources/icons/confirm.svg";
import {Navigation} from "react-native-navigation";
import {Pages} from "~/navigation/pages";

export function ConfirmButton() {
    return (
        <TouchableOpacity onPress={() => Navigation.pop(Pages.tabs.id)}>
            <ConfirmIcon/>
        </TouchableOpacity>
    );
}
