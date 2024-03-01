import {NavigationFunctionComponent} from "react-native-navigation";
import {ScrollView, StyleSheet} from "react-native";
import {Roboto} from "~/infrastructure";
import {useTranslation} from "react-i18next";
import {FeaturesBlock} from "~/modules/about/components/FeaturesBlock";
import {CommonSizes} from "~/core/theme/commonSizes";
import {BrandBlock} from "~/modules/about/components/BrandBlock";

export const About: NavigationFunctionComponent = () => {
    const {t} = useTranslation();

    return (
        <ScrollView style={styles.container}>
            <BrandBlock title={t("about.welcome")} body={"about.firstBody"} isFirst/>
            <Roboto.Body.Medium labelKey="about.secondBody" style={styles.block}/>
            <FeaturesBlock/>
            <BrandBlock title={t("about.in")} body={"about.thirdBody"}/>
            <BrandBlock title={t("about.thanks")} body={"about.thanksBody"}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: CommonSizes.padding.large
    },
    block: {
        marginTop: CommonSizes.margin.small
    },
});
