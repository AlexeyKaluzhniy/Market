import {CustomInputForm} from "./CustomInputForm";
import {ScrollView, StyleSheet} from "react-native";
import {getBottomTabsLayout} from "~/navigation/roots";
import {navigation} from "~/services";
import {useLoginMutation} from "~/core/store/api/auth/authQuery";
// eslint-disable-next-line id-blacklist
import {object, string} from "yup";
import {CommonSizes} from "~/core/theme/commonSizes";
import {LayoutRoot} from "react-native-navigation";
import {ILogin} from "~/core/store/api/auth/authModels";
import {useCallback} from "react";
import {useAppDispatch} from "~/core/store/store";
import {AuthActions} from "~/core/store/authentication/authSlice";
import {useLazyGetAdsQuery} from "~/core/store/api/ad/adQuery";

export const Login = () => {
    const [loginTrigger] = useLoginMutation();
    const [advertiseTrigger] = useLazyGetAdsQuery();
    const dispatch = useAppDispatch();

    const schema = object({
        phoneNumber: string().required().matches(/^[78]\d{10}$/),
        password: string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-=_+|{}\[\]:;"'<>?,./]).{8,20}$/).required(),
    });

    const handleLogin = useCallback((arg: ILogin) => {
        loginTrigger(arg).unwrap().then((res) => {
            dispatch(AuthActions.saveToken({accessToken: res.access_token, refreshToken: res.refresh_token}));
            advertiseTrigger();
            navigation.setRoot(getBottomTabsLayout as unknown as LayoutRoot);
        }).catch(() => null);
    }, [advertiseTrigger, dispatch, loginTrigger]);

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
            <CustomInputForm
                submitButtonTitle="authentication.loginTab"
                phoneField
                passwordField
                isLogin
                schema={schema}
                onSubmit={(arg) => handleLogin(arg as ILogin)}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: CommonSizes.margin.superLargePlus,
        paddingBottom: CommonSizes.padding.smallPlus,
    }
});
