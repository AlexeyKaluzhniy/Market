import {Appearance} from "react-native";
import {Navigation} from "react-native-navigation";
import {DarkThemeColors, LightThemeColors, ThemeColors} from "~/core/theme/colors";
import {ImageResources} from "~/common/ImageResources.g";
import {i18next} from "~/common/localization/localization";
import {Fonts} from "~/core/theme/fonts";
import {isIos} from "~/core/theme/commonConsts";

export function setDefaultOptions(colors?: ThemeColors) {
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
        fontFamily: Fonts.brand,
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
      animate: isIos,
      hideShadow: false,
      translucent: false,
      animateTabSelection: false,
      preferLargeIcons: false,
      tabsAttachMode: "together",
      titleDisplayMode: "alwaysShow",
      backgroundColor: {
        dark: getColor("background", "element", DarkThemeColors.background),
        light: getColor("background", "element", LightThemeColors.element),
      },
      borderWidth: 1,
      borderColor: {
        dark: getColor("winline2", "secondaryText", DarkThemeColors.winline2),
        light: getColor("winline2", "secondaryText", LightThemeColors.secondaryText),
      },
    },
    bottomTab: {
      selectedTextColor: {
        dark: getColor("text", "text", DarkThemeColors.text),
        light: getColor("text", "text", LightThemeColors.main),
      },
      textColor: {
        dark: colors?.secondaryText || DarkThemeColors.secondaryText,
        light: colors?.secondaryText || LightThemeColors.secondaryText,
      },
      fontWeight: "700",
      fontSize: 11,
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
