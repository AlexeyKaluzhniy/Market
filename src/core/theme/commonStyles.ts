import {Platform, StyleSheet, TextStyle, ViewStyle} from "react-native";
import {Fonts} from "./fonts";
import {CommonSizes} from "./commonSizes";
import {Colors} from "~/core/theme/colors";

export const CommonStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  } as ViewStyle,
  flexGrow: {
    flexGrow: 1,
  } as ViewStyle,
  flexShrink: {
    flexShrink: 1,
  } as ViewStyle,
  flex1Padding: {
    flex: 1,
    paddingHorizontal: CommonSizes.spacing.medium,
  } as ViewStyle,
  flexCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  flexColumnCenterStretch: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
  } as ViewStyle,
  flexPlatformBackground: {
    flex: 1,
    backgroundColor: Colors.white,
  } as ViewStyle,
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  row: {
    flexDirection: "row",
  } as ViewStyle,
  columnAlignStart: {
    flexDirection: "column",
    alignItems: "flex-start",
  } as ViewStyle,
  shadow: {
    ...Platform.select({
      ios: {
        shadowOffset: {height: 4, width: 0},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      } as ViewStyle,
      android: {
        elevation: 4,
      } as ViewStyle,
    }),
  } as ViewStyle,
  shadowTopBar: {
    ...Platform.select({
      ios: {
        shadowOffset: {height: 8, width: 0},
        shadowOpacity: 1,
        shadowRadius: 12,
        shadowColor: "rgba(0.22, 0.27, 0.28, 0.08)",
      },
      android: {
        elevation: 5,
      },
    }),
  },
  iPhoneXFooter: {
    height: 20,
  } as ViewStyle,
  normalText: {
    fontFamily: Fonts.system,
    fontSize: CommonSizes.font.medium,
    lineHeight: CommonSizes.lineHeight.medium,
    color: Colors.black,
  } as TextStyle,
  noTextTransform: {
    textTransform: "none",
  },
});
