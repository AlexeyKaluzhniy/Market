import MenuIcon from "../../../resources/icons/menu.svg";
import {TouchableOpacity} from "react-native";
import {Navigation} from "react-native-navigation";
import {Pages} from "~/navigation/pages";
import {useThemeColors} from "~/core/theme/hooks";

export function SideMenuButton() {
    const colors = useThemeColors();

    const handleOpenDrawer = () => {
        Navigation.mergeOptions(Pages.bottomTabsDrawer.id, {
            sideMenu: {
                left: {
                    visible: true
                }
            }
        });
    };

    return (
        <TouchableOpacity onPress={handleOpenDrawer}>
            <MenuIcon color={colors.outline}/>
        </TouchableOpacity>
    );
}
