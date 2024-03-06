import {Roboto} from "~/infrastructure";
import {CommonStyles} from "~/core/theme/commonStyles";
import {StyleSheet} from "react-native";
import {LightThemeColors} from "~/core/theme/colors";
import {TFuncKeyApp} from "~/common/localization/localization";

interface IBrandBlockProps {
    title: string;
    body: TFuncKeyApp;
    isFirst?: boolean;
}

export function BrandBlock({title, body, isFirst}: IBrandBlockProps) {
    return (
        <Roboto.Body.Medium style={!isFirst && CommonStyles.blockMargin}>
            {title}
            <Roboto.Body.Medium labelKey="about.brand" style={styles.brand}/>
            <Roboto.Body.Medium labelKey={body}/>
        </Roboto.Body.Medium>
    );
}

const styles = StyleSheet.create({
    brand: {
        fontWeight: "700",
        color: LightThemeColors.onSurface
    }
});
