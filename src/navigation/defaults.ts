import {i18next} from "../common/localization/localization";
import {Navigation} from "react-native-navigation";
import {Colors, LightThemeColors} from "../core/theme/colors";
import {isAndroid} from "../core/theme/commonConsts";

export function setDefaultOptions() {
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
      componentBackgroundColor: LightThemeColors.background,
    },
    topBar: {
      animate: true,
      drawBehind: !isAndroid,
      height: 68,
      background: {
        translucent: true,
        color: LightThemeColors.background,
      },
      title: {
        color: Colors.black,
      },
      largeTitle: {
        visible: false,
      },
      scrollEdgeAppearance: {
        active: true,
        noBorder: true,
        background: {
          translucent: true,
          color: Colors.gray,
        },
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
      noBorder: false,
    },
    bottomTabs: {
      animate: true,
      hideShadow: false,
      translucent: true,
      animateTabSelection: true,
      preferLargeIcons: false,
      tabsAttachMode: "together",
      backgroundColor: LightThemeColors.backgroundBottomTab,
    },
    bottomTab: {
      selectedTextColor: LightThemeColors.text,
      textColor: LightThemeColors.text,
      iconHeight: 25,
    },
    statusBar: {
      backgroundColor: LightThemeColors.background,
      visible: true,
    },
  });
}
