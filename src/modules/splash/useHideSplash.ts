import {useEffect, useRef} from "react";
import {NativeModules} from "react-native";
import {isIos} from "~/core/theme/commonConsts";

export const useHideSplash = (callback?: () => void) => {
  const cbRef = useRef(callback);
  cbRef.current = callback;
  // todo add usePrepareDataForMain();
  useEffect(() => hideSplash(0, cbRef.current), []);
};

export const hideSplash = (timeout: number, cb?: () => void) => {
  setTimeout(() => {
    cb?.();
    NativeModules[isIos ? "Splash" : "RNBootSplash"].hide(false);
  }, timeout);
};
