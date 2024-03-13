import {StyleSheet, TouchableOpacity, View} from "react-native";
import {DarkThemeColors, LightThemeColors, ThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useThemedStyles} from "~/core/theme/hooks";
import {useAppDispatch, useAppSelector} from "~/core/store/store";
import {SystemActions} from "~/core/store/system/systemSlice";
import {setDefaultOptions} from "~/navigation/defaultOptions";

export function SwitchButton() {
    const styles = useThemedStyles(stylesG);
    const dispatch = useAppDispatch();
    const isDark = useAppSelector(state => state.system.appTheme) === 'dark';

    const changeAppTheme = () => {
        if (isDark) {
            dispatch(SystemActions.setAppTheme("light"));
        } else {
            dispatch(SystemActions.setAppTheme("dark"));
        }
        setDefaultOptions(!isDark ? DarkThemeColors : LightThemeColors);
    };

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={changeAppTheme}>
            <View style={[styles.pin, {alignSelf: isDark ? 'flex-end' : 'flex-start'}]}/>
        </TouchableOpacity>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        backgroundColor: colors.surfaceContainer,
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
        margin: CommonSizes.margin.extraSmallPlus
    }
});
