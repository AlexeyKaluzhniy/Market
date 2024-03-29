import {StyleSheet, TouchableOpacity} from "react-native";
import {Colors, ThemeColors} from "~/core/theme/colors";
import AddIcon from "../../resources/icons/add.svg";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Navigation} from "react-native-navigation";
import {Pages} from "~/navigation/pages";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";

export function AddButton() {
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();

    const pushNewAdvertiseScreen = () => {
        Navigation.push(Pages.tabs.id, {
            component: {
                name: Pages.newAdvertise.name,
                options: {
                    topBar: {
                        visible: false
                    },
                    sideMenu: {
                        left: {
                            enabled: false
                        }
                    }
                }
            }
        });
    };

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={pushNewAdvertiseScreen}>
            <AddIcon color={colors.onPrimaryContainer}/>
        </TouchableOpacity>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        backgroundColor: colors.primaryContainer,
        position: 'absolute',
        padding: CommonSizes.padding.mediumPlus,
        bottom: CommonSizes.margin.largePlus,
        right: CommonSizes.margin.largePlus + 1,
        borderRadius: CommonSizes.borderRadius.medium,
        elevation: 2,
        shadowColor: Colors.black,
        shadowOpacity: 0.3,
        shadowOffset: {
            height: CommonSizes.margin.extraSmall,
            width: CommonSizes.borderWidth.extraThin
        }
    }
});
