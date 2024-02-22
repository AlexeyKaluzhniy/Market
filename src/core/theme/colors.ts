interface IThemeColors {
  theme: "light" | "dark";
  main: string;
  element: string;
  background: string;
  text: string;
  secondaryText: string;
  danger: string;
  attention: string;
  positive: string;
  winline1: string;
  winline2: string;
  redShade: string;
  linealBg: {color: string; position: number; opacity: number}[];
  personalAreaHeader: {color: string; position: number; opacity: number}[];
  MVPFade: {color: string; position: number; opacity: number}[];
}

export type ThemeColors = IThemeColors;

export const LightThemeColors: IThemeColors = {
  theme: "light",
  main: "#cc122d",
  element: "#ffffff",
  background: "#f4f5f8",
  text: "#1f2731",
  secondaryText: "#828997",
  danger: "#f51709",
  attention: "#ffbd3e",
  positive: "#4acb0d",
  winline1: "#ff6a13",
  winline2: "#a0a5ac",
  redShade: "#f9eaea",
  linealBg: [
    {color: "#0d1116", position: 0, opacity: 0.2},
    {color: "#0d1116", position: 0.25, opacity: 0},
    {color: "#0d1116", position: 0.55, opacity: 0.82},
    {color: "#0d1116", position: 0.6, opacity: 0.95},
    {color: "#0d1116", position: 0.65, opacity: 1},
    {color: "#0d1116", position: 1, opacity: 0},
  ],
  personalAreaHeader: [
    {color: "#7D0504", opacity: 0, position: 0},
    {color: "#960A09", opacity: 1, position: 0.5},
    {color: "#f4f5f8", opacity: 1, position: 0.9},
  ],
  MVPFade: [
    {color: "#0D1116", position: 1, opacity: 0.95},
    {color: "#000000", position: 0, opacity: 0.1},
  ],
};
// todo MVPFade
export const DarkThemeColors: IThemeColors = {
  theme: "dark",
  main: "#cc122d",
  element: "#1f2731",
  background: "#0d1116",
  text: "#ffffff",
  secondaryText: "#939bac",
  danger: "#eb2f16",
  attention: "#ffbd3e",
  positive: "#7ac500",
  winline1: "#ff6a13",
  winline2: "#5c6168",
  redShade: "#f9eaea00",
  linealBg: [
    {color: "#0d1116", position: 0, opacity: 0.2},
    {color: "#0d1116", position: 0.25, opacity: 0},
    {color: "#0d1116", position: 0.55, opacity: 0.82},
    {color: "#0d1116", position: 0.6, opacity: 0.95},
    {color: "#0d1116", position: 0.65, opacity: 1},
    {color: "#0d1116", position: 1, opacity: 1},
  ],
  personalAreaHeader: [
    {color: "#7D0504", opacity: 0, position: 0},
    {color: "#5E090B", opacity: 1, position: 0.5},
    {color: "#0d1116", opacity: 1, position: 0.9},
  ],
  MVPFade: [
    {color: "#0D1116", position: 1, opacity: 0.95},
    {color: "#000000", position: 0, opacity: 0.1}],
};

export const getCommonGradientStops = (color: string) => ([
  {color, opacity: 0, position: 0},
  {color, opacity: 0.1875, position: 0.4456},
  {color, opacity: 1, position: 1},
]);

export const newsHeadlineGradientStops = [
  {color: "#0d1116", opacity: 0.5, position: 0},
  {color: "#0d1116", opacity: 0.17, position: 0.1},
  {color: "#0d1116", opacity: 0, position: 0.2},
  {color: "#0d1116", opacity: 0.05, position: 0.3},
  {color: "#0d1116", opacity: 0.5, position: 0.5},
  {color: "#0d1116", opacity: 0.75, position: 0.7},
  {color: "#0d1116", opacity: 1, position: 1},
];

// todo: remove
export enum Colors {
  transparent = "transparent",
  successToast = "#D2F5DC",
  failureToast = "#F5D2DC",
  // for android
  primaryDark = "#930005",
  // brand colors
  gray = "#A5ACB8",
  primary = "#cc122d",
  white = "#FFFFFF",
  black = "#000000",
  red = "#FF0000",
  buttonHighlight = "#FFE9EC",
  solidButtonHighlight = "#9b001a",
  lightPrimary = "#EAEDFB",
  secondary = "#939BAC",
  tertialy = "#C4C4CC",
  winline2Disabled = "#5C6168",
  dark = "#1F2E4B",
  lightThemeBG = "#F4F5F8",
  darkThemeBG = "#0D1116",
  errorBG = "#ECC5C3",

  // add colors
  white05 = "#FFFFFF7F",
  lightest = "#F8F9FF",
  danger = "#DC0000",
  negativeSecondary = "#FAEBEB",
  attention = "#FFBD3E",
  black25 = "#00000041",
  shadow = "rgba(56, 68, 72, 0.08)",
  avatarBorder = "#668671",
  social = "#A5ACB810",
  validationBackground = "#FAEBEB",

  //debug
  blue = "#369",
  green = "#396",
}

export enum PlatformColorsIOS {
  /* Label Colors */
  label = "label",
  secondaryLabel = "secondaryLabel",
  tertiaryLabel = "tertiaryLabel",
  quaternaryLabel = "quaternaryLabel",

  /* Fill Colors */
  systemFill = "systemFill",
  secondarySystemFill = "secondarySystemFill",
  tertiarySystemFill = "tertiarySystemFill",
  quaternarySystemFill = "quaternarySystemFill",

  /* Text Colors */
  placeholderText = "placeholderText",

  /* Standard Content Background Colors */
  systemBackground = "systemBackground",
  secondarySystemBackground = "secondarySystemBackground",
  tertiarySystemBackground = "tertiarySystemBackground",

  /* Grouped Content Background Colors */
  systemGroupedBackground = "systemGroupedBackground",
  secondarySystemGroupedBackground = "secondarySystemGroupedBackground",
  tertiarySystemGroupedBackground = "tertiarySystemGroupedBackground",

  /* Separator Colors */
  separator = "separator",
  opaqueSeparator = "opaqueSeparator",

  /* Link Color */
  link = "link",

  /* Nonadaptable Colors */
  darkText = "darkText",
  lightText = "lightText",

  /* Standard Colors */
  /* Adaptable Colors */
  systemBlue = "systemBlue",
  systemGreen = "systemGreen",
  systemIndigo = "systemIndigo",
  systemOrange = "systemOrange",
  systemPink = "systemPink",
  systemPurple = "systemPurple",
  systemRed = "systemRed",
  systemTeal = "systemTeal",
  systemYellow = "systemYellow",

  /* Adaptable Gray Colors */
  systemGray = "systemGray",
  systemGray2 = "systemGray2",
  systemGray3 = "systemGray3",
  systemGray4 = "systemGray4",
  systemGray5 = "systemGray5",
  systemGray6 = "systemGray6",
}

export enum PlatformColorsAndroid {
  primary = "?attr/colorPrimary",
  secondary = "?attr/colorSecondary",
  primarySurface = "?attr/colorPrimarySurface",
  surface = "?attr/colorSurface",

  primaryVariant = "?attr/colorPrimaryVariant",
  secondaryVariant = "?attr/colorSecondaryVariant",

  onPrimary = "?attr/colorOnPrimary",
  onSecondary = "?attr/colorOnSecondary",
  onSurface = "?attr/colorOnSurface",
  onError = "?attr/colorOnError",
  onBackground = "?attr/colorOnBackground",

  background = "?android:attr/colorBackground",

  textPrimary = "?android:attr/textColorPrimary",
  textSecondary = "?android:attr/textColorSecondary",

  normal = "?attr/colorControlNormal",
  activated = "?attr/colorControlActivated",
  highlight = "?attr/colorControlHighlight",
  error = "?attr/colorError",

  holoPurple = "@android:color/holo_purple",
  holoGreenLight = "@android:color/holo_green_light",
  holoGreenDark = "@android:color/holo_green_dark",
  darkerGray = "@android:color/darker_gray",
  holoBlueLight = "@android:color/holo_blue_light",
  holoBlueDark = "@android:color/holo_blue_dark",
}
