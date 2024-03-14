import {StyleSheet, View} from "react-native";
import {Roboto} from "~/infrastructure";
import {ThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {SwitchButton} from "~/common/components/SwitchButton";
import {CommonStyles} from "~/core/theme/commonStyles";
import {Selector} from "~/components/Selector";
import {useAppDispatch, useAppSelector} from "~/core/store/store";
import {languages, languagesNames} from "~/common/localization/localization";
import {SystemActionsAsync} from "~/core/store/system/systemSlice";
import {useCallback} from "react";
import {getBottomTabsLayout} from "~/navigation/roots";
import {navigation} from "~/services";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {LayoutRoot} from "react-native-navigation";

export function ModalizeSettingsContainer() {
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();
    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.system.language);

    const resetNavigation = useCallback(
        async () => {
            const tabsLayout = getBottomTabsLayout();
            console.log(tabsLayout);

            // Navigation.constants().then(res => console.log('res', res))
            // Navigation.getLaunchArgs().then(res => console.log('res', res))
            // // upgrade layout to stay on the same screen
            // tabsLayout.root.sideMenu.center.stack.children[0].bottomTabs.options = {bottomTabs: {currentTabId: Tabs.main.id}};
            // tabsLayout.root.sideMenu.center.stack.children[0].bottomTabs.children?.[4].stack?.children?.push({
            //     component: {
            //         id: Pages.settings.id,
            //         name: Pages.settings.name,
            //         options: {bottomTabs: {visible: false}},
            //     },
            // });

            //todo check whether second level screen brake this function
            return navigation.setRootAsync(tabsLayout as LayoutRoot);
        },
        [],
    );

    const handleChangeLanguage = (name: string) => {
        const l = languages.find(value => value.name === name) || language;
        dispatch(SystemActionsAsync.changeLang(l));
        setTimeout(() => {
            resetNavigation();
        }, 0);
    };

    return (
        <View style={styles.container}>
            <Selector values={languagesNames} title={language.name} handleSelect={handleChangeLanguage}/>
            <View style={styles.outline}/>
            <View style={styles.switchContainer}>
                <Roboto.Body.Large labelKey={"settings.darkTheme"} style={CommonStyles.flex1} color={colors.onSurface}/>
                <SwitchButton/>
            </View>
        </View>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        paddingHorizontal: CommonSizes.padding.large,
    },
    outline: {
        height: 1,
        backgroundColor: colors.outline,
        marginVertical: CommonSizes.margin.extraLarge
    },
    switchContainer: {
        marginBottom: CommonSizes.margin.extraLarge,
        ...CommonStyles.rowCenter,
        justifyContent: 'space-between'
    },
});
