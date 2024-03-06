import {StyleSheet, TouchableOpacity} from "react-native";
import {LightThemeColors} from "~/core/theme/colors";
import AddIcon from "../../resources/icons/add.svg";
import {CommonSizes} from "~/core/theme/commonSizes";

export function AddButton() {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
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
