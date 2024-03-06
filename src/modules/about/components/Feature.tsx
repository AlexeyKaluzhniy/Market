import {Roboto} from "~/infrastructure";
import {StyleSheet} from "react-native";
import {LightThemeColors} from "~/core/theme/colors";
import {TFuncKeyApp} from "~/common/localization/localization";

interface IFeatureProps {
    title: string;
    body: TFuncKeyApp;
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
