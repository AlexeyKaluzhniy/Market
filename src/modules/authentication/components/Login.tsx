import {CustomInputForm} from "./CustomInputForm";
import {Button, ScrollView, StyleSheet} from "react-native";
import {getBottomTabsLayout} from "~/navigation/roots";
import {navigation} from "~/services";
import {useLazyGetSessionIdLoginQuery} from "~/core/store/auth/authQuery";
import {object, string} from "yup";
import {CommonSizes} from "~/core/theme/commonSizes";
import {CommonStyles} from "~/core/theme/commonStyles";
import {LayoutRoot} from "react-native-navigation";
import {ILogin} from "~/core/store/auth/authModels";
import {useCallback} from "react";

export const Login = () => {
    const [loginTrigger] = useLazyGetSessionIdLoginQuery();

    const schema = object({
        phoneNumber: string().required().matches(/^[78]\d{10}$/),
        password: string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-=_+|{}\[\]:;"'<>?,./]).{8,20}$/).required(),
    });

    const handleLogin = useCallback((arg: ILogin) => {
        loginTrigger(arg).unwrap().then(() => navigation.setRoot(getBottomTabsLayout as unknown as LayoutRoot)).catch(() => null);
    }, []);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <CustomInputForm
                submitButtonTitle="authentication.loginTab"
                phoneField
                passwordField
                isLogin
                schema={schema}
                onSubmit={(arg) => handleLogin(arg as ILogin)}
            />
            <Button title="Войти" onPress={() => navigation.setRoot(getBottomTabsLayout as unknown as LayoutRoot)}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: CommonSizes.margin.superLargePlus,
        ...CommonStyles.flex1,
    }
});
