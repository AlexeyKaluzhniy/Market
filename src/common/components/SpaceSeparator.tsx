import React, {FC} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";

export const SpaceSeparatorHeight = CommonSizes.spacing.medium;

export const SpaceSeparator: FC<{isTall?: boolean}> = ({isTall= false}) => {
  return <View style={isTall ? styles.spacerTall : styles.spacer} />;
};

const styles = StyleSheet.create({
  spacer: {
    width: CommonSizes.spacing.medium,
    height: CommonSizes.spacing.medium,
  } as ViewStyle,
  spacerTall: {
    width: CommonSizes.spacing.mediumPlus,
    height: CommonSizes.spacing.mediumPlus
  }
});
