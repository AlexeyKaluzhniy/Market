import {Roboto} from "~/infrastructure";
import {Feature} from "~/modules/about/components/Feature";
import {useTranslation} from "react-i18next";
import {View} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {useThemeColors} from "~/core/theme/hooks";

export function FeaturesBlock() {
    const {t} = useTranslation();
    const colors = useThemeColors();

    return (
        <View style={CommonStyles.blockMargin}>
            <Roboto.Body.Large labelKey="about.features" color={colors.onSurface}/>
            <View style={CommonStyles.blockMargin}>
                <Feature title={t("about.categories")} body={"about.categoriesBody"}/>
                <Feature title={t("about.search")} body={"about.searchBody"}/>
                <Feature title={t("about.security")} body={"about.securityBody"}/>
                <Feature title={t("about.easyPublish")} body={"about.easyPublishBody"}/>
                <Feature title={t("about.personalArea")} body={"about.personalAreaBody"}/>
            </View>
        </View>
    );
}
