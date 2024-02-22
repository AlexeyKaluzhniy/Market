import {NavigationFunctionComponent} from "react-native-navigation";
import {Image, Keyboard, Pressable, StyleSheet, ViewStyle} from "react-native";
import {TFuncKeyApp} from "~/common/localization/localization";
import React from "react";
import {ImageResources} from "~/common/ImageResources.g";
import {navigation} from "~/services";
import {useThemeColors} from "~/core/theme/hooks";
import {CommonSizes} from "~/core/theme/commonSizes";

interface IProps {
  title: TFuncKeyApp;
}

export const TopBarBackButton: NavigationFunctionComponent<IProps> = (props) => {
  const colors = useThemeColors();
  const onArrowPress = () => {
    Keyboard.dismiss();
    setTimeout(() => navigation.pop(), 500);
  };

  return (
    <Pressable style={styles.container} onPress={onArrowPress}>
      <Image source={ImageResources.arrow_left} style={{tintColor: colors.text}}/>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: CommonSizes.spacing.medium,
    minHeight: CommonSizes.lineHeight.smallPlus,
    alignItems: "center",
    justifyContent: "space-between",
  } as ViewStyle,
});
