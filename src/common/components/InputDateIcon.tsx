import React, {FC, memo, MutableRefObject, useCallback, useEffect, useMemo, useState} from "react";
import {ImageResources} from "~/common/ImageResources.g";
import {Image, ImageStyle, Platform, Pressable, StyleSheet, TextStyle, ViewStyle} from "react-native";
import {ThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useThemedStyles} from "~/core/theme/hooks";
import dayjs from "dayjs";
import {isIos} from "~/core/theme/commonConsts";
import {useTranslation} from "react-i18next";
import {showDatePicker} from "~/services/navigationService/showDatePicker";

interface IProps {
  nextInputFocusRefGetter?: () => MutableRefObject<any>;
  editable?: boolean;
  error: string | null;
  value?: string | Date;
  onDateChange?: (date: string) => void;
}

export const InputDateIcon: FC<IProps> = memo(({value, onDateChange, nextInputFocusRefGetter, error, ...props}) => {
  const styles = useThemedStyles(stylesGetter);
  const {t} = useTranslation();
  const defaultDate = t("date.defaultDate");
  const [date, setDate] = useState<Date | null>(value ? dayjs(value, defaultDate).utc(true).toDate() : null);

  useEffect(() => {
    const newValue = dayjs(value, defaultDate);
    if (newValue.isValid()) {
      setDate(newValue.utc(true).toDate());
    } else {
      setDate(null);
    }
  }, [defaultDate, value]);

  const getInputContainerStyle = useCallback((_error?: string | null, editable?: boolean): ViewStyle => {
    if (isIos) {
      return !editable ? styles.disabledInputContainer : styles.inputContainer;
    } else {
      if (!editable) {
        return styles.disabledInputContainer;
      } else if (_error) {
        return styles.errorInputContainer;
      } else {
        return styles.inputContainer;
      }
    }
  }, [styles.disabledInputContainer, styles.errorInputContainer, styles.inputContainer]);

  const onDateChangeLocal = useCallback((valueSelected?: Date) => {
    if (valueSelected) {
      setDate(valueSelected);
      onDateChange && onDateChange(dayjs(valueSelected).format(defaultDate));
    }
    if (nextInputFocusRefGetter) {
      const currentRef = nextInputFocusRefGetter().current;
      currentRef && currentRef.focus();
    }
  }, [defaultDate, nextInputFocusRefGetter, onDateChange]);

  const showDateSelector = useCallback(() => {
    const pickerValue = date || dayjs().utc(true).toDate();
    showDatePicker({
      onDateChange: onDateChangeLocal,
      minDate: dayjs().year(1900).month(0).date(1).toDate(),
      maxDate: dayjs().toDate(),
      value: pickerValue,
    });
  }, [date, onDateChangeLocal]);

  const inputContainerStyle = useMemo(() => {
    return getInputContainerStyle(error, props.editable);
  }, [error, props.editable, getInputContainerStyle]);

  return (
    <Pressable style={inputContainerStyle} onPress={showDateSelector}>
      <Image source={ImageResources.calendarblank} style={styles.calendarIcon}/>
    </Pressable>
  );
});

const commonInputContainer: TextStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  textAlignVertical: "center",
  textAlign: "center",
};

const stylesGetter = (colors: ThemeColors) => StyleSheet.create({
  calendarIcon: {
    width: 24,
    height: 24,
    tintColor: colors.winline2,
    ...Platform.select({
      android: {
        marginRight: CommonSizes.spacing.medium,
      },
    }),
  } as ImageStyle,
  disabledInputContainer: {
    ...commonInputContainer,
    borderColor: colors.winline2,
  } as TextStyle,
  errorInputContainer: {
    ...commonInputContainer,
  } as TextStyle,
  inputContainer: {
    ...commonInputContainer,
    ...Platform.select({
      ios: {
        paddingRight: CommonSizes.spacing.medium,
      },
    }),
  } as TextStyle,
});

InputDateIcon.defaultProps = {
  editable: true,
};
