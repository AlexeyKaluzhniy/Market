import {StyleSheet, TouchableOpacity} from "react-native";
import {LightThemeColors} from "~/core/theme/colors";
import AddIcon from "../../resources/icons/add.svg";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Navigation} from "react-native-navigation";
import {Pages} from "~/navigation/pages";

export function AddButton() {
    const pushNewAdvertiseScreen = () => {
        Navigation.push(Pages.tabs.id, {
            component: {
                name: Pages.newAdvertise.name,
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        });
    };

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={pushNewAdvertiseScreen}>
            <AddIcon/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: LightThemeColors.primaryContainer,
        position: 'absolute',
        padding: CommonSizes.padding.mediumPlus,
        bottom: 16,
        right: 16,
        borderRadius: CommonSizes.borderRadius.medium,
        elevation: 2
    }
});
