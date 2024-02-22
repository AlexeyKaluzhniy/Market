import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {Pages} from "./pages";
import {Main} from "~/modules/main/Main";
import {Splash} from "~/modules/splash/Splash";
import {ToastOverlay} from "~/common/components/ToastOverlay";
import {DatePickerOverlay} from "~/common/components/DatePickerOverlay";
import {Onboarding} from "~/modules/onboarding/Onboarding";
import {Search} from "~/modules/search/Search";
import {Settings} from "~/modules/settings/Settings";
import {AppNavigationComponentProps, NavigationHOC, NavigationHOCProps} from "~/navigation/helpers/NavigationHOC";
import {Menu} from "~/modules/menu/Menu";
import {reduxProvider} from "~/core/store/store";
import {gestureHandlerRootHOC} from "react-native-gesture-handler";
import {Components} from "~/navigation/components";
import {TopBarTitle} from "~/navigation/components/TopBarTitle";
import {TopBarBackButton} from "~/navigation/components/TopBarBackButton";

function registerAppScreenComponent<P extends AppNavigationComponentProps>(props: NavigationHOCProps<P>) {
  Navigation.registerComponent(props.page.name, () => NavigationHOC(props), () => props.Component);
}

const registerReduxComponent = (name: string, Component: NavigationFunctionComponent<any>) => {
  Navigation.registerComponent(
    name,
    () => gestureHandlerRootHOC(reduxProvider(Component)),
    () => Component,
  );
};

export function registerComponents() {
  registerAppScreenComponent({Component: Splash, page: Pages.splash, useRedux: true});
  registerAppScreenComponent({Component: Onboarding, page: Pages.onboarding, useRedux: true});
  registerAppScreenComponent({Component: Main, page: Pages.main, titleKey: "pages.main", useRedux: true});
  registerAppScreenComponent({Component: Search, page: Pages.search, titleKey: "pages.search", useRedux: true});
  registerAppScreenComponent({Component: Settings, page: Pages.settings, titleKey: "pages.settings", useRedux: true});
  registerAppScreenComponent({Component: Menu, page: Pages.menu, titleKey: "pages.menu", useRedux: true});
  Navigation.registerComponent(Pages.toast.name, () => ToastOverlay);

  registerReduxComponent(Components.topBarTitle.name, TopBarTitle);
  registerReduxComponent(Components.topBarBackButton.name, TopBarBackButton);
  registerReduxComponent(Pages.datePicker.name, DatePickerOverlay);
}
