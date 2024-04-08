import {CustomInputForm} from "./CustomInputForm";
import {ScrollView, StyleSheet} from "react-native";
import {navigation} from "~/services";
import {getBottomTabsLayout} from "~/navigation/roots";
import {object, ref, string} from "yup";
import {useLazyGetSessionIdRegisterQuery} from "~/core/store/auth/authQuery";
import {LayoutRoot} from "react-native-navigation";
import {CommonSizes} from "~/core/theme/commonSizes";
import {IRegister} from "~/core/store/auth/authModels";
import {useCallback} from "react";

export const SignUp = () => {
    const [registerTrigger] = useLazyGetSessionIdRegisterQuery();

    const schema = object({
        phoneNumber: string().required().matches(/^[78]\d{10}$/),
        password: string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-=_+|{}\[\]:;"'<>?,./]).{8,20}$/).required(),
        repeatPassword: string().oneOf([ref("password")]).required()
    });

    const handleRegister = useCallback((arg: IRegister) => {
        registerTrigger(arg).unwrap()
            .then(() => navigation.setRoot(getBottomTabsLayout as unknown as LayoutRoot))
            .catch(() => null);
    }, [registerTrigger]);

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
            <CustomInputForm
                submitButtonTitle="authentication.registerTab"
                passwordField
                phoneField
                repeatPasswordField
                isRegister
                schema={schema}
                onSubmit={(arg) => handleRegister(arg as IRegister)}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: CommonSizes.margin.superLargePlus / 4 - CommonSizes.padding.extraSmallPlus,
        paddingBottom: CommonSizes.padding.smallPlus
    }
});
