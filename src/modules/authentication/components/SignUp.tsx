import React, {useEffect} from "react";
import {CustomInputForm} from "./CustomInputForm";
import {ScrollView, StyleSheet} from "react-native";
import {CommonStyles} from "~/core/theme/commonStyles";
import {navigation} from "~/services";
import {getBottomTabsLayout} from "~/navigation/roots";
import {object, ref, string} from "yup";
import {useLazyGetSessionIdRegisterQuery} from "~/core/store/auth/authQuery";
import {LayoutRoot} from "react-native-navigation";
import {CommonSizes} from "~/core/theme/commonSizes";
import {windowHeight} from "~/core/theme/commonConsts";

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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <CustomInputForm
                submitButtonTitle="authentication.registerTab"
                passwordField
                phoneField
                repeatPasswordField
                isRegister
                schema={schema}
                onSubmit={trigger}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.flex1,
        paddingTop: windowHeight <= 720 ? CommonSizes.margin.superLargePlus / 2 : CommonSizes.margin.superLargePlus
    }
});
