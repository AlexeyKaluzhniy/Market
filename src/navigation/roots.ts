import {Pages} from "./pages";
import {LayoutBottomTabs, Navigation} from "react-native-navigation";
import {Tabs} from "./tabs";
import {TabbarDarkResources, TabbarInactiveResources, TabbarLightResources} from "~/common/ImageResources.g";
import {i18next} from "~/common/localization/localization";
import {ImageURISource} from "react-native";
import {DarkThemeColors, LightThemeColors, ThemeColors} from "~/core/theme/colors";

interface ITabBarIconSet {
  bag: ImageURISource;
  date: ImageURISource;
  home: ImageURISource;
  menu: ImageURISource;
  news: ImageURISource;
}

export function setStorybookRoot() {
  Navigation.setRoot({
    root: {
      component: {
        name: Pages.storybook.name,
        id: Pages.storybook.id,
        options: {
          topBar: {
            visible: true,
            title: {
              text: i18next.t("pages.storybook"),
            },
          },
        },
      },
    },
  });
}

export function setInitialRoot() {
  Navigation.setRoot({
    root: {
      component: {
        name: Pages.splash.name,
        id: Pages.splash.id,
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    },
  });
}

export async function setOnboardingRoot() {
  return Navigation.setRoot({
    root: {
      component: {
        name: Pages.onboarding.name,
        id: Pages.onboarding.id,
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    },
  });
}

export const bottomTabsLayout = (iconSet: ITabBarIconSet, colors: ThemeColors): LayoutBottomTabs => ({
  id: Pages.tabs.id,
  children: [
    {
      stack: {
        id: Tabs.main.id,
        children: [
          {
            component: {
              id: Pages.main.id,
              name: Pages.main.name,
            },
          },
        ],
        options: {
          bottomTab: {
            text: i18next.t("pages.main"),
            icon: TabbarInactiveResources.home,
            iconColor: colors.secondaryText,
            selectedIcon: iconSet.home,
            selectedIconColor: null,
          },
        },
      },
    },
    {
      stack: {
        id: Tabs.search.id,
        children: [
          {
            component: {
              id: Pages.search.id,
              name: Pages.search.name,
            },
          },
        ],
        options: {
          bottomTab: {
            text: i18next.t("pages.search"),
            icon: TabbarInactiveResources.news,
            iconColor: colors.secondaryText,
            selectedIcon: iconSet.home,
            selectedIconColor: null,
          },
        },
      },
    },
    {
      stack: {
        id: Tabs.settings.id,
        children: [
          {
            component: {
              id: Pages.settings.id,
              name: Pages.settings.name,
            },
          },
        ],
        options: {
          bottomTab: {
            text: i18next.t("pages.settings"),
            icon: TabbarInactiveResources.menu,
            iconColor: colors.secondaryText,
            selectedIcon: iconSet.home,
            selectedIconColor: null,
          },
        },
      },
    },
    {
      stack: {
        id: Tabs.menu.id,
        children: [
          {
            component: {
              id: Pages.menu.id,
              name: Pages.menu.name,
            },
          },
        ],
        options: {
          bottomTab: {
            text: i18next.t("pages.settings"),
            icon: TabbarInactiveResources.menu,
            iconColor: colors.secondaryText,
            selectedIcon: iconSet.menu,
            selectedIconColor: null,
          },
        },
      },
    },
  ],
});

export const getTabsRootLayout = (theme: "light" | "dark") => {
  let iconSet: ITabBarIconSet;
  let colors: ThemeColors;
  if (theme == "light") {
    iconSet = TabbarLightResources;
    colors = LightThemeColors;
  } else {
    iconSet = TabbarDarkResources;
    colors = DarkThemeColors;
  }

  return {
    root: {
      bottomTabs: bottomTabsLayout(iconSet, colors),
    },
  };
};
