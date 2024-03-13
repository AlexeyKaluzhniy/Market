import {Roboto} from "~/infrastructure";
import {StyleSheet} from "react-native";
import {ThemeColors} from "~/core/theme/colors";
import {TFuncKeyApp} from "~/common/localization/localization";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";

interface IFeatureProps {
    title: string;
    body: TFuncKeyApp;
}

export function Feature({title, body}: IFeatureProps) {
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();

    return (
        <Roboto.Body.Medium style={styles.title}>
            {title}
            <Roboto.Body.Medium labelKey={body} color={colors.onSurface}/>
        </Roboto.Body.Medium>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    title: {
        fontWeight: "700",
        color: colors.onSurface
    }
});
