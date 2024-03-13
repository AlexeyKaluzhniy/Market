import {Roboto} from "~/infrastructure";
import {ReactNode} from "react";
import {StyleSheet, View} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {CommonSizes} from "~/core/theme/commonSizes";
import {ThemeColors} from "~/core/theme/colors";
import {TFuncKeyApp} from "~/common/localization/localization";
import {useThemedStyles} from "~/core/theme/hooks";

export function ModalizeHeader(closeButton: ReactNode, title: TFuncKeyApp) {
    const styles = useThemedStyles(stylesG);

    return (
        <View style={[CommonStyles.rowCenter, styles.container]}>
            <Roboto.Title.Large labelKey={title} style={styles.text}/>
            {closeButton}
        </View>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        paddingHorizontal: CommonSizes.padding.large,
        marginTop: CommonSizes.margin.largePlus
    },
    text: {
        color: colors.onSurfaceVariant
    }
});
