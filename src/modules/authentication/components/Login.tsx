import React, {useEffect, useState} from "react";
import {CustomInputForm} from "./CustomInputForm";
import {Button, StyleSheet, View} from "react-native";
import {getBottomTabsLayout} from "~/navigation/roots";
import {navigation} from "~/services";
import {useLazyGetSessionIdLoginQuery} from "~/core/store/auth/authQuery";
import {object, string} from "yup";
import {CommonSizes} from "~/core/theme/commonSizes";
import {CommonStyles} from "~/core/theme/commonStyles";
import {LayoutRoot} from "react-native-navigation";
import {useAppSelector} from "~/core/store/store";
import {selectAppTheme} from "~/core/store/system/systemSelectors";

export const Login = () => {
    const [trigger, {data}] = useLazyGetSessionIdLoginQuery();
    const appTheme = useAppSelector(selectAppTheme);
    const [canLogin, setCanLogin] = useState(false);

    //todo fix navigation types
    useEffect(() => {
        // if (data) {
        //     navigation.setRoot(getBottomTabsLayout(appTheme || 'dark') as unknown as LayoutRoot);
        // }
        if (canLogin) {
            navigation.setRoot(getBottomTabsLayout() as unknown as LayoutRoot);
        }
    }, [appTheme, data, canLogin]);

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
            <Button title="Войти" onPress={() => setCanLogin(true)}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: CommonSizes.margin.superLargePlus,
        ...CommonStyles.flex1
    }
});
