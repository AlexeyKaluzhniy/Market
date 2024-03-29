import ArrowBackIcon from "../../resources/icons/arrow_back.svg";
import {TouchableOpacity} from "react-native";
import {Dto} from "~/infrastructure";

export function BackButton({onPress}: Dto.Common.HeaderLeftButton) {
    return (
        <TouchableOpacity onPress={onPress}>
            <ArrowBackIcon/>
        </TouchableOpacity>
    );
}
