import {SafeAreaView, StyleSheet, View} from "react-native";
import {Roboto} from "~/infrastructure";
import {ThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {SwitchButton} from "~/common/components/SwitchButton";
import {CommonStyles} from "~/core/theme/commonStyles";
import {Selector} from "~/components/Selector";
import {useAppDispatch, useAppSelector} from "~/core/store/store";
import {languages, languagesNames} from "~/common/localization/localization";
import {selectAppLanguage, SystemActionsAsync} from "~/core/store/system/systemSlice";
import {useCallback} from "react";
import {getBottomTabsLayout} from "~/navigation/roots";
import {navigation} from "~/services";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {LayoutRoot} from "react-native-navigation";

export function ModalizeSettingsContainer(componentId: string) {
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();
    const dispatch = useAppDispatch();
    const language = useAppSelector(selectAppLanguage);

    const resetNavigation = useCallback(
        async () => {
            const tabsLayout = getBottomTabsLayout();
            tabsLayout.root.sideMenu.center.stack.children[0].bottomTabs.options = {bottomTabs: {currentTabId: componentId}};

            return navigation.setRootAsync(tabsLayout as LayoutRoot);
        },
        [componentId],
    );

    const handleChangeLanguage = (name: string) => {
        const l = languages.find(value => value.name === name) || language;
        dispatch(SystemActionsAsync.changeLang(l));
        setTimeout(() => {
            resetNavigation();
        }, 0);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Selector
                values={languagesNames}
                title={language.name}
                handleSelect={handleChangeLanguage}
                placeholder={"settings.language"}/>
            <View style={styles.outline}/>
            <View style={styles.switchContainer}>
                <Roboto.Body.Large labelKey={"settings.darkTheme"} style={CommonStyles.flex1} color={colors.onSurface}/>
                <SwitchButton componentId={componentId}/>
            </View>
        </SafeAreaView>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        marginHorizontal: CommonSizes.padding.large,
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
