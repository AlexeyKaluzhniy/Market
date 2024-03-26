import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {Pages} from "./pages";
import {Splash} from "~/modules/splash/Splash";
import {AppNavigationComponentProps, NavigationHOC, NavigationHOCProps} from "./helpers/NavigationHOC";
import {reduxProvider} from "~/core/store/store";
import {gestureHandlerRootHOC} from "react-native-gesture-handler";
import {Components} from "./components";
import {TopBarTitle} from "./components/TopBarTitle";
import {TopBarBackButton} from "./components/TopBarBackButton";
import {Authentication} from "~/modules/authentication/Authentication";
import {Login} from "~/modules/authentication/components/Login";
import {SignUp} from "~/modules/authentication/components/SignUp";
import {Main} from "~/modules/main/Main";
import {Favorite} from "~/modules/favorite/Favorite";
import {Profile} from "~/modules/profile/Profile";
import {ForgotPassword} from "~/modules/authentication/components/ForgotPassword";
import {EnterCode} from "~/modules/authentication/components/EnterCode";
import {NewPassword} from "~/modules/authentication/components/NewPassword";
import {TopBarHeader} from "~/navigation/components/TopBarHeader";
import {Drawer} from "~/modules/drawer/Drawer";
import {About} from "~/modules/about/About";
import {ModalizeContainer} from "~/components/ModalizeContainer";
import {AdvertiseDetails} from "~/modules/details/AdvertiseDetails";
import {NewAdvertise} from "~/modules/newAdvertise/NewAdvertise";
import {EditProfile} from "~/modules/profile/components/EditProfile";
import {Drafts} from "~/modules/drafts/Drafts";
import {ToastOverlay} from "~/common/components/ToastOverlay";

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
    registerAppScreenComponent({Component: Main, page: Pages.main, useRedux: true});
    registerAppScreenComponent({Component: Favorite, page: Pages.favorite, useRedux: true});
    registerAppScreenComponent({Component: Profile, page: Pages.profile, useRedux: true});
    registerAppScreenComponent({Component: Authentication, page: Pages.auth, useRedux: true});
    registerAppScreenComponent({Component: Login, page: Pages.login, useRedux: true});
    registerAppScreenComponent({Component: SignUp, page: Pages.register, useRedux: true});
    registerAppScreenComponent({Component: ForgotPassword, page: Pages.forgotPassword, useRedux: true});
    registerAppScreenComponent({Component: EnterCode, page: Pages.code, useRedux: true});
    registerAppScreenComponent({Component: NewPassword, page: Pages.newPassword, useRedux: true});
    registerAppScreenComponent({Component: Drawer, page: Pages.bottomTabsDrawer, useRedux: true});
    registerAppScreenComponent({Component: About, page: Pages.about, useRedux: true});
    registerAppScreenComponent({Component: AdvertiseDetails, page: Pages.details, useRedux: true});
    registerAppScreenComponent({Component: NewAdvertise, page: Pages.newAdvertise, useRedux: true});
    registerAppScreenComponent({Component: EditProfile, page: Pages.editProfile, useRedux: true});
    registerAppScreenComponent({Component: Drafts, page: Pages.drafts, useRedux: true});
    registerAppScreenComponent({Component: ToastOverlay, page: Pages.toast, useRedux: true});

    registerReduxComponent(Components.topBarTitle.name, TopBarTitle);
    registerReduxComponent(Components.topBarBackButton.name, TopBarBackButton);
    registerReduxComponent(Components.topBarHeader.name, TopBarHeader);
    registerReduxComponent(Components.modalizeContainer.name, ModalizeContainer);
}
