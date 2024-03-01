import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {StyleSheet, View} from "react-native";
import {Colors, LightThemeColors} from "~/core/theme/colors";
import BrandIcon from '../../../resources/icons/brand.svg';
import SettingsIcon from '../../../resources/icons/settings.svg';
import InfoIcon from '../../../resources/icons/info.svg';
import LogOutIcon from '../../../resources/icons/logout.svg';
import {CommonStyles} from "~/core/theme/commonStyles";
import {MenuItem} from "~/modules/drawer/components/MenuItem";
import {CommonSizes} from "~/core/theme/commonSizes";
import {drawerStackScreensLayout, setAuthRoot} from "~/navigation/roots";
import {Brand} from "~/infrastructure";
import {Pages} from "~/navigation/pages";
import {Stacks} from "~/navigation/stacks";
import {useTranslation} from "react-i18next";

export const Drawer: NavigationFunctionComponent = () => {
    const {t} = useTranslation();

    const handleLogOut = () => {
        setAuthRoot();
    };

    const handlePushScreen = (name: string, title: string) => {
        Navigation.push(Stacks.drawerStack.id, drawerStackScreensLayout(name, title));
    };

    return (
        <View style={styles.container}>
            <View style={styles.brandContainer}>
                <BrandIcon height={45} width={45}/>
                <Brand.Large labelKey="drawer.brandTitle" style={styles.brandTitle}/>
            </View>
            <MenuItem Icon={SettingsIcon} title="drawer.settings"
                      onPress={() => handlePushScreen(Pages.settings.name, t("drawer.settings"))}/>
            <MenuItem Icon={InfoIcon} title="drawer.about" onPress={() => handlePushScreen(Pages.about.name, t("drawer.about"))}/>
            <View style={styles.outline}/>
            <MenuItem Icon={LogOutIcon} title="drawer.logOut" onPress={handleLogOut}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.flex1,
        backgroundColor: LightThemeColors.drawer,
        paddingHorizontal: CommonSizes.padding.superLarge
    },
    brandContainer: {
        ...CommonStyles.rowCenter,
        marginVertical: CommonSizes.margin.smallPlus
    },
    brandTitle: {
        marginLeft: CommonSizes.margin.largePlus,
        color: Colors.primaryFixed
    },
    outline: {
        height: CommonSizes.borderWidth.extraThin,
        backgroundColor: LightThemeColors.outline
    }
});
