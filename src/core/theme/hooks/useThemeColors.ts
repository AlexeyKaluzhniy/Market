import {useEffect, useMemo, useState} from "react";
import {DarkThemeColors, LightThemeColors} from "../colors";
import {useAppSelector} from "../../store/store";

export function useThemeColors() {
  const [appTheme, deviceTheme] = useAppSelector(state => [state.system.appTheme, state.system.deviceTheme]);
  const [scheme, setScheme] = useState<"light" | "dark">(appTheme || deviceTheme || "dark");

  useEffect(() => {
    setScheme(appTheme || deviceTheme || "dark");
  }, [deviceTheme, appTheme]);

  return useMemo(() => scheme == "light" ? LightThemeColors : DarkThemeColors, [scheme]);
}

