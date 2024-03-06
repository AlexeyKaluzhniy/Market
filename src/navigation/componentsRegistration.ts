import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {Pages} from "./pages";
import {Splash} from "../modules/splash/Splash";
import {AppNavigationComponentProps, NavigationHOC, NavigationHOCProps} from "./helpers/NavigationHOC";
import {reduxProvider} from "../core/store/store";
import {gestureHandlerRootHOC} from "react-native-gesture-handler";
import {Components} from "./components";
import {TopBarTitle} from "./components/TopBarTitle";
import {TopBarBackButton} from "./components/TopBarBackButton";
import {Authentication} from "../modules/authentication/Authentication";
import {Login} from "../modules/authentication/components/Login";
import {SignUp} from "../modules/authentication/components/SignUp";
import {Main} from "../modules/main/Main";
import {Favorite} from "../modules/favorite/Favorite";
import {Profile} from "../modules/profile/Profile";
import {ForgotPassword} from "../modules/authentication/components/ForgotPassword";
import {EnterCode} from "../modules/authentication/components/EnterCode";
import {NewPassword} from "../modules/authentication/components/NewPassword";
import {TopBarHeader} from "~/navigation/components/TopBarHeader";
import {Drawer} from "~/modules/drawer/Drawer";
import {About} from "~/modules/about/About";
import {ModalizeContainer} from "~/components/ModalizeContainer";
import {AdvertiseDetails} from "~/modules/details/AdvertiseDetails";

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
  registerAppScreenComponent({Component: Main, page: Pages.main, titleKey: "pages.main", useRedux: true});
  registerAppScreenComponent({Component: Favorite, page: Pages.favorite, titleKey: "pages.main", useRedux: true});
  registerAppScreenComponent({Component: Profile, page: Pages.profile, titleKey: "pages.main", useRedux: true});
  registerAppScreenComponent({Component: Authentication, page: Pages.auth, titleKey:"pages.login", useRedux: true});
  registerAppScreenComponent({Component: Login, page: Pages.login, titleKey: "authentication.loginTab", useRedux: true});
  registerAppScreenComponent({Component: SignUp, page: Pages.register, titleKey: "authentication.registerTab", useRedux: true});
  registerAppScreenComponent({Component: ForgotPassword, page: Pages.forgotPassword, useRedux: true});
  registerAppScreenComponent({Component: EnterCode, page: Pages.code, useRedux: true});
  registerAppScreenComponent({Component: NewPassword, page: Pages.newPassword, useRedux: true});
  registerAppScreenComponent({Component: Drawer, page: Pages.bottomTabsDrawer, useRedux: true});
  registerAppScreenComponent({Component: About, page: Pages.about, useRedux: true});
  registerAppScreenComponent({Component: AdvertiseDetails, page: Pages.details, useRedux: true});

  registerReduxComponent(Components.topBarTitle.name, TopBarTitle);
  registerReduxComponent(Components.topBarBackButton.name, TopBarBackButton);
  registerReduxComponent(Components.topBarHeader.name, TopBarHeader);
  registerReduxComponent(Components.modalizeContainer.name, ModalizeContainer);
}
