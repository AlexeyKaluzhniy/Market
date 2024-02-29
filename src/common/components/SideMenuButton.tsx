import MenuIcon from "../../../resources/icons/menu.svg";
import {StyleSheet, TouchableOpacity} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Navigation} from "react-native-navigation";
import {Pages} from "~/navigation/pages";

export function SideMenuButton() {
    return (
        <TouchableOpacity style={styles.menu}
                          onPress={() => Navigation.mergeOptions(Pages.bottomTabsDrawer.id, {
                              sideMenu: {
                                  left: {
                                      visible: true
                                  }
                              }
                          })}>
            <MenuIcon/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menu: {
        marginLeft: CommonSizes.margin.extraLarge
    },
});
