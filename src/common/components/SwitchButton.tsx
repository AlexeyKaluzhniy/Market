import {StyleSheet, TouchableOpacity, Animated} from "react-native";
import {DarkThemeColors, LightThemeColors, ThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useThemedStyles} from "~/core/theme/hooks";
import {useAppDispatch, useAppSelector} from "~/core/store/store";
import {SystemActions} from "~/core/store/system/systemSlice";
import {setDefaultOptions} from "~/navigation/defaultOptions";
import {useCallback, useEffect, useState} from "react";
import {getBottomTabsLayout} from "~/navigation/roots";
import {navigation} from "~/services";
import {LayoutRoot} from "react-native-navigation";
import {selectAppTheme} from "~/core/store/system/systemSelectors";

export function SwitchButton({componentId}: { componentId: string }) {
    const styles = useThemedStyles(stylesG);
    const dispatch = useAppDispatch();
    const appTheme = useAppSelector(selectAppTheme);
    const isDark = appTheme === 'dark';
    const [position] = useState(new Animated.Value(0));

    useEffect(() => {
        position.setValue(isDark ? 22 : 0);
    }, []);

    const changeAppTheme = () => {
        if (isDark) {
            dispatch(SystemActions.setAppTheme("light"));
        } else {
            dispatch(SystemActions.setAppTheme("dark"));
        }
        setDefaultOptions(!isDark ? DarkThemeColors : LightThemeColors);
        movePin().then(async () => await resetNavigation());
    };

    const movePin = async () => {
        return new Promise<void>(resolve => {
            Animated.timing(position, {
                toValue: isDark ? 0 : 22,
                duration: 300,
                useNativeDriver: true
            }).start(() => resolve());
        });
    };

    const resetNavigation = useCallback(
        async () => {
            const tabsLayout = getBottomTabsLayout();
            tabsLayout.root.sideMenu.center.stack.children[0].bottomTabs.options = {bottomTabs: {currentTabId: componentId}};

            return navigation.setRootAsync(tabsLayout as LayoutRoot);
        },
        [componentId],
    );

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={changeAppTheme}>
            <Animated.View style={[styles.pin, {
                transform: [{translateX: position}]
            }]}/>
        </TouchableOpacity>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        backgroundColor: colors.surfaceContainerHighest,
        borderRadius: CommonSizes.borderRadius.largePlus,
        borderWidth: CommonSizes.borderWidth.thin,
        borderColor: colors.outline,
        justifyContent: 'center',
        width: 52
    },
    pin: {
        backgroundColor: colors.outline,
        borderRadius: CommonSizes.borderRadius.small,
        paddingHorizontal: CommonSizes.padding.small,
        paddingVertical: CommonSizes.padding.small,
        margin: CommonSizes.margin.extraSmallPlus,
        alignSelf: 'flex-start'
    }
});
