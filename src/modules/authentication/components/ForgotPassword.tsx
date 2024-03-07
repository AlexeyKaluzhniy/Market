import {SafeAreaView, StyleSheet, View} from "react-native";
import React from "react";
import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {Pages} from "~/navigation/pages";
import {CustomHeader} from "~/components/CustomHeader";
import {CustomInputForm} from "./CustomInputForm";
import {CommonStyles} from "~/core/theme/commonStyles";
import {object, string} from "yup";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";

export const ForgotPassword: NavigationFunctionComponent = (props): JSX.Element => {
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
        <SafeAreaView style={CommonStyles.flex1}>
            <CustomHeader headerTitle='authentication.recoverPassword' id={props.componentId} isStack isAuth/>
            <View style={[CommonStyles.flex1, CommonStyles.marginContainer]}>
                <Roboto.Body.Medium style={styles.text} labelKey="authentication.phoneRecovery"/>
                <CustomInputForm
                    submitButtonTitle='authentication.sendSms'
                    phoneField
                    schema={schema}
                    onSubmit={onSubmit}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    text: {
        marginHorizontal: CommonSizes.margin.largePlus,
    }
});

