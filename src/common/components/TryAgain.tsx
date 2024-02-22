import React, {FC, memo, useCallback} from "react";
import {Image, ImageStyle, StyleSheet, TextStyle, View, ViewStyle} from "react-native";
import {useTranslation} from "react-i18next";
import {CommonSizes} from "~/core/theme/commonSizes";
import {CommonStyles} from "~/core/theme/commonStyles";
import {ImageResources} from "../ImageResources.g";
import {PrimaryButton} from "./PrimaryButton";
import {ButtonType} from "~/types";
import {LoadingComponent} from "./LoadingComponent";
import {Regular} from "~/infrastructure";
import {useThemedStyles} from "~/core/theme/hooks";
import {ThemeColors} from "~/core/theme/colors";

import {FetchBaseQueryError} from "@reduxjs/toolkit/dist/query/react";
import {SerializedError} from "@reduxjs/toolkit";
import {ErrorComponent} from "~/common/components/ErrorComponent";

type Props = {
  onPress?: () => void;
  isLoading?: boolean;
  forceTheme?: "light" | "dark";
  backgroundKey?: keyof ThemeColors;
} & ({
  errorText: string | null;
} | {
  error: FetchBaseQueryError | SerializedError;
});

export const TryAgain: FC<Props> = memo((props) => {
  const {onPress, isLoading, forceTheme, backgroundKey = "background"} = props;
  const errorText = (props as any).errorText;
  const queryError = (props as any).error as FetchBaseQueryError;
  const serializedError = (props as any).error as SerializedError;
  const {t} = useTranslation();

  const styles = useThemedStyles(stylesGetter, forceTheme);

  const renderErrorText = useCallback(() => {
    const errorString = errorText || (queryError as any).error || serializedError?.message;

    return (
      <>
        <Image style={styles.image} source={ImageResources.avatar} resizeMode={"contain"} />
        //todo replace source
        <Regular.H2 style={styles.title} text={errorString} />
        {onPress != null
          ? (
            <PrimaryButton
              isLoading={isLoading}
              text={t("errors.tryAgain")}
              onPress={onPress}
              type={ButtonType.outline}
              forceTheme={forceTheme}
            />
          )
          : isLoading && (
          <LoadingComponent containerStyle={styles.loader} />
        )}
      </>
    );
  }, [errorText, isLoading, onPress, queryError, serializedError?.message, styles.image, styles.loader, styles.title, t, forceTheme]);

  return (
    <View style={styles.container}>
      {Number(queryError?.status)
        ? <ErrorComponent
          error={queryError}
          isLoading={isLoading}
          forceTheme={forceTheme}
          onPress={onPress}
          backgroundKey={backgroundKey}
        />
        : renderErrorText()}
    </View>
  );
});

const stylesGetter = (colors: ThemeColors) => (StyleSheet.create({
  container: {
    ...CommonStyles.flex1,
    alignItems: "center",
    padding: CommonSizes.spacing.medium,
    paddingTop: CommonSizes.spacing.largePlus,
  } as ViewStyle,
  title: {
    textAlign: "center",
    marginBottom: CommonSizes.spacing.mediumPlus,
    color: colors.text,
  } as TextStyle,
  description: {
    textAlign: "center",
    color: colors.secondaryText,
  },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    alignSelf: "center",
  } as ImageStyle,
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
}));
