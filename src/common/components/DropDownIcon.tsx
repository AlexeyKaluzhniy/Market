import React from "react";
import {Image, Platform, Pressable, StyleSheet} from "react-native";
import {useThemedStyles} from "~/core/theme/hooks";
import {ThemeColors} from "~/core/theme/colors";
import {ImageResources} from "~/common/ImageResources.g";
import {CommonSizes} from "~/core/theme/commonSizes";

export const DropDownIcon = ({onPress, editable}: {onPress?: () => void; editable?: boolean}) => {
  const styles = useThemedStyles(stylesGetter);

  return (
    <Pressable style={styles.iconContainer} onPress={onPress} disabled={editable != null && !editable}>
      <Image source={ImageResources.drop_down} style={styles.dropDown}/>
    </Pressable>
  );
};

const stylesGetter = (colors: ThemeColors) => StyleSheet.create({
  iconContainer: {justifyContent: "center"},
  dropDown: {
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
