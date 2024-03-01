import {Roboto} from "~/infrastructure";
import {Normalize} from "react-i18next";
import {CommonStyles} from "~/core/theme/commonStyles";
import {StyleSheet} from "react-native";
import {LightThemeColors} from "~/core/theme/colors";

interface IBrandBlockProps {
    title: string;
    body: Normalize<{
        about: {
            firstBody: string;
            thirdBody: string;
            thanksBody: string;
        };
    }>;
    isFirst?: boolean;
}

export function BrandBlock({title, body, isFirst = false}: IBrandBlockProps) {
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
