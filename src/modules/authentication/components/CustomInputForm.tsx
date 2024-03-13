import {View, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {CommonStyles} from "~/core/theme/commonStyles";
import {DefaultInput} from "~/components/DefaultInput";
import {ThemeColors} from "~/core/theme/colors";
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
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";
import {useThemeColors, useThemedStyles} from "~/core/theme/hooks";

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
    }: IAuthComponentProps) {
    const {t} = useTranslation();
    const styles = useThemedStyles(stylesG);
    const colors = useThemeColors();
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
                <DefaultInput
                    placeholder={t("authentication.phoneNumber")}
                    name="email"
                    passwordInput={false}
                    Icon={PhoneIcon}
                    setValue={setValue}
                    numberInput
                />
            }
            {passwordField &&
                <DefaultInput
                    placeholder={t("authentication.password")}
                    name="password"
                    passwordInput={true}
                    Icon={LockIcon}
                    setValue={setValue}
                />
            }
            {repeatPasswordField &&
                <DefaultInput
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
                        tintColors={{true: colors.main}}
                        style={styles.checkBox}
                    />
                    <Roboto.Body.Large color={colors.onSurface}>
                        {t("authentication.registrationUserData.toAcceptWith")}
                        <Roboto.Body.Large
                            labelKey="authentication.registrationUserData.rulesAndConditions"
                            onPress={() => console.log('++++')}
                            style={styles.agreePrivacyTextColor}
                        />
                    </Roboto.Body.Large>
                </View>
            }
            <SubmitButton onSubmit={onButtonPress} submitButtonTitle={submitButtonTitle}/>
            {
                isLogin &&
                <TouchableOpacity
                    style={styles.forgotPasswordContainer}
                    onPress={() => handleForgotPassword(Pages.forgotPassword.name)}
                >
                    <Roboto.Label.Large labelKey="authentication.forgotPassword" style={styles.forgotPassword}/>
                </TouchableOpacity>
            }
        </View>
    );
}

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    inputContainer: {
        marginHorizontal: CommonSizes.margin.largePlus,
    },
    agreePrivacy: {
        marginTop: CommonSizes.margin.extraLarge,
    },
    agreePrivacyTextColor: {
        color: colors.main,
    },
    forgotPasswordContainer: {
        marginTop: CommonSizes.margin.extraLargePlus,
        alignItems: 'center',
        paddingVertical: CommonSizes.margin.smallPlus
    },
    forgotPassword: {
        color: colors.main
    },
    checkBox: {
        marginRight: CommonSizes.margin.smallPlus
    }
});
