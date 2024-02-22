import React, {useEffect} from "react";
import {NavigationFunctionComponent} from "react-native-navigation";
import {getTabsRootLayout, setOnboardingRoot} from "~/navigation/roots";
import {useAppSelector} from "~/core/store/store";
import {LoadingComponent} from "~/common/components/LoadingComponent";
import {navigation} from "~/services";

export const Splash: NavigationFunctionComponent = () => {
  const [appTheme, deviceTheme, isOnboardingVisited] = useAppSelector(state => [
    state.system.appTheme,
    state.system.deviceTheme,
    state.system.isOnboardingVisited,
  ]);

  useEffect(() => {
    if (isOnboardingVisited) {
      navigation.setRoot(getTabsRootLayout(appTheme || deviceTheme || "dark"));
      // .then(async () => dynamicLink.init());
      // (async () => dynamicLink.init())();
    } else {
      (async () => setOnboardingRoot())();
    }
  }, [appTheme, deviceTheme, isOnboardingVisited]);

  return <LoadingComponent size={"large"} />;
};
