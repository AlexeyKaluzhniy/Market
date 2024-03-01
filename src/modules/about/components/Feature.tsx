import {Roboto} from "~/infrastructure";
import {Normalize} from "react-i18next";
import {StyleSheet} from "react-native";
import {LightThemeColors} from "~/core/theme/colors";

interface IFeatureProps {
    title: string;
    body: Normalize<{
        about: {
            categoriesBody: string;
            searchBody: string;
            securityBody: string;
            easyPublishBody: string;
            personalAreaBody: string;
        };
    }>;
}

export function Feature({title, body}: IFeatureProps) {
    return (
        <Roboto.Body.Medium style={styles.title}>
            {title}
            <Roboto.Body.Medium labelKey={body}/>
        </Roboto.Body.Medium>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "700",
        color: LightThemeColors.onSurface
    }
});
