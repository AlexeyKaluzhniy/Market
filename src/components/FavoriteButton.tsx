import {TouchableOpacity} from "react-native";
import HeartInactive from "../../resources/icons/heartInactive.svg";

export function FavoriteButton() {
    return (
        <TouchableOpacity>
            <HeartInactive/>
        </TouchableOpacity>
    );
}
