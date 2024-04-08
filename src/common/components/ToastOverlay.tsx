import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    ActivityIndicator,
    Animated,
    Image,
    ImageStyle,
    ImageURISource,
    StyleSheet,
    TextStyle,
    ViewStyle,
} from "react-native";
import {Navigation, NavigationConstants, NavigationFunctionComponent} from "react-native-navigation";
import {useNavigationComponentDidAppear} from "react-native-navigation-hooks";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Colors, ThemeColors} from "~/core/theme/colors";
import {CommonStyles} from "~/core/theme/commonStyles";
import {isIos, minWindowDimension} from "~/core/theme/commonConsts";
import {Roboto} from "../../infrastructure";
import {useThemedStyles} from "~/core/theme/hooks";
import {TFuncKeyApp} from "~/common/localization/localization";

export interface IToastNavProps {
    text: TFuncKeyApp;
    textStyle?: TextStyle;
    icon?: ImageURISource;
    iconStyle?: ImageStyle;
    loading?: boolean;
    location?: "bottom" | "top" | "modal";
}

export const ToastOverlay: NavigationFunctionComponent<IToastNavProps> = (
    {
        componentId,
        text,
        textStyle,
        icon,
        iconStyle,
        loading,
        location,
    }
) => {
    const [constants, setConstants] = useState<NavigationConstants | undefined>(undefined);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const styles = useThemedStyles(stylesG);

    const isTopLocation = useMemo(() => {
        return location == "top";
    }, [location]);

    useNavigationComponentDidAppear(
        async () => {
            const constantsResult = await Navigation.constants();
            setConstants(constantsResult);
        },
        {componentId},
    );

    const containerStyle = useMemo(() => {
        if (constants != null) {
            switch (location) {
                case 'top': {
                    return {
                        top: isIos ? constants.topBarHeight + constants.statusBarHeight + CommonSizes.spacing.medium : CommonSizes.margin.extraSmallPlus,
                    } as ViewStyle;
                }
                case 'modal': {
                    return {
                        bottom: CommonSizes.spacing.medium,
                        position: "absolute",
                    } as ViewStyle;
                }
                case 'bottom':
                default: {
                    return {
                        bottom: constants.bottomTabsHeight + CommonSizes.spacing.medium,
                        position: "absolute",
                    } as ViewStyle;
                }
            }
        } else {
            return null;
        }
    }, [constants, location]);

    const closeToast = useCallback(() => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start(() => {
            Navigation.dismissOverlay(componentId);
        });
    }, [animatedValue, componentId]);

    useEffect(() => {
        const containerExist = containerStyle != null;
        let handler: ReturnType<typeof setTimeout> | null = null;

        if (containerExist) {
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }).start();

            handler = setTimeout(closeToast, 2000);
        }

        return () => {
            if (handler != null) {
                clearTimeout(handler);
            }
        };
    }, [closeToast, containerStyle, animatedValue]);

    const renderIconOrLoading = useMemo(() => {
        if (icon != null) {
            return <Image style={[styles.icon, iconStyle]} source={icon} defaultSource={icon}/>;
        } else if (loading) {
            return (
                <ActivityIndicator
                    style={styles.loading}
                    animating={true}
                    color={Colors.black}
                    size={"small"}
                />
            );
        } else {
            return null;
        }
    }, [loading, icon, iconStyle]);

    if (containerStyle != null) {
        return (
            <Animated.View
                style={[
                    styles.container,
                    containerStyle,
                    {
                        opacity: animatedValue,
                        transform: [
                            {
                                translateY: animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: isTopLocation ? [-CommonSizes.spacing.medium, 0] : [CommonSizes.spacing.medium, 0],
                                    extrapolate: "clamp",
                                }),
                            },
                        ],
                    },
                ]}
            >
                {renderIconOrLoading}
                <Roboto.Label.Medium style={[styles.text, textStyle]} numberOfLines={3} labelKey={text}/>
            </Animated.View>
        );
    } else {
        return null;
    }
};

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        ...CommonStyles.shadow,
        backgroundColor: colors.errorContainer,
        alignSelf: "center",
        width: minWindowDimension - CommonSizes.spacing.large,
        padding: CommonSizes.spacing.medium,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: CommonSizes.borderRadius.medium,
    } as ViewStyle,
    icon: {
        width: CommonSizes.image.medium,
        height: CommonSizes.image.medium,
        resizeMode: "contain",
        marginRight: CommonSizes.spacing.extraSmall,
    } as ImageStyle,
    loading: {
        marginRight: CommonSizes.spacing.extraSmall,
    } as ViewStyle,
    text: {
        flex: 1,
        color: colors.onErrorContainer,
        textAlign: 'center'
    } as TextStyle,
});

ToastOverlay.defaultProps = {
    loading: false,
    location: isIos ? "top" : "bottom",
};

ToastOverlay.options = {
    layout: {
        componentBackgroundColor: Colors.transparent,
    },
    overlay: {
        interceptTouchOutside: false,
    },
};
