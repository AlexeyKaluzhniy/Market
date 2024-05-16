import {StyleSheet, View} from "react-native";
import {Navigation, NavigationFunctionComponent} from "react-native-navigation";
import {Pages} from "~/navigation/pages";
import {CustomHeader} from "~/components/CustomHeader";
import {CustomInputForm} from "./CustomInputForm";
import {CommonStyles} from "~/core/theme/commonStyles";
import {object, string} from "yup";
import {Roboto} from "~/infrastructure";
import {CommonSizes} from "~/core/theme/commonSizes";
import {ThemeColors} from "~/core/theme/colors";
import {useThemedStyles} from "~/core/theme/hooks";
import {useLazySendOtpCodeQuery} from "~/core/store/api/auth/authQuery";
import {ISendOtp} from "~/core/store/api/auth/authModels";

export const ForgotPassword: NavigationFunctionComponent = (props): JSX.Element => {
    const styles = useThemedStyles(stylesG);
    const [sendOtpCodeTrigger] = useLazySendOtpCodeQuery();
    const schema = object({
        phoneNumber: string().required().matches(/^[78]\d{10}$/),
    });

    //todo handle navigation when received success code sent
    const handleSendOtpCode = (arg: ISendOtp) => {
        Navigation.push(Pages.auth.id, {
            component: {
                name: Pages.code.name,
                options: {
                    topBar: {
                        visible: false
                    },
                },
                passProps: {
                    phoneNumber: arg.phoneNumber
                }
            }
        });
        sendOtpCodeTrigger({...arg, otpCodeReason: "ResetPassword"});
    };

    return (
        <View style={CommonStyles.flex1}>
            <CustomHeader headerTitle='authentication.recoverPassword' id={props.componentId} isStack isAuth/>
            <View style={[CommonStyles.flex1, CommonStyles.marginContainer]}>
                <Roboto.Body.Medium style={styles.text} labelKey="authentication.phoneRecovery"/>
                <CustomInputForm
                    submitButtonTitle='authentication.sendSms'
                    phoneField
                    schema={schema}
                    onSubmit={(arg) => handleSendOtpCode(arg as ISendOtp)}
                />
            </View>
        </View>
    );
};

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    text: {
        marginHorizontal: CommonSizes.margin.largePlus,
        color: colors.onSurface
    }
});

