import {StyleSheet, TouchableOpacity, View} from "react-native";
import {LightThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";

export function SwitchButton() {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7}>
            <View style={styles.pin}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: LightThemeColors.surfaceContainer,
        borderRadius: CommonSizes.borderRadius.largePlus,
        borderWidth: CommonSizes.borderWidth.thin,
        borderColor: LightThemeColors.outlineVariant,
        justifyContent: 'center',
        width: 52
    },
    pin: {
        backgroundColor: LightThemeColors.outlineVariant,
        borderRadius: CommonSizes.borderRadius.small,
        paddingHorizontal: CommonSizes.padding.small,
        paddingVertical: CommonSizes.padding.small,
        alignSelf: 'flex-start',
        margin: CommonSizes.margin.extraSmallPlus
    }
});
