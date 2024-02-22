import React, {FC, memo, useMemo} from "react";
import {
  ActivityIndicator,
  Image,
  ImageProps,
  ImageStyle,
  ImageURISource,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import {ButtonType, TouchablePlatformProps} from "~/types";
import {TFuncKeyApp} from "~/common/localization/localization";
import {Colors, DarkThemeColors, LightThemeColors, ThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {Brand} from "~/infrastructure/typography";
import {useTranslation} from "react-i18next";
import {useThemeColors} from "~/core/theme/hooks";
import {TouchablePlatform} from "~/common/components/TouchablePlatform";

interface IProps extends TouchablePlatformProps {
  text?: string;
  labelKey?: TFuncKeyApp;
  type: ButtonType;
  rounded?: boolean;
  icon?: ImageURISource;
  iconStyle?: ImageStyle;
  labelStyle?: TextStyle;
  forceTheme?: "light" | "dark";
  isLoading?: boolean;
}

export const PrimaryButton: FC<IProps> = memo((
  {text, labelKey, icon, iconStyle, type, rounded, labelStyle, style, isLoading, children, forceTheme, ...props},
) => {
  const {t} = useTranslation();
  const forcedColors = useMemo(() => {
    if (forceTheme) {
      return forceTheme == "light" ? LightThemeColors : DarkThemeColors;
    } else {
      return null;
    }
  }, [forceTheme]);
  const colors = useThemeColors();

  const styles = useMemo(() => {
    return getStyles(forcedColors || colors, type, rounded, props.disabled);
  }, [forcedColors, colors, type, rounded, props.disabled]);

  const highlightColor = useMemo(() => {
    switch (type) {
      case ButtonType.solid:
        return Colors.solidButtonHighlight;
      case ButtonType.outline:
        return Colors.buttonHighlight;
      case ButtonType.borderless:
        return Colors.buttonHighlight;
      case ButtonType.outlineNegative:
        return Colors.red;
      default:
        return undefined;
    }
  }, [type]);

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <ActivityIndicator
          animating={true}
          color={type == ButtonType.solid ? Colors.white : Colors.primary}
          size={"small"}
        />
      );
    } else {
      return children || (
        <>
          <ButtonIcon source={icon} style={[styles.icon, iconStyle]} />
          <Brand.H3 style={StyleSheet.flatten([styles.label, labelStyle])} numberOfLines={1} maxFontSizeMultiplier={1.1}>
            {labelKey ? t(labelKey)?.toString().toUpperCase() : text?.toUpperCase()}
          </Brand.H3>
        </>
      );
    }
  }, [t, type, children, icon, iconStyle, isLoading, text, labelKey, labelStyle, styles.icon, styles.label]);

  return (
    <TouchablePlatform
      style={[styles.button, style] as any}
      highlightColor={highlightColor}
      {...props}
      disabled={isLoading || props.disabled}
    >
      {content}
    </TouchablePlatform>
  );
});

const ButtonIcon: FC<Partial<ImageProps>> = memo((props) => {
  return props.source != null ? <Image {...props} source={props.source} /> : null;
});

function getStyles(colors: ThemeColors, type: ButtonType, rounded?: boolean, disabled?: boolean | null): IStyles {
  switch (type) {
    case ButtonType.solid:
      return mergeStylesWithDisabled(rounded ? smallSolidStyles : solidStyles, disabled);
    case ButtonType.outline:
      return mergeStylesWithDisabled(rounded ? smallOutlineStylesGetter(colors) : outlineStylesGetter(colors), disabled, true);
    case ButtonType.outlineNegative:
      return mergeStylesWithDisabled(rounded ? smallOutlineStylesGetter(colors) : outlineNegativeStyles, disabled, true);
    case ButtonType.borderless:
      return mergeStylesWithDisabled(borderlessStyles, disabled, true, true);
    default:
      throw new Error("Unknown button type: " + type);
  }
}

function mergeStylesWithDisabled(styles: IStyles, disabled?: boolean | null, outline?: boolean, borderless?: boolean): IStyles {
  return disabled
    ? {
      ...styles,
      button: {
        ...styles.button,
        backgroundColor: borderless ? undefined : Colors.winline2Disabled,
        borderColor: outline ? Colors.secondary : styles.button.borderColor,
        elevation: 0,
      } as ViewStyle,
      icon: {
        ...styles.icon,
        tintColor: Colors.lightPrimary,
      } as ImageStyle,
      label: {
        ...styles.label,
        color: Colors.secondary,
      } as TextStyle,
    }
    : styles;
}

interface IStyles {
  button: ViewStyle;
  icon: ImageStyle;
  label: TextStyle;
}

const commonButtonStyle: ViewStyle = {
  paddingVertical: CommonSizes.spacing.small,
  paddingHorizontal: CommonSizes.spacing.extraSmall,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  backgroundColor: Colors.transparent,
};

const commonLabelStyle: TextStyle = {
  color: Colors.white,
  textAlign: "center",
  textAlignVertical: "center",
  padding: 0,
};

const commonIcon: ImageStyle = {
  width: 16,
  height: 16,
  marginHorizontal: CommonSizes.spacing.extraSmall / 2,
  resizeMode: "contain",
  tintColor: Colors.dark,
};

const solidStyles = StyleSheet.create({
  button: {
    ...commonButtonStyle,
    backgroundColor: Colors.primary,
  } as ViewStyle,
  label: {
    ...commonLabelStyle,
  } as TextStyle,
  icon: {
    ...commonIcon,
    tintColor: Colors.white,
  },
});

const outlineStylesGetter = (colors: ThemeColors) => StyleSheet.create({
  button: {
    ...commonButtonStyle,
    borderColor: colors.theme == "light" ? colors.main : colors.text,
    borderWidth: 1,
  } as ViewStyle,
  label: {
    ...commonLabelStyle,
    color: colors.theme == "light" ? colors.main : colors.text,
  } as TextStyle,
  icon: {
    ...commonIcon,
    tintColor: colors.theme == "light" ? colors.main : colors.text,
  } as ImageStyle,
});

const outlineNegativeStyles = StyleSheet.create({
  button: {
    ...commonButtonStyle,
    borderColor: Colors.danger,
    borderWidth: 1,
  } as ViewStyle,
  label: {
    ...commonLabelStyle,
    color: Colors.danger,
  } as TextStyle,
  icon: {
    ...commonIcon,
    tintColor: Colors.danger,
  } as ImageStyle,
});

const borderlessStyles = StyleSheet.create({
  button: {
    ...commonButtonStyle,
    borderRadius: undefined,
  } as ViewStyle,
  label: {
    ...commonLabelStyle,
    color: Colors.primary,
  } as TextStyle,
  icon: {
    ...commonIcon,
    tintColor: Colors.primary,
  } as ImageStyle,
});

const roundedButtonStyle: ViewStyle = {
  paddingHorizontal: CommonSizes.spacing.medium,
  paddingVertical: CommonSizes.spacing.extraSmall,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: CommonSizes.borderRadius.extraLarge,
  flexDirection: "row",
  backgroundColor: Colors.transparent,
};

const smallSolidStyles = StyleSheet.create({
  button: {
    ...roundedButtonStyle,
    backgroundColor: Colors.primary,
  } as ViewStyle,
  label: {
    color: Colors.white,
  } as TextStyle,
  icon: {
    ...commonIcon,
  },
});

const smallOutlineStylesGetter = (colors: ThemeColors) => StyleSheet.create({
  button: {
    ...roundedButtonStyle,
    borderColor: colors.theme == "light" ? colors.main : colors.text,
    borderWidth: 1,
  } as ViewStyle,
  label: {
    color: colors.theme == "light" ? colors.main : colors.text,
  } as TextStyle,
  icon: {
    ...commonIcon,
    tintColor: colors.theme == "light" ? colors.main : colors.text,
  } as ImageStyle,
});
