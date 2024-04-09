import {CheckMarkValidation} from "~/modules/authentication/components/CheckMarkValidation";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";
import {StyleSheet, View} from "react-native";
import React from "react";
import {useThemeColors} from "~/core/theme/hooks";

interface IPropsValidationBlock {
    phoneField?: boolean;
    passwordField?: boolean;
    repeatPasswordField?: boolean;
    isLogin?: boolean;
    phoneNumber: string;
    password: string;
    repeatPassword: string;
    hasErrorPhone: boolean;
    hasErrorRepeatPassword: boolean;
}

export function ValidationBlock(
    {
        phoneField,
        passwordField,
        repeatPasswordField,
        isLogin,
        phoneNumber,
        password,
        repeatPassword,
        hasErrorPhone,
        hasErrorRepeatPassword
    }: IPropsValidationBlock) {
    const colors = useThemeColors();

    const hasMinimumLength = password?.length >= 8;
    const containsDigit = /\d/.test(password);
    const containsLowercaseLetter = /[a-z]/.test(password);
    const containsUppercaseLetter = /[A-Z]/.test(password);
    const containsSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    return (
        <View style={styles.validationContainer}>
            {phoneField && <CheckMarkValidation
                labelKeyTitle={"validation.phoneFormat"}
                isValid={!hasErrorPhone && phoneNumber !== undefined}/>}
            {passwordField && !isLogin &&
                <>
                    <Roboto.Label.Large
                        labelKey={"validation.passwordFormat.passwordMustContain"}
                        color={colors.onSurface}
                        style={styles.text}
                    />
                    <CheckMarkValidation
                        labelKeyTitle={"validation.passwordFormat.minimumCharacters"}
                        isValid={hasMinimumLength}
                    />
                    <CheckMarkValidation
                        labelKeyTitle={"validation.passwordFormat.containsDigit"}
                        isValid={containsDigit}/>
                    <CheckMarkValidation
                        labelKeyTitle={"validation.passwordFormat.containsLetters"}
                        isValid={containsLowercaseLetter && containsUppercaseLetter}/>
                    <CheckMarkValidation
                        labelKeyTitle={"validation.passwordFormat.containsSymbol"}
                        isValid={containsSpecialCharacter}/>
                </>
            }
            {repeatPasswordField &&
                <CheckMarkValidation
                    labelKeyTitle={"validation.passwordMatch"}
                    isValid={!hasErrorRepeatPassword && repeatPassword !== undefined}/>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    validationContainer: {
        marginTop: CommonSizes.margin.largePlus
    },
    text: {
        marginBottom: CommonSizes.margin.extraSmallPlus
    }
});
