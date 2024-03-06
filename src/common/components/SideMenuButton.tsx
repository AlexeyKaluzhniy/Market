import MenuIcon from "../../../resources/icons/menu.svg";
import {TouchableOpacity} from "react-native";
import {Navigation} from "react-native-navigation";
import {Pages} from "~/navigation/pages";

export function SideMenuButton() {
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
            <MenuIcon/>
        </TouchableOpacity>
    );
}
