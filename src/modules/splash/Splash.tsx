import React, {useEffect} from "react";
import {NavigationFunctionComponent} from "react-native-navigation";
import {setAuthRoot} from "~/navigation/roots";
import {useAppSelector} from "~/core/store/store";
import {LoadingComponent} from "~/common/components/LoadingComponent";
import {setDefaultOptions} from "~/navigation/defaultOptions";
import {DarkThemeColors, LightThemeColors} from "~/core/theme/colors";

export const Splash: NavigationFunctionComponent = () => {
    const [appTheme, deviceTheme, isOnboardingVisited] = useAppSelector(state => [
        state.system.appTheme,
        state.system.deviceTheme,
        state.system.isOnboardingVisited,
    ]);

    useEffect(() => {
        setDefaultOptions(appTheme === 'light' ? LightThemeColors : DarkThemeColors);
        (async () => setAuthRoot())();
    }, [appTheme, deviceTheme, isOnboardingVisited]);

    return <LoadingComponent size={"large"}/>;
};
