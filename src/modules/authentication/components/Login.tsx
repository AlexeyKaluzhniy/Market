import React, {useEffect, useState} from "react";
import {CustomInputForm} from "./CustomInputForm";
import {Button, ScrollView, StyleSheet} from "react-native";
import {getBottomTabsLayout} from "~/navigation/roots";
import {navigation} from "~/services";
import {useLazyGetSessionIdLoginQuery} from "~/core/store/auth/authQuery";
import {object, string} from "yup";
import {CommonSizes} from "~/core/theme/commonSizes";
import {CommonStyles} from "~/core/theme/commonStyles";
import {LayoutRoot} from "react-native-navigation";
import {useAppSelector} from "~/core/store/store";
import {selectAppTheme} from "~/core/store/system/systemSlice";

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
        phone: string().required().matches(/^\d{11}$/),
        password: string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-=_+|{}\[\]:;"'<>?,./]).{8,20}$/).required(),
    });

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <CustomInputForm
                submitButtonTitle="authentication.loginTab"
                phoneField
                passwordField
                isLogin
                schema={schema}
                onSubmit={trigger}
            />
            <Button title="Войти" onPress={() => setCanLogin(true)}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: CommonSizes.margin.superLargePlus,
        ...CommonStyles.flex1,
    }
});
