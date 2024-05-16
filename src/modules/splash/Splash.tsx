import React, {useEffect} from "react";
import {LayoutRoot, Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {getBottomTabsLayout, setAuthRoot} from "~/navigation/roots";
import {useAppSelector} from "~/core/store/store";
import {LoadingComponent} from "~/common/components/LoadingComponent";
import {setDefaultOptions} from "~/navigation/defaultOptions";
import {DarkThemeColors, LightThemeColors} from "~/core/theme/colors";

export const Splash: NavigationFunctionComponent = () => {
    const [appTheme, deviceTheme, isOnboardingVisited, accessToken] = useAppSelector(state => [
        state.system.appTheme,
        state.system.deviceTheme,
        state.system.isOnboardingVisited,
        state.auth.accessToken
    ]);

    useEffect(() => {
        setDefaultOptions(appTheme === 'light' ? LightThemeColors : DarkThemeColors);
        if(accessToken) {
            (async () => Navigation.setRoot(getBottomTabsLayout() as LayoutRoot))();
        } else {
            (async () => setAuthRoot())();
        }
    }, [accessToken, appTheme, deviceTheme, isOnboardingVisited]);

    return <LoadingComponent size={"large"}/>;
};
