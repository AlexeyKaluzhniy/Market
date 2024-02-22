import React from "react";
import {Image, Platform, Pressable, StyleSheet} from "react-native";
import {useThemedStyles} from "~/core/theme/hooks";
import {ThemeColors} from "~/core/theme/colors";
import {ImageResources} from "~/common/ImageResources.g";
import {CommonSizes} from "~/core/theme/commonSizes";

export const PasswordIcon = ({isPasswordShown, toggleEye }: {isPasswordShown: boolean; toggleEye: () => void}) => {
  const styles = useThemedStyles(stylesGetter);

  const icon = (isPasswordShown ? ImageResources.eye : ImageResources.eyeclosed);

  return (
    <Pressable style={styles.iconContainer} onPress={toggleEye}>
      <Image source={icon} style={styles.eyeIcon}/>
    </Pressable>
  );
};

const stylesGetter = (colors: ThemeColors) => StyleSheet.create({
  iconContainer: {justifyContent: "center"},
  eyeIcon: {
    width: CommonSizes.spacing.mediumPlus,
    height: CommonSizes.spacing.mediumPlus,
    tintColor: colors.winline2,
    alignSelf: "center",
    marginRight: CommonSizes.spacing.medium,
    ...Platform.select({
      android: {
        marginRight: CommonSizes.spacing.medium,
      },
    }),
  },
});
