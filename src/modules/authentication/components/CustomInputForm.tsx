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
import {ValidationBlock} from "~/modules/authentication/components/ValidationBlock";

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
            <ValidationBlock
                password={getValues("password")}
                repeatPassword={getValues("repeatPassword")}
                phoneNumber={getValues("phoneNumber")}
                isLogin={isLogin}
                repeatPasswordField={repeatPasswordField}
                passwordField={passwordField}
                phoneField={phoneField}
                hasErrorPhone={errors.hasOwnProperty("phoneNumber")}
                hasErrorRepeatPassword={errors.hasOwnProperty("repeatPassword")}
            />
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
    }
});
