import {NavigationFunctionComponent} from "react-native-navigation";
import {ScrollView, StyleSheet, View} from "react-native";
import {Roboto} from "~/infrastructure";
import {useTranslation} from "react-i18next";
import {FeaturesBlock} from "~/modules/about/components/FeaturesBlock";
import {CommonSizes} from "~/core/theme/commonSizes";
import {BrandBlock} from "~/modules/about/components/BrandBlock";
import {CustomHeader} from "~/components/CustomHeader";
import {ThemeColors} from "~/core/theme/colors";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {CommonStyles} from "~/core/theme/commonStyles";

export const About: NavigationFunctionComponent = (props) => {
    const {t} = useTranslation();
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();

    return (
        <View style={styles.container}>
            <CustomHeader id={props.componentId} headerTitle="drawer.about" isStack/>
            <ScrollView style={styles.scrollView}>
                <BrandBlock title={t("about.welcome")} body={"about.firstBody"} isFirst/>
                <Roboto.Body.Medium labelKey="about.secondBody" style={styles.block} color={colors.onSurface}/>
                <FeaturesBlock/>
                <BrandBlock title={t("about.in")} body={"about.thirdBody"}/>
                <BrandBlock title={t("about.thanks")} body={"about.thanksBody"}/>
            </ScrollView>
        </View>
    );
};

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        ...CommonStyles.flex1,
        backgroundColor: colors.background,
    },
    scrollView: {
        paddingHorizontal: CommonSizes.padding.large,
    },
    block: {
        marginTop: CommonSizes.margin.small
    },
});
