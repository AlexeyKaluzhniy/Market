import React, {useEffect} from "react";
import {CustomInputForm} from "./CustomInputForm";
import {StyleSheet, View} from "react-native";
import {getBottomTabsLayout} from "~/navigation/roots";
import {navigation} from "~/services";
import {useLazyGetSessionIdLoginQuery} from "~/core/store/auth/authQuery";
import {object, string} from "yup";
import {CommonSizes} from "~/core/theme/commonSizes";
import {CommonStyles} from "~/core/theme/commonStyles";

export const Login = () => {
    const [trigger, {data}] = useLazyGetSessionIdLoginQuery();

    useEffect(() => {
        if (data) {
            navigation.setRoot(getBottomTabsLayout);
        }
    }, [data]);

    const schema = object({
        email: string().required().matches(/^\+373\d{8}$/),
        password: string().min(8).required(),
    });

    return (
        <View style={styles.container}>
            <CustomInputForm
                submitButtonTitle="authentication.loginTab"
                phoneField
                passwordField
                isLogin
                schema={schema}
                onSubmit={trigger}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: CommonSizes.margin.superLargePlus,
        ...CommonStyles.flex1
    }
});
