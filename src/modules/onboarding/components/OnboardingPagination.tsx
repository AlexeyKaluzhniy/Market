import React, {FC, memo} from "react";
import {StyleSheet, TouchableOpacity, View, ViewStyle} from "react-native";
import {Colors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {isAndroid} from "~/core/theme/commonConsts";
import {Brand} from "~/infrastructure";

interface IProps {
  totalItems: number;
  activeIndex: number;
  onSkipPress?: () => void;
  isTicketCard?: boolean;
}

export const OnboardingPagination: FC<IProps> = memo(({activeIndex, totalItems, onSkipPress, isTicketCard}) => {
  const dots = [];

  for (let i = 0; i < totalItems; i++) {
    dots.push(<View
      key={i}
      style={activeIndex == i ? (isTicketCard ? [styles.activeIcon, {backgroundColor: Colors.secondary}] : styles.activeIcon)
        : (isTicketCard ? [styles.inactiveIcon, {backgroundColor: Colors.secondary, opacity: 0.6}] : styles.inactiveIcon)}
    />);
  }

  return (
    <View style={styles.wrapper}>
      <Brand.H4 style={styles.skipLabel} color={Colors.transparent} labelKey={"common.skip"} />
      <View style={isTicketCard ? [styles.container, styles.containerAbsolute] : [styles.container, {...commonPaddings}]}>{dots}</View>
      {
        !isTicketCard ? (
          <TouchableOpacity onPress={onSkipPress} activeOpacity={0.7}>
            <Brand.H4 style={styles.skipLabel} color={Colors.white} labelKey={"common.skip"} />
          </TouchableOpacity>
        ) : null
      }
    </View>
  );
});

/**
 * Border radius is set this way in order to avoid error on Android
 * when setting borderRadius and background with PlatformColor
 */
const commonIcon: ViewStyle = {
  width: CommonSizes.spacing.medium,
  height: 1,
  marginHorizontal: CommonSizes.spacing.extraSmall / 2,
};

const commonPaddings = {
  marginTop: isAndroid ? CommonSizes.spacing.medium : undefined,
  marginHorizontal: CommonSizes.spacing.medium,
  paddingVertical: isAndroid ? CommonSizes.spacing.mediumPlus : CommonSizes.spacing.medium,
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  } as ViewStyle,
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  containerAbsolute: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  } as ViewStyle,
  skipLabel: {...commonPaddings} as ViewStyle,
  activeIcon: {
    ...commonIcon,
    backgroundColor: Colors.white,
    height: 2,
  } as ViewStyle,
  inactiveIcon: {
    ...commonIcon,
    backgroundColor: `${Colors.white}cc`,
  } as ViewStyle,
});
