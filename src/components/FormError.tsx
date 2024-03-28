import {Roboto} from "~/infrastructure";
import {TFuncKeyApp} from "~/common/localization/localization";
import {useThemeColors} from "~/core/theme/hooks";
import {StyleSheet} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";

interface IFormError {
    text: TFuncKeyApp;
}

export function FormError({text}: IFormError) {
    const colors = useThemeColors();

    return (
        <Roboto.Body.Medium labelKey={text} color={colors.onErrorContainer} style={styles.error}/>
    );
}

const styles = StyleSheet.create({
    error: {
        marginHorizontal: CommonSizes.margin.extraSmallPlus,
        marginTop: CommonSizes.margin.extraSmall
    }
});
