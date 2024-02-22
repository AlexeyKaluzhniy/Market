import React, {FC, memo, ReactNode, useMemo} from "react";
import {Image, ImageStyle, StyleProp, StyleSheet, TextStyle, View, ViewStyle} from "react-native";
import {ThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {TouchablePlatform} from "./TouchablePlatform";
import {ImageResources} from "../ImageResources.g";
import {CommonStyles} from "~/core/theme/commonStyles";
import {hitSlopBig} from "~/core/theme/commonConsts";
import {Brand} from "~/infrastructure";
import {useThemedStyles} from "~/core/theme/hooks";

interface IProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  backHandler?: () => void;
  rightButtons?: (color: string) => ReactNode | null;
  color?: string;
}

export const NavigationTopBar: FC<IProps> = memo(({style, title, rightButtons, backHandler, color}: IProps) => {
  const styles = useThemedStyles(stylesGetter);
  const labelColor = useMemo(
    () => color || styles.colors.text,
    [color, styles],
  );

  const TextComponent = useMemo(
    () => backHandler ? Brand.H2 : Brand.H1,
    [backHandler],
  );

  return (
    <View style={[styles.container, style]}>
      <View style={[CommonStyles.rowCenter, CommonStyles.flex1]}>
        {backHandler && (
          <TouchablePlatform onPress={backHandler} style={styles.backContainer} hitSlop={hitSlopBig}>
            <Image
              source={ImageResources.arrow_left}
              style={[styles.backIconStyle, {tintColor: labelColor}]}
              resizeMode={"contain"}
            />
          </TouchablePlatform>
        )}
        <TextComponent text={title} color={labelColor} style={styles.title} numberOfLines={1} />
      </View>
      {rightButtons && rightButtons(labelColor)}
    </View>
  );
});

const stylesGetter = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.background,
    justifyContent: "space-between",
    paddingHorizontal: CommonSizes.spacing.medium,
    paddingVertical: CommonSizes.spacing.small / 2,
  } as ViewStyle,
  backContainer: {
    marginRight: CommonSizes.spacing.medium,
  } as ViewStyle,
  backIconStyle: {
    width: 24,
    height: 24,
  } as ImageStyle,
  title: {
    flex: 1,
    textTransform: "none",
  } as TextStyle,
});
