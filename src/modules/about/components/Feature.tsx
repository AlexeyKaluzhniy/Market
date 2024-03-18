import {Roboto} from "~/infrastructure";
import {StyleSheet, View} from "react-native";
import {TFuncKeyApp} from "~/common/localization/localization";
import {useThemeColors} from "~/core/theme/hooks";
import {CommonStyles} from "~/core/theme/commonStyles";
import {CommonSizes} from "~/core/theme/commonSizes";

interface IFeatureProps {
    title: string;
    body: TFuncKeyApp;
}

export function Feature({title, body}: IFeatureProps) {
    const colors = useThemeColors();

    return (
        <View style={CommonStyles.row}>
            <Roboto.Body.Medium text={"●"} color={colors.onSurface}/>
            <Roboto.Body.Medium style={styles.title} color={colors.onSurface}>
                {title}
                <Roboto.Body.Medium labelKey={body} color={colors.onSurface}/>
            </Roboto.Body.Medium>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "700",
        marginLeft: CommonSizes.margin.extraSmallPlus
    }
});
