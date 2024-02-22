import {getLanguage, Languages} from "~/common/localization/localization";
import {Appearance} from "react-native";

export type AppThemeType = "dark" | "light" | null;

export interface SystemState {
  isOnboardingVisited: boolean;
  language: Languages;
  appTheme: AppThemeType;
  deviceTheme?: AppThemeType;
  build: number;
}

export const SystemInitialState: SystemState = {
  isOnboardingVisited: false,
  language: getLanguage(),
  appTheme: "dark",
  deviceTheme: Appearance.getColorScheme(),
  build: 1,
};
