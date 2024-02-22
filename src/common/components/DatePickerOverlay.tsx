import React, {useCallback, useState} from "react";
import DateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {Platform, SafeAreaView, StyleSheet, View, ViewStyle} from "react-native";
import {Navigation, NavigationFunctionComponent, Options} from "react-native-navigation";
import {useNavigationButtonPress} from "react-native-navigation-hooks";
import {PrimaryButton} from "./PrimaryButton";
import {isAndroid, isIos} from "~/core/theme/commonConsts";
import {Fonts} from "~/core/theme/fonts";
import {CommonStyles} from "~/core/theme/commonStyles";
import {Colors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {ButtonType} from "~/types";
import {useTranslation} from "react-i18next";
import {i18next} from "../localization/localization";
import {useThemeColors} from "~/core/theme/hooks";

export interface IDatePickerProps {
  value: Date;
  minDate?: Date;
  maxDate?: Date;
  onDateChange?: (date: Date) => void;
}

const displayMode = isIos ? "inline" : "default";

const doneButtonId = "doneButton";

export const DatePickerOverlay: NavigationFunctionComponent<IDatePickerProps> = ({componentId, maxDate, minDate, onDateChange, value}) => {
  const [date, setDate] = useState<Date>(value);
  const {t, i18n} = useTranslation();
  const colors = useThemeColors();

  const onSetDate = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (isAndroid) {
        if (event.type == "dismissed") {
          Navigation.dismissOverlay(componentId);
        } else {
          onDateChange && selectedDate && onDateChange(selectedDate);
          Navigation.dismissOverlay(componentId);
        }
      } else {
        setDate(selectedDate!);
      }
    },
    [componentId, onDateChange],
  );

  const changeDate = useCallback(() => {
    onDateChange && onDateChange(date);
    Navigation.dismissModal(componentId);
  }, [onDateChange, componentId, date]);

  useNavigationButtonPress(changeDate, {componentId, buttonId: doneButtonId});

  return (
    <SafeAreaView style={CommonStyles.flex1}>
      <View style={styles.container}>
        <DateTimePicker
          value={date}
          mode={"date"}
          display={displayMode}
          onChange={onSetDate}
          minimumDate={minDate}
          maximumDate={maxDate}
          locale={i18n.language}
          themeVariant={colors.theme}
          textColor={colors.text}
        />
        {isIos && <PrimaryButton text={t("common.select")} type={ButtonType.solid} onPress={changeDate} />}
      </View>
    </SafeAreaView>
  );
};

DatePickerOverlay.options = () => Platform.select<Options>({
  android: {
    layout: {
      componentBackgroundColor: Colors.transparent,
    },
    overlay: {
      interceptTouchOutside: true,
    },
  },
  default: {
    topBar: {
      rightButtons: [{
        id: doneButtonId,
        text: i18next.t("common.done"),
        fontFamily: Fonts.system,
        enabled: true,
      }],
    },
  },
});

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: CommonSizes.spacing.medium,
        paddingVertical: CommonSizes.spacing.large,
      } as ViewStyle,
      android: {
        ...CommonStyles.flexCenter,
        backgroundColor: Colors.transparent,
      } as ViewStyle,
    }),
  } as ViewStyle,
});
