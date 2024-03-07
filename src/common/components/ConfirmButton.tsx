import {TouchableOpacity} from "react-native";
import ConfirmIcon from "../../../resources/icons/confirm.svg";

export function ConfirmButton() {
    return (
        <TouchableOpacity>
            <ConfirmIcon/>
        </TouchableOpacity>
    );
}
