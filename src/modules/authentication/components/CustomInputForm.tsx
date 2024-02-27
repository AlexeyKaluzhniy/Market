import {View, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {CommonStyles} from "~/core/theme/commonStyles";
import {CustomInput} from "~/components/CustomInput";
import {LightThemeColors} from "~/core/theme/colors";
import CheckBox from "@react-native-community/checkbox";
import {IAuthComponentProps} from "~/infrastructure/dto/common/IAuthComponentProps";
import {useTranslation} from "react-i18next";
import PhoneIcon from "../../../../resources/icons/phone.svg";
import LockIcon from "../../../../resources/icons/lock.svg";
import {Navigation} from "react-native-navigation";
import {Pages} from "~/navigation/pages";
import {SubmitButton} from "~/components/SubmitButton";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Body, LabelFont} from "~/infrastructure";

export function CustomInputForm(
    {
        submitButtonTitle,
        isLogin = false,
        phoneField = false,
        passwordField = false,
        repeatPasswordField = false,
        isRegister = false,
        schema,
        onSubmit,
    }: IAuthComponentProps) {
    const {t} = useTranslation();

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const {
        setValue,
        getValues,
        handleSubmit
    } = useForm({resolver: yupResolver(schema)});

    const onButtonPress = handleSubmit(() => {
        const data = getValues();
        if (isRegister) {
            if (data.hasOwnProperty('repeatPassword')) {
                onSubmit({email: getValues('email'), password: getValues('password')});

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

    return (
        <View style={[CommonStyles.flex1, styles.inputContainer]}>
            {phoneField &&
                <CustomInput
                    placeholder={t("authentication.phoneNumber")}
                    name="email"
                    passwordInput={false}
                    Icon={PhoneIcon}
                    setValue={setValue}
                />
            }
            {passwordField &&
                <CustomInput
                    placeholder={t("authentication.password")}
                    name="password"
                    passwordInput={true}
                    Icon={LockIcon}
                    setValue={setValue}
                />
            }
            {repeatPasswordField &&
                <CustomInput
                    placeholder={t("authentication.repeatPassword")}
                    name="repeatPassword"
                    passwordInput={true}
                    Icon={LockIcon}
                    setValue={setValue}
                />
            }
            {isRegister &&
                <View style={[CommonStyles.row, styles.agreePrivacy]}>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(value) => setToggleCheckBox(value)}
                        tintColors={{true: LightThemeColors.main}}
                        style={styles.checkBox}
                    />
                    <Body.Large>{t("authentication.registrationUserData.toAcceptWith")}
                        <Body.Large
                            labelKey="authentication.registrationUserData.rulesAndConditions"
                            onPress={() => console.log('++++')}
                            style={styles.agreePrivacyTextColor}
                        />
                    </Body.Large>
                </View>
            }
            <SubmitButton onSubmit={onButtonPress} submitButtonTitle={submitButtonTitle}/>
            {
                isLogin &&
                <TouchableOpacity
                    style={styles.forgotPasswordContainer}
                    onPress={() => handleForgotPassword(Pages.forgotPassword.name)}
                >
                    <LabelFont.Large labelKey="authentication.forgotPassword" style={styles.forgotPassword}/>
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 16,
    },
    agreePrivacy: {
        marginTop: 20,
    },
    agreePrivacyTextColor: {
        color: LightThemeColors.main,
    },
    forgotPasswordContainer: {
        marginTop: 33,
        alignItems: 'center',
        paddingVertical: 10
    },
    forgotPassword: {
        color: LightThemeColors.main
    },
    checkBox: {
        marginRight: 10
    }
});
