import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {useTranslation} from "react-i18next";
import {Pages} from "../../../navigation/pages";
import {AuthCustomHeader} from "../../../components/AuthCustomHeader";
import {CustomInputForm} from "./CustomInputForm";
import {CommonStyles} from "../../../core/theme/commonStyles";
import {object, string} from "yup";

export const ForgotPassword: NavigationFunctionComponent = (): JSX.Element => {
    const {t} = useTranslation();

    const schema = object({
        email: string().required().matches(/^\+373\d{8}$/),
    });

    const onSubmit = () => {
        Navigation.push(Pages.auth.id, {
            component: {
                name: Pages.code.name,
                options: {
                    topBar: {
                        visible: false
                    },
                },
            }
        });
    };

    return (
        <View style={CommonStyles.flex1}>
            <AuthCustomHeader headerTitle={t('authentication.recoverPassword')}/>
            <View style={[CommonStyles.flex1, CommonStyles.marginContainer]}>
                <Text style={styles.text}>{t("authentication.phoneRecovery")}</Text>
                <CustomInputForm
                    submitButtonTitle={t('authentication.sendSms')}
                    phoneField
                    schema={schema}
                    onSubmit={onSubmit}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        marginHorizontal: 16
    }
});

