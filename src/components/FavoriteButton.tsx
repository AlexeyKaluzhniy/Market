import {TouchableOpacity} from "react-native";
import HeartInactive from "../../resources/icons/heartInactive.svg";
import HeartActive from "../../resources/icons/heartActive.svg";
import {useState} from "react";
import {useThemeColors} from "~/core/theme/hooks";

export function FavoriteButton() {
    const [isFavorite, setFavorite] = useState(false);
    const colors = useThemeColors();

    const handleSetFavorite = () => {
        setFavorite(prev => !prev);
    };

    return (
        <TouchableOpacity onPress={handleSetFavorite}>
            {isFavorite ? <HeartActive color={colors.main}/> : <HeartInactive color={colors.outline}/>}
        </TouchableOpacity>
    );
}
