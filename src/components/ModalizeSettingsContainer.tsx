import {StyleSheet, View} from "react-native";
import {Roboto} from "~/infrastructure";
import {Colors, LightThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {SwitchButton} from "~/common/components/SwitchButton";
import {CommonStyles} from "~/core/theme/commonStyles";
import {OptionInput} from "~/components/OptionInput";

export function ModalizeSettingsContainer() {
    return (
        <View style={styles.container}>
            <OptionInput/>
            <View style={styles.outline}/>
            <View style={styles.switchContainer}>
                <Roboto.Body.Large labelKey={"settings.darkTheme"} style={CommonStyles.flex1}/>
                <SwitchButton/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: CommonSizes.padding.large,
    },
    outline: {
        height: 1,
        backgroundColor: LightThemeColors.outline,
        marginVertical: CommonSizes.margin.extraLarge
    },
    switchContainer: {
        marginBottom: CommonSizes.margin.extraLarge,
        ...CommonStyles.rowCenter,
        justifyContent: 'space-between'
    },
    input: {
        color: Colors.black,
        marginLeft: CommonSizes.margin.largePlus
    }
});
