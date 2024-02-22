import React, {FC, memo, ReactNode, useCallback, useMemo, useState} from "react";
import {Image, ImageStyle, StyleSheet, View, ViewStyle} from "react-native";
import {TFuncKeyApp} from "~/common/localization/localization";
import {Colors} from "~/core/theme/colors";
import {useThemeColors} from "~/core/theme/hooks";
import {CommonSizes} from "~/core/theme/commonSizes";
import {CommonStyles} from "~/core/theme/commonStyles";
import {Brand, Regular} from "~/infrastructure";
import {TouchablePlatform} from "~/common/components/TouchablePlatform";
import {ImageResources} from "~/common/ImageResources.g";
import {LoadingComponent} from "~/common/components/LoadingComponent";
import {SpaceSeparator} from "~/common/components/SpaceSeparator";

interface IProps {
  titleKey?: TFuncKeyApp;
  title?: string;
  allKey?: TFuncKeyApp;
  onAllPress?: (() => void) | (() => Promise<void>);
  children?: ReactNode | undefined;
}

const PageSectionFC: FC<IProps> = (props: IProps) => {
  const {titleKey, title, allKey, onAllPress, children} = props;
  const colors = useThemeColors();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const settings = useMemo(() => ({
    androidRippleConfig: {borderless: true, color: Colors.buttonHighlight},
    titleColor: colors.theme == "light" ? colors.text : colors.secondaryText,
  }), [colors]);

  const onAllPressLocal = useCallback(async () => {
    setIsLoading(true);
    onAllPress && await onAllPress();
    setIsLoading(false);
  }, [onAllPress]);

  return (
    <View style={styles.container}>
      {(titleKey || title) && (
        <View style={styles.titleContainer}>
          <Brand.H3
            labelKey={titleKey}
            text={title}
            style={[CommonStyles.flexGrow, CommonStyles.flex1]}
            color={settings.titleColor}
            numberOfLines={1}
            maxFontSizeMultiplier={1.2}
            minimumFontScale={20}
          />
          <SpaceSeparator />
          {allKey && <TouchablePlatform
            androidRippleConfig={settings.androidRippleConfig}
            style={CommonStyles.rowCenter}
            onPress={onAllPressLocal}
            onLongPress={onAllPressLocal}
          >
            <Regular.H4.Regular labelKey={allKey} color={colors.main} allowFontScaling={false}/>
            <Image source={ImageResources.arrow_right} style={styles.arrowIcon} />
            {isLoading && <LoadingComponent containerStyle={StyleSheet.absoluteFillObject} />}
          </TouchablePlatform>}
        </View>
      )}
      {children}
    </View>
  );
};

export const PageSection = memo(PageSectionFC);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: CommonSizes.spacing.medium,
    marginTop: CommonSizes.spacing.largePlus,
    overflow: "visible",
  } as ViewStyle,
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: CommonSizes.spacing.medium,
    alignItems: "flex-end",
  } as ViewStyle,
  arrowIcon: {
    width: 16,
    height: 16,
    marginLeft: CommonSizes.spacing.extraSmall / 2,
    tintColor: Colors.primary,
  } as ImageStyle,
});
