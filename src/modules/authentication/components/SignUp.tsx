import React, {useEffect} from "react";
import {CustomInputForm} from "./CustomInputForm";
import {View} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {navigation} from "~/services";
import {getBottomTabsLayout} from "~/navigation/roots";
import {object, ref, string} from "yup";
import {useLazyGetSessionIdRegisterQuery} from "~/core/store/auth/authQuery";
import {LayoutRoot} from "react-native-navigation";

export const SignUp = () => {
    const [trigger, {data}] = useLazyGetSessionIdRegisterQuery();

    //todo fix navigation types
    useEffect(() => {
        if (data) {
            navigation.setRoot(getBottomTabsLayout as unknown as LayoutRoot);
        }
    }, [data]);

    const schema = object({
        email: string().required().matches(/^\+373\d{8}$/),
        password: string().min(8).required(),
        repeatPassword: string().oneOf([ref("password")]).required()
    });

    return (
        <View style={[CommonStyles.flex1, CommonStyles.marginContainer]}>
            <CustomInputForm
                submitButtonTitle="authentication.registerTab"
                passwordField
                phoneField
                repeatPasswordField
                isRegister
                schema={schema}
                onSubmit={trigger}
            />
        </View>
    );
};
