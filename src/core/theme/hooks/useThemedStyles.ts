import {useMemo} from "react";
import {DarkThemeColors, LightThemeColors, ThemeColors} from "~/core/theme/colors";
import {useThemeColors} from "~/core/theme/hooks/useThemeColors";

export function useThemedStyles<T>(
  stylesGetter: (colors: ThemeColors) => T,
  forceTheme?: "light" | "dark",
): T & {colors: ThemeColors} {
  let colors = useThemeColors();
  if (forceTheme) {
    colors = forceTheme == "light" ? LightThemeColors : DarkThemeColors;
  }

  return useMemo(() => ({...stylesGetter(colors), colors}), [colors]);
}
