import {View, StyleSheet, TouchableOpacity, Linking} from "react-native";
import React, {useState} from "react";
import {CommonStyles} from "~/core/theme/commonStyles";
import {DefaultInput} from "~/components/DefaultInput";
import {Dto} from "~/infrastructure";
import {useTranslation} from "react-i18next";
import PhoneIcon from "../../../../resources/icons/phone.svg";
import LockIcon from "../../../../resources/icons/lock.svg";
import {Navigation} from "react-native-navigation";
import {Pages} from "~/navigation/pages";
import {SubmitButton} from "~/components/SubmitButton";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useThemeColors} from "~/core/theme/hooks";
import {CustomCheckBox} from "~/common/components/CustomCheckBox";
import {CheckMarkValidation} from "~/modules/authentication/components/CheckMarkValidation";

export function CustomInputForm(
    {
        submitButtonTitle,
        isLogin,
        phoneField,
        passwordField,
        repeatPasswordField,
        isRegister,
        schema,
        onSubmit,
    }: Dto.Common.AuthComponentProps) {
    const {t} = useTranslation();
    const colors = useThemeColors();
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const {
        setValue,
        getValues,
        handleSubmit,
        formState: {isValid, errors}
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onButtonPress = handleSubmit(() => {
        const data = getValues();
        if (isRegister) {
            if (data.hasOwnProperty('repeatPassword')) {
                onSubmit({
                    phoneNumber: getValues('phoneNumber'),
                    password: getValues('password'),
                    isConditionUsageAndConfidentialPoliticsAgree: toggleCheckBox
                });

                return;
            }
        }
        onSubmit(data);
    });

    const handleForgotPassword = (componentName: string) => {
        Navigation.push(Pages.auth.id, {
            component: {
                name: componentName,
                options: {
                    topBar: {
                        visible: false
                    },
                }
            }
        });
    };

    const openTermsAndConditions = async () => {
        await Linking.openURL('https://reactnative.dev/docs/linking');
    };

    const setFormValue = (name: string, text: string) => {
        setValue(name, text as never, {shouldValidate: true});
    };

    const password: string = getValues("password");
    const hasMinimumLength = password ? password.length >= 8 : false;
    const containsDigit = /\d/.test(password);
    const containsLowercaseLetter = /[a-z]/.test(password);
    const containsUppercaseLetter = /[A-Z]/.test(password);
    const containsSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    return (
        <View style={[CommonStyles.flex1, styles.inputContainer]}>
            {phoneField &&
                <>
                    <DefaultInput
                        placeholder={t("authentication.phoneNumber")}
                        name="phoneNumber"
                        passwordInput={false}
                        Icon={PhoneIcon}
                        setValue={setFormValue}
                        numberInput
                    />
                </>
            }
            {passwordField &&
                <>
                    <DefaultInput
                        placeholder={t("authentication.password")}
                        name="password"
                        passwordInput={true}
                        Icon={LockIcon}
                        setValue={setFormValue}
                    />
                </>
            }
            {repeatPasswordField &&
                <>
                    <DefaultInput
                        placeholder={t("authentication.repeatPassword")}
                        name="repeatPassword"
                        passwordInput={true}
                        Icon={LockIcon}
                        setValue={setFormValue}
                    />
                </>
            }
            {isRegister &&
                <View style={[CommonStyles.row, styles.agreePrivacy]}>
                    <CustomCheckBox
                        isChecked={toggleCheckBox}
                        setChecked={(isChecked) => setToggleCheckBox(isChecked as boolean)}/>
                    <Roboto.Body.Large color={colors.onSurface} style={styles.accept}>
                        {t("authentication.registrationUserData.toAcceptWith")}
                        <Roboto.Body.Large
                            labelKey="authentication.registrationUserData.rulesAndConditions"
                            onPress={openTermsAndConditions}
                            color={colors.main}
                        />
                    </Roboto.Body.Large>
                </View>
            }
            <View style={styles.validationContainer}>
                {phoneField && <CheckMarkValidation
                    text={"validation.phoneFormat"}
                    isValid={!errors.hasOwnProperty('phoneNumber') && getValues("phoneNumber") != undefined}/>}
                {passwordField && !isLogin && <>
                    <Roboto.Label.Large
                        labelKey={"validation.passwordFormat.passwordMustContain"}
                        color={colors.onSurface}
                        style={{marginBottom: CommonSizes.margin.extraSmallPlus}}
                    />
                    <CheckMarkValidation
                        text={"validation.passwordFormat.minimumCharacters"}
                        isValid={hasMinimumLength}
                    />
                    <CheckMarkValidation
                        text={"validation.passwordFormat.containsDigit"}
                        isValid={containsDigit}/>
                    <CheckMarkValidation
                        text={"validation.passwordFormat.containsLetters"}
                        isValid={containsLowercaseLetter && containsUppercaseLetter}/>
                    <CheckMarkValidation
                        text={"validation.passwordFormat.containsSymbol"}
                        isValid={containsSpecialCharacter}/>
                </>}
                {repeatPasswordField &&
                    <CheckMarkValidation
                        text={"validation.passwordMatch"}
                        isValid={!errors.hasOwnProperty('repeatPassword') && getValues("repeatPassword") != undefined}/>
                }
            </View>
            <SubmitButton onSubmit={onButtonPress} submitButtonTitle={submitButtonTitle}
                          disabled={!isValid || (!!isRegister && !toggleCheckBox)}/>
            {isLogin &&
                <TouchableOpacity
                    style={styles.forgotPasswordContainer}
                    onPress={() => handleForgotPassword(Pages.forgotPassword.name)}
                >
                    <Roboto.Label.Large labelKey="authentication.forgotPassword" color={colors.main}/>
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: CommonSizes.margin.largePlus,
    },
    agreePrivacy: {
        marginTop: CommonSizes.margin.largePlus
    },
    forgotPasswordContainer: {
        marginTop: CommonSizes.margin.extraLargePlus,
        alignItems: 'center',
        paddingVertical: CommonSizes.margin.smallPlus
    },
    accept: {
        paddingRight: CommonSizes.padding.large * 2
    },
    validationContainer: {
        marginTop: CommonSizes.margin.largePlus
    }
});
