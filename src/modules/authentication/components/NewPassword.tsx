import {NavigationFunctionComponent} from "react-native-navigation";
import {StyleSheet, View} from "react-native";
import React from "react";
import {CustomHeader} from "~/components/CustomHeader";
import {CustomInputForm} from "./CustomInputForm";
import {CommonStyles} from "~/core/theme/commonStyles";
import {object, ref, string} from "yup";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";

export const NewPassword: NavigationFunctionComponent = (props): JSX.Element => {
    const schema = object({
        password: string().min(8).required(),
        repeatPassword: string().oneOf([ref("password")]).required()
    });

    return (
        <View style={CommonStyles.flex1}>
            <CustomHeader headerTitle="authentication.newPassword" id={props.componentId} isStack isAuth/>
            <View style={[CommonStyles.flex1, CommonStyles.marginContainer]}>
                <Roboto.Label.Large style={styles.textMargin} labelKey="authentication.savePassword"/>
                <CustomInputForm
                    submitButtonTitle="authentication.savePassword"
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
        marginLeft: CommonSizes.margin.largePlus
    }
});
