import {NavigationFunctionComponent} from "react-native-navigation";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {AuthCustomHeader} from "../../../components/AuthCustomHeader";
import {useTranslation} from "react-i18next";
import {CustomInputForm} from "./CustomInputForm";
import {CommonStyles} from "../../../core/theme/commonStyles";
import {object, ref, string} from "yup";

export const NewPassword: NavigationFunctionComponent = (): JSX.Element => {
    const {t} = useTranslation();
    const schema = object({
        password: string().min(8).required(),
        repeatPassword: string().oneOf([ref("password")]).required()
    });

    return (
        <View style={CommonStyles.flex1}>
            <AuthCustomHeader headerTitle={t("authentication.newPassword")}/>
            <View style={[CommonStyles.flex1, CommonStyles.marginContainer]}>
                <Text style={styles.textMargin}>{t("authentication.savePassword")}</Text>
                <CustomInputForm
                    submitButtonTitle={t("authentication.savePassword")}
                    passwordField
                    repeatPasswordField
                    schema={schema}
                    onSubmit={() => console.log('submit new password')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textMargin: {
        marginLeft: 16
    }
});
