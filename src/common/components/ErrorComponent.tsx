import React, {FC, memo, useMemo} from "react";
import {Image, ImageStyle, ImageURISource, StyleSheet, TextStyle, View, ViewStyle} from "react-native";
import {useTranslation} from "react-i18next";
import {CommonSizes} from "~/core/theme/commonSizes";
import {CommonStyles} from "~/core/theme/commonStyles";
import {ImageResources} from "../ImageResources.g";
import {PrimaryButton} from "./PrimaryButton";
import {ButtonType} from "~/types";
import {Brand, Regular} from "~/infrastructure";
import {useThemedStyles} from "~/core/theme/hooks";
import {ThemeColors} from "~/core/theme/colors";
import {FetchBaseQueryError} from "@reduxjs/toolkit/dist/query/react";
import {AppGradient} from "~/components/AppGradient";
import {windowWidth} from "~/core/theme/commonConsts";

interface IProps {
  onPress?: () => void;
  forceTheme?: "light" | "dark";
  error: FetchBaseQueryError;
  isLoading?: boolean;
  backgroundKey?: keyof ThemeColors;
}

export const ErrorComponent: FC<IProps> = memo((props) => {
  const {onPress, error, isLoading, forceTheme, backgroundKey = "background"} = props;
  const {t} = useTranslation();

  const styles = useThemedStyles(stylesGetter, forceTheme);
  const gradient = useMemo(() => ([
    {color: styles.colors[backgroundKey] as string, position: 0, opacity: 0.88},
    {color: styles.colors[backgroundKey] as string, position: 0.6, opacity: 1},
    {color: styles.colors[backgroundKey] as string, position: 1, opacity: 1},
  ]), [backgroundKey, styles.colors]);

  const renderStatus = useMemo(() => {
    let zeroReplacement: ImageURISource | null = error.status > 499 ? ImageResources.avatar : ImageResources.camera;
//todo replace error images

    return (
      <View style={CommonStyles.rowCenter}>
        {Array.from(error.status.toString()).map((char, index) => {
          if (char == "0" && zeroReplacement) {
            const src = zeroReplacement;
            zeroReplacement = null;

            return <Image key={`${char}-${index}`} source={src} style={styles.zero} />;
          } else {
            return <Brand.H1 key={`${char}-${index}`} style={styles.status} text={char} allowFontScaling={false}/>;
          }
        })}
      </View>
    );
  }, [error.status, styles.status, styles.zero]);

  return (
    <>
      {renderStatus}
      <View style={styles.reflection}>
        {renderStatus}
      </View>
      <AppGradient
        width={windowWidth}
        height={80}
        style={styles.reflectionGradient}
        stopsOverride={gradient}
      />
      <Brand.H3 labelKey={`errors.status.${error.status}` as any} style={styles.title}/>
      <Regular.H2 labelKey={`errors.statusDescription.${error.status}` as any} style={styles.description}/>
      {onPress != null && (
        <PrimaryButton
          isLoading={isLoading}
          text={t("errors.tryAgain")}
          onPress={onPress}
          type={ButtonType.outline}
        />
      )}
    </>
  );
});

const stylesGetter = (colors: ThemeColors) => (StyleSheet.create({
  title: {
    textAlign: "center",
    marginBottom: CommonSizes.spacing.extraSmall,
    color: colors.text,
  } as TextStyle,
  description: {
    textAlign: "center",
    color: colors.secondaryText,
    marginBottom: CommonSizes.spacing.medium,
  },
  status: {
    fontSize: 80,
    lineHeight: undefined,
    transform: [{
      scaleX: 1.5,
    }],
    color: colors.text,
  } as TextStyle,
  zero: {
    width: 64,
    height: 64,
    marginHorizontal: CommonSizes.spacing.smallPlus,
  } as ImageStyle,
  reflection: {
    marginTop: 2,
    top: -60,
    transform: [{scaleY: -1}],
    marginBottom: -60,
  } as ViewStyle,
  reflectionGradient: {
    ...StyleSheet.absoluteFillObject,
    top: 130,
  } as ViewStyle,
}));
