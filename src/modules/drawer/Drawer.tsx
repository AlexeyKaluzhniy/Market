import {NavigationFunctionComponent} from "react-native-navigation";
import {StyleSheet, View} from "react-native";
import {Colors, LightThemeColors} from "~/core/theme/colors";
import BrandIcon from '../../../resources/icons/brand.svg';
import SettingsIcon from '../../../resources/icons/settings.svg';
import InfoIcon from '../../../resources/icons/info.svg';
import LogOutIcon from '../../../resources/icons/logout.svg';
import {Roboto} from "~/infrastructure";
import {CommonStyles} from "~/core/theme/commonStyles";
import {MenuItem} from "~/modules/drawer/components/MenuItem";
import {CommonSizes} from "~/core/theme/commonSizes";
import {setAuthRoot} from "~/navigation/roots";

export const Drawer: NavigationFunctionComponent = () => {
    const handleLogOut = () => {
        setAuthRoot();
    };

    return (
        <View style={styles.container}>
            <View style={styles.brandContainer}>
                <BrandIcon height={45} width={45}/>
                <Roboto.Title.Large labelKey="drawer.brandTitle" style={styles.brandTitle}/>
            </View>
            <MenuItem Icon={SettingsIcon} title="drawer.settings" onPress={() => console.log('Settings')}/>
            <MenuItem Icon={InfoIcon} title="drawer.about" onPress={() => console.log('About')}/>
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
        fontWeight: '900',
        marginLeft: CommonSizes.margin.largePlus,
        color: Colors.primaryFixed
    },
    outline: {
        height: CommonSizes.borderWidth.extraThin,
        backgroundColor: LightThemeColors.outline
    }
});
