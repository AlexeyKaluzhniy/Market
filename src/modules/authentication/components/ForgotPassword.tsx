import {StyleSheet, View} from "react-native";
import React from "react";
import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {Pages} from "~/navigation/pages";
import {AuthCustomHeader} from "~/components/AuthCustomHeader";
import {CustomInputForm} from "./CustomInputForm";
import {CommonStyles} from "~/core/theme/commonStyles";
import {object, string} from "yup";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";

export const ForgotPassword: NavigationFunctionComponent = (): JSX.Element => {
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
            <AuthCustomHeader headerTitle='authentication.recoverPassword'/>
            <View style={[CommonStyles.flex1, CommonStyles.marginContainer]}>
                <Roboto.Body.Medium style={styles.text} labelKey="authentication.phoneRecovery"/>
                <CustomInputForm
                    submitButtonTitle='authentication.sendSms'
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
        marginHorizontal: CommonSizes.margin.largePlus,
    }
});

