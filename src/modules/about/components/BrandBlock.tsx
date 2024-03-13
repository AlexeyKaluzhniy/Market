import {Roboto} from "~/infrastructure";
import {CommonStyles} from "~/core/theme/commonStyles";
import {StyleSheet} from "react-native";
import {ThemeColors} from "~/core/theme/colors";
import {TFuncKeyApp} from "~/common/localization/localization";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";

interface IBrandBlockProps {
    title: string;
    body: TFuncKeyApp;
    isFirst?: boolean;
}

export function BrandBlock({title, body, isFirst}: IBrandBlockProps) {
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();

    return (
        <Roboto.Body.Medium style={!isFirst && CommonStyles.blockMargin} color={colors.onSurface}>
            {title}
            <Roboto.Body.Medium labelKey="about.brand" style={styles.brand}/>
            <Roboto.Body.Medium labelKey={body} color={colors.onSurface}/>
        </Roboto.Body.Medium>
    );
}

const stylesG = (colors: ThemeColors) =>  StyleSheet.create({
    brand: {
        fontWeight: "700",
        color: colors.onSurface
    }
});
