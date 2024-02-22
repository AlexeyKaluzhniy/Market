import React from "react";
import {useTranslation} from "react-i18next";
import {Image, ImageStyle, Pressable, StyleSheet, ViewStyle} from "react-native";
import {ThemeColors} from "~/core/theme/colors";
import {showActionSheet} from "~/common/helpers/dialogsHelpers";
import {ImageResources} from "~/common/ImageResources.g";
import {Regular} from "~/infrastructure";
import {getLocalizedValue} from "~/common/localization/localizedTextHelper";
import {useThemedStyles} from "~/core/theme/hooks";
import {windowWidth} from "~/core/theme/commonConsts";
import {CommonStyles} from "~/core/theme/commonStyles";
import _ from "lodash";
import {LocalizedTextDto} from "~/infrastructure/dto/common/LocalizedTextDto";

export type IFilterEntry<T> = T & ({ShortName?: LocalizedTextDto; FullName?: LocalizedTextDto; Name?: string});

interface IFilterItemProps<TVal> {
  currentValue?: string;
  values: IFilterEntry<TVal>[];
  isLoading: boolean;
  onPress: (selectedId: string) => void;
}

function getValuerFromFilterEntry<T extends {Id: string}>(
  entryId: string | undefined,
  values: IFilterEntry<T>[],
  fallback?: string,
): string {
  const entry = values.find(e => e.Id == entryId);

  if (fallback) {
    return entry
      ? (getLocalizedValue(entry?.Name) || getLocalizedValue(entry?.ShortName) || getLocalizedValue(entry?.FullName) || fallback || "")
      : fallback || "";
  } else {
    return entry
      ? (getLocalizedValue(entry?.Name) || getLocalizedValue(entry?.FullName) || getLocalizedValue(entry?.ShortName) || "")
      : "";
  }
}

export function FilterItem<TVal extends {Id: string}>(props: IFilterItemProps<TVal>) {
  const styles = useThemedStyles(stylesGetter);
  const {values, currentValue, onPress, isLoading} = props;
  const {t} = useTranslation();

  const onSortItemPress = _.throttle(() => showActionSheet(
    {
      options: [
        ...values
          .map((el) => getValuerFromFilterEntry(el.Id, values)),
        t("common.cancel"),
      ],
      cancelButtonIndex: values.length,
    },
    (optionIndex) => values[optionIndex] && onPress(values[optionIndex].Id)),
    500,
    {leading: true, trailing: false},
  );

  const isEnabled = values.length > 1 && !isLoading;

  return (
    <Pressable style={styles.container} onPress={onSortItemPress} disabled={!isEnabled}>
      <Regular.H3
        style={CommonStyles.flexGrow}
        color={isEnabled ? styles.colors.text : styles.colors.secondaryText}
        numberOfLines={1}
        text={getValuerFromFilterEntry(currentValue, values, t("empty.noData"))}
        maxFontSizeMultiplier={1.1}
      />
      <Image source={ImageResources.arrow_down} style={isEnabled ? styles.icon : styles.iconDisabled} />
    </Pressable>
  );
}

const commonIconStyle = {
  width: 12,
  height: 12,
  resizeMode: "contain",
  marginLeft: 4,
};

const stylesGetter = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: windowWidth / 3.1,
  } as ViewStyle,
  icon: {
    ...commonIconStyle,
    tintColor: colors.text,
  } as ImageStyle,
  iconDisabled: {
    ...commonIconStyle,
    tintColor: colors.secondaryText,
  } as ImageStyle,
});
