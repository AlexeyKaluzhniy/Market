import {Appearance} from "react-native";
import {Navigation} from "react-native-navigation";
import {DarkThemeColors, LightThemeColors, ThemeColors} from "~/core/theme/colors";
import {ImageResources} from "~/common/ImageResources.g";
import {i18next} from "~/common/localization/localization";
import {Fonts} from "~/core/theme/fonts";

export function setDefaultOptions(colors: ThemeColors) {
    const isLight = colors?.theme == "light";

    function getColor(
        darkKey: keyof Omit<ThemeColors, "linealBg" | "personalAreaHeader" | 'MVPFade'>,
        lightKey: keyof Omit<ThemeColors, "linealBg" | "personalAreaHeader" | "MVPFade">,
        fallback: string,
    ): string {
        return (isLight ? colors?.[lightKey] : colors?.[darkKey]) || fallback;
    }

    Navigation.setDefaultOptions({
        animations: {
            setRoot: {
                waitForRender: true,
            },
            setStackRoot: {
                waitForRender: true,
            },
        },
        layout: {
            orientation: ["portrait"],
            componentBackgroundColor: {
                dark: colors?.background || DarkThemeColors.background,
                light: colors?.background || LightThemeColors.background,
            },
        },
        topBar: {
            animate: false,
            drawBehind: false,
            background: {
                translucent: false,
                color: {
                    dark: colors?.background || DarkThemeColors.background,
                    light: colors?.background || LightThemeColors.background,
                },
            },
            title: {
                color: {
                    dark: getColor("text", "text", DarkThemeColors.text),
                    light: getColor("text", "text", LightThemeColors.text),
                },
                fontFamily: Fonts.roboto,
                fontSize: 17,
                alignment: "fill",
            },
            largeTitle: {
                visible: false,
            },
            scrollEdgeAppearance: {
                active: true,
                noBorder: true,
            },
            searchBar: {
                visible: false,
                hideOnScroll: true,
                hideTopBarOnFocus: true,
                obscuresBackgroundDuringPresentation: true,
            },
            hideNavBarOnFocusSearchBar: true,
            searchBarHiddenWhenScrolling: true,
            searchBarPlaceholder: i18next.t("common.search"),
            noBorder: true,
            elevation: 0,
            backButton: {
                icon: ImageResources.arrow_left,
                color: {
                    dark: getColor("text", "text", DarkThemeColors.text),
                    light: getColor("text", "text", LightThemeColors.text),
                },
                showTitle: false,
            },
        },
        bottomTabs: {
            animate: false,
            hideShadow: false,
            translucent: true,
            animateTabSelection: true,
            preferLargeIcons: false,
            tabsAttachMode: "together",
            backgroundColor: {
                dark: getColor("background", "background", DarkThemeColors.background),
                light: getColor("background", "background", LightThemeColors.background),
            },
        },
        bottomTab: {
            selectedTextColor: {
                dark: colors?.onSurface || DarkThemeColors.onSurface,
                light: colors?.onSurface || LightThemeColors.onSurface
            },
            textColor: {
                dark: colors?.onSurfaceVariant || DarkThemeColors.onSurfaceVariant,
                light: colors?.onSurfaceVariant || LightThemeColors.onSurfaceVariant
            },
            iconHeight: 25,
            iconColor: {
                dark: colors?.outline || DarkThemeColors.outline,
                light: colors?.outline || LightThemeColors.outline
            },
            selectedIconColor: {
                dark: colors?.onSurface || DarkThemeColors.onSurface,
                light: colors?.onSurface || LightThemeColors.onSurface
            }
        },
        popGesture: true,
        statusBar: {
            style: (isLight || (!colors && Appearance.getColorScheme() == "light")) ? "dark" : "light",
            backgroundColor: {
                dark: colors?.background || DarkThemeColors.background,
                light: colors?.background || LightThemeColors.background,
            },
        },
    });
}
