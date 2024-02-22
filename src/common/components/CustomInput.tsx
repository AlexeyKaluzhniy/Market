import React, {MutableRefObject, useCallback, useMemo, useRef, useState} from "react";
import {Regular} from "~/infrastructure";
import {
  Image,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import CountryPicker, {Country, DARK_THEME, DEFAULT_THEME, Flag, FlagType, getAllCountries} from "react-native-country-picker-modal";
import {ThemeColors} from "~/core/theme/colors";
import {useThemedStyles} from "~/core/theme/hooks";
import {CommonSizes} from "~/core/theme/commonSizes";
import {TFuncKeyApp} from "~/common/localization/localization";
import {CommonStyles} from "~/core/theme/commonStyles";
import {PasswordIcon} from "./PasswordIcon";
import {FieldError} from "react-hook-form/dist/types";
import {InputDateIcon} from "./InputDateIcon";
import {TextInputMask} from "react-native-masked-text";
import {useTranslation} from "react-i18next";
import {FlagButtonProps} from "react-native-country-picker-modal/lib/FlagButton";
import {ImageResources} from "~/common/ImageResources.g";
import {useMount} from "~/common/hooks/useMount";
import {DropDownIcon} from "~/common/components/DropDownIcon";
import {ValidationError} from "~/infrastructure/dto/common";
import {ErrorType} from "~/infrastructure/dto/common/ErrorType";
import {ErrorSignType} from "~/infrastructure/dto/common/ErrorSignType";

interface IProps extends TextInputProps {
  nextInputFocusRefGetter?: () => (MutableRefObject<any> | undefined);
  error?: FieldError | ValidationError;
  serverError?: ErrorType & {errorSign: ErrorSignType};
  labelKey?: TFuncKeyApp;
  isPassword?: boolean;
  onSubmitEditing?: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void) | undefined;
  optional?: boolean;
  inputRef?: (ref: TextInput | null) => void;
  isDate?: boolean;
  isPhone?: boolean;
  isDropDown?: boolean;
  onDateChange?: (date: string) => void;
  onCountryChange?: (country: Country) => void;
  country?: Country;
  mask?: string;
  hintKey?: TFuncKeyApp;
  hintStyle?: StyleProp<TextStyle>;
}

export type CustomInputProps = IProps;

export const CustomInput = (
  {
    error,
    serverError,
    labelKey,
    isPassword,
    onSubmitEditing,
    nextInputFocusRefGetter,
    inputRef,
    optional,
    isDate,
    isPhone,
    isDropDown,
    onDateChange,
    onCountryChange,
    country,
    hintKey,
    ...props
  }: IProps) => {
  const styles = useThemedStyles(stylesGetter);
  const {i18n, t} = useTranslation();
  const [isPasswordShown, setPasswordShown] = useState<boolean>(false);
  const ref = useRef<TextInput | null>();

  const toggleEye = useCallback(() => {
    setPasswordShown(!isPasswordShown);
  }, [setPasswordShown, isPasswordShown]);

  const inputStyle = useMemo(() => {
    const baseInputStyle = (error || serverError) ? styles.warningInput : styles.inputContainer;
    if (isPassword || isDate) {
      return [CommonStyles.row, baseInputStyle];
    } else {
      return baseInputStyle;
    }
  }, [serverError, isDate, isPassword, error, styles.warningInput, styles.inputContainer]);

  const onLocalSubmitEditing = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      onSubmitEditing && onSubmitEditing(e);
      if (nextInputFocusRefGetter) {
        const currentRef = nextInputFocusRefGetter()?.current;
        currentRef && currentRef.focus();
      }
    },
    [nextInputFocusRefGetter, onSubmitEditing],
  );

  const inputMask = useMemo(() => isDate ? "99.99.9999" : props.mask, [isDate, props.mask]);

  const errorMessage: string = useMemo(
    () => {
      if (error?.type == "required") {
        return t("validation.required");
      } else if (error?.type == "minLength") {
        return t("validation.loginFormat");
      } else {
        return (error?.message as TFuncKeyApp || ""/*|| serverErrorMessageProvider(serverError, isPassword)*/);
      }
    },
    [error, t, serverError, isPassword],
  );
  //todo add errorMessageProvider

  const onLocalCountryChange = useCallback((selectedCountry: Country) => {
    onCountryChange?.(selectedCountry);
    if (country?.callingCode?.[0] && selectedCountry.callingCode?.[0] && props.value) {
      props.onChangeText?.(props.value.replace(country.callingCode[0], selectedCountry.callingCode[0]));
    }
  }, [country, onCountryChange, props]);

  const onLocalChangeText = useCallback((text: string) => {
    if (onCountryChange && text.length > 1) {
      props.onChangeText?.(text);
      const modifiedText = text.replace("+", "");
      if (country && modifiedText.indexOf(country.callingCode?.[0]) != 0) {
        getAllCountries(FlagType.EMOJI, "common").then(countryList => {
          const selectedCountry = countryList.filter(c => c.callingCode?.[0] && modifiedText.indexOf(c.callingCode?.[0]) == 0).reverse();
          selectedCountry.length && onCountryChange?.(selectedCountry[0]);
        });
      }
    } else if (onCountryChange && !props.value && text == "+") {
      props.onChangeText?.("+7");
      getAllCountries(FlagType.EMOJI, "common").then(countryList => {
        const selectedCountry = countryList.find(c => c.cca2 == "RU");
        selectedCountry && onCountryChange?.(selectedCountry);
      });
    } else {
      props.onChangeText?.(text);
    }
  }, [country, onCountryChange, props]);

  useMount(() => {
    if (props.value && country) {
      onLocalChangeText(props.value);
    }
  });

  const renderFlagButton = useCallback((flagProps: FlagButtonProps) => (
    <TouchableOpacity
      style={[CommonStyles.rowCenter, styles.input]}
      onPress={flagProps.onOpen}
      onLongPress={flagProps.onOpen}
      activeOpacity={0.7}
    >
      {flagProps.countryCode && <Flag countryCode={flagProps.countryCode} flagSize={22} />}
      <Image style={styles.countryPicker} source={ImageResources.drop_down} />
    </TouchableOpacity>
  ), [styles.countryPicker, styles.input]);

  return (
    <View style={styles.inputItemContainer}>
      {labelKey && <View style={styles.headerContainer}>
        <Regular.H2
          labelKey={labelKey}
          style={styles.inputSign}
        />
        {optional ? <Regular.H3 labelKey={"validation.optional"} style={styles.optional} /> : null}
      </View>}
      <View style={[inputStyle, CommonStyles.row]}>
        {isPhone && <CountryPicker
          countryCode={country?.cca2 || "RU"}
          withFlag={true}
          withAlphaFilter={true}
          containerButtonStyle={[styles.input, styles.countryPicker]}
          onSelect={onLocalCountryChange}
          translation={i18n.language == "ru" ? "rus" : "common"}
          theme={styles.colors.theme == "light" ? DEFAULT_THEME : DARK_THEME}
          renderFlagButton={renderFlagButton}
        />}
        {!!inputMask
          ? <TextInputMask
            type={isDate ? "datetime" : "custom"}
            options={isDate ? {format: inputMask} : {mask: inputMask}}
            style={[styles.input, CommonStyles.flex1]}
            {...props}
            secureTextEntry={isPassword && !isPasswordShown}
            onSubmitEditing={onLocalSubmitEditing}
            refInput={(input) => {
              ref.current = input;
              inputRef?.(input);
            }}
          />
          :
          <TextInput
            style={[styles.input, CommonStyles.flex1]}
            {...props}
            secureTextEntry={isPassword && !isPasswordShown}
            onSubmitEditing={onLocalSubmitEditing}
            ref={(input) => {
              ref.current = input;
              inputRef?.(input);
            }}
            onChangeText={onLocalChangeText}
          />}
        {isPassword
          ? <PasswordIcon isPasswordShown={isPasswordShown} toggleEye={toggleEye} />
          : null}
        {isDate
          ? <InputDateIcon value={props.value} error={error?.message || null} onDateChange={onDateChange} />
          : null}
        {isDropDown
          ? <DropDownIcon editable={props.editable} onPress={() => ref.current?.isFocused() ? ref.current?.blur() : ref.current?.focus()} />
          : null}
      </View>
      {(error || serverError) &&
        <Regular.H3 text={errorMessage} color={styles.colors.danger} style={props.hintStyle} allowFontScaling={false} />}
      {(hintKey && !(error || serverError)) &&
        <Regular.H3
          labelKey={hintKey}
          color={styles.colors.secondaryText}
          style={props.hintStyle}
          allowFontScaling={false}
        />}
    </View>
  );
};

const stylesGetter = (colors: ThemeColors) => StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.winline2,
    backgroundColor: colors.element,
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    color: colors.text,
    height: 42,
    paddingLeft: CommonSizes.borderRadius.largePlus,
  },
  inputSign: {
    paddingBottom: CommonSizes.borderRadius.extraSmall,
    color: colors.secondaryText,
  },
  countryPicker: {
    marginRight: -CommonSizes.spacing.extraSmall,
    marginLeft: -CommonSizes.spacing.extraSmall,
    width: 20,
    height: 20,
  },
  warningInput: {
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: colors.element,
    justifyContent: "space-between",
  },
  inputItemContainer: {
    paddingBottom: CommonSizes.borderRadius.largePlus,
  },
  optional: {
    textTransform: "lowercase",
    color: colors.winline2,
    paddingTop: CommonSizes.borderRadius.extraSmall,
  },
});

export const CustomInputStyleGetter = stylesGetter;
