import {ThemeColors} from "~/core/theme/colors";
import {StyleSheet, Animated} from "react-native";
import {TFuncKeyApp} from "~/common/localization/localization";
import {Roboto} from "~/infrastructure";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useEffect, useState} from "react";

interface IErrorNotificationProps {
    text: TFuncKeyApp;
}

export function ErrorNotification({text}: IErrorNotificationProps) {
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();
    const [fadeAnimation] = useState(new Animated.Value(0));
    const [translateYAnim] = useState(new Animated.Value(80));

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnimation, {
                toValue: 1,
                duration: 450,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnimation, translateYAnim]);

    return (
        <Animated.View style={[styles.container, {transform: [{translateY: translateYAnim}], opacity: fadeAnimation}]}>
            <Roboto.Body.Medium labelKey={text} color={colors.onSurface} style={styles.text}/>
        </Animated.View>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        paddingVertical: CommonSizes.padding.extraSmallPlus,
        paddingHorizontal: CommonSizes.padding.extraSmallPlus,
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        width: '100%',
        bottom: CommonSizes.margin.superLargePlus,
        left: CommonSizes.margin.small - 1,
        borderRadius: CommonSizes.borderRadius.medium,
    },
    text: {
        textAlign: 'center'
    }
});
