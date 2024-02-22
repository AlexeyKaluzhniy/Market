import {useEffect, useState} from "react";
import {AppState, AppStateStatus} from "react-native";

interface ISettings {
  onChange?: (status: AppStateStatus) => void;
  onForeground?: () => void;
  onBackground?: () => void;
}

export function useAppState({onChange, onForeground, onBackground}: ISettings) {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState == "active" && appState != "active") {
        isValidFunction(onForeground) && onForeground!();
      } else if (appState == "active" && nextAppState.match(/inactive|background/)) {
        isValidFunction(onBackground) && onBackground!();
      }
      setAppState(nextAppState);
      isValidFunction(onChange) && onChange!(nextAppState);
    };

    const appStateListener = AppState.addEventListener("change", handleAppStateChange);

    return () => appStateListener.remove();
  }, [onChange, onForeground, onBackground, appState]);

  // settings validation
  function isValidFunction(func: any) {
    return func && typeof func == "function";
  }

  return {appState};
}
