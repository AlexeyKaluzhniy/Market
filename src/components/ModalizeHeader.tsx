import {Roboto} from "~/infrastructure";
import {ReactNode} from "react";
import {StyleSheet, View} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {CommonSizes} from "~/core/theme/commonSizes";
import {LightThemeColors} from "~/core/theme/colors";

export function ModalizeHeader(close: ReactNode) {
    return (
        <View style={[CommonStyles.rowCenter, styles.container]}>
            <Roboto.Title.Large labelKey={"drawer.settings"} style={styles.text}/>
            {close}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        paddingHorizontal: CommonSizes.padding.large,
        marginTop: CommonSizes.margin.largePlus
    },
    text: {
        color: LightThemeColors.secondaryText
    }
});
